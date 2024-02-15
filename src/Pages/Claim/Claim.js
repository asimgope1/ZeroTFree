import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {BLACK, BRAND, WHITE} from '../../constants/color';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../../components/CustomButton';
import {HEIGHT, MyStatusBar} from '../../constants/config';
import {appStyles} from '../../styles/AppStyles';
import {Loader} from './../../components/Loader';
import {loginStyles} from '../Login/LoginStyles';
import {REGULAR} from '../../constants/fontfamily';
import {claimStyles} from './ClaimStyles';
import {CLAIM} from '../../constants/imagepath';
import Header from '../../components/Header';
import {BASE_URL} from '../../constants/url';
import {GETNETWORK, POSTNETWORK} from '../../utils/Network';
import NetInfo from '@react-native-community/netinfo';
import {NetworkInfo} from 'react-native-network-info';
import {clearAll} from '../../utils/Storage';

const Claim = ({navigation}) => {
  const [permissionStatus, setPermissionStatus] = useState(false);
  const [loader, setLoader] = useState(false);
  const [claimID, setClaimID] = useState('');
  let userDetails = {
    ipaddress: '',
    latitude: '',
    longitude: '',
    altitude: '',
    ssid: '',
    bssid: '',
    frequency: '',
    carrier: '',
    defaultGateway: '',
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.ACCESS_FINE_LOCATION
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ).then(result => {
      if (result === 'granted') {
        setPermissionStatus(true);
      }
    });
  };

  const getGeolocationDetails = async () => {
    setLoader(true);
    if (permissionStatus) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude, altitude} = position.coords;
          userDetails = {
            ...userDetails,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            altitude: altitude.toString(),
          };
          setLoader(false);
          fetchNetworkDetails();
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const fetchNetworkDetails = async () => {
    try {
      setLoader(true);
      const defaultGateway = await NetworkInfo.getGatewayIPAddress();
      const state = await NetInfo.fetch();

      userDetails = {
        ...userDetails,
        ssid: state?.details?.ssid,
        bssid: state?.details?.bssid,
        frequency: state?.details?.frequency,
        ipaddress: state?.details?.ipAddress,
        defaultGateway: defaultGateway,
      };
      getClaimId();
    } catch (error) {
      console.error('Error fetching network details:', error);
    }
  };

  const getClaimId = async () => {
    try {
      const url = `${BASE_URL}get_code/`;
      const res = await GETNETWORK(url);

      if (res.code === 200) {
        setClaimID(res?.data?.alphanumeric_code);
        postUserDetails();
      } else {
        alert(res?.msg);
      }
    } catch (error) {
      console.error('Error getting claim ID:', error);
    } finally {
      setLoader(false);
    }
  };

  const postUserDetails = async () => {
    console.log('User Details:', userDetails);
    const url = `${BASE_URL}user-data/`;
    const obj = {
      ztf_id: claimID,
      ...userDetails,
    };

    try {
      setLoader(true);
      const res = await POSTNETWORK(url, obj, true);

      if (res.code === 201) {
        console.log('SUCCESS');
      } else {
        // Handle error case
        console.log('Error:', res.msg);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoader(false);
    }
  };

  const skipCallback = () => {
    setLoader(true);
    clearAll().then(() => {
      setTimeout(() => {
        navigation.navigate('Login');
        setLoader(false);
      }, 1000);
    });
  };

  const getInformation = async () => {
    try {
      setLoader(true);
      await getGeolocationDetails();
    } catch (error) {
      console.error('Error fetching information:', error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <MyStatusBar backgroundColor={WHITE} barStyle={'dark-content'} />
      <SafeAreaView style={appStyles.safeareacontainer}>
        <Loader visible={loader} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Header
              title={''}
              onIconPress={() => {
                navigation.goBack();
              }}
              logoutShown={true}
              skipCallback={skipCallback}
            />
          </View>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              paddingBottom: 20, // Adjust padding bottom to ensure space for scrolling
            }}>
            <View style={{height: HEIGHT * 0.1}} />
            <View style={{...loginStyles.logincontainer}}>
              <View style={loginStyles.loginheader}>
                <Text
                  style={{
                    ...loginStyles.msgtext,
                  }}>
                  Claims
                </Text>
                <Text
                  style={{
                    color: '#787878',
                    fontFamily: REGULAR,
                    fontSize: RFValue(14),
                    marginBottom: HEIGHT * 0.02,
                  }}>
                  Claim your ID !
                </Text>
              </View>
              <View style={claimStyles.imageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={claimStyles.image}
                  source={CLAIM}
                />
              </View>
            </View>
            {claimID && (
              <View style={claimStyles.claimIdContainer}>
                <Text style={claimStyles.titleText}>your ID is</Text>
                <Text style={claimStyles.idText}>#{claimID}</Text>
              </View>
            )}
            <View style={{height: HEIGHT * 0.05}} />
            <CustomButton
              onPress={() => {
                getInformation();
              }}
              title={'Claim ID'}
              borderColor={BRAND}
              width={'81%'}
            />
            <View style={{height: HEIGHT * 0.05}} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Claim;
