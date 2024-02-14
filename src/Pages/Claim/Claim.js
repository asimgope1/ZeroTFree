import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import {useEffect} from 'react';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {useState} from 'react';
import {BLACK, BRAND, GRAY, WHITE} from '../../constants/color';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../../components/CustomButton';
import {HEIGHT, MyStatusBar} from '../../constants/config';
import {Fragment} from 'react';
import {appStyles} from '../../styles/AppStyles';
import {Loader} from './../../components/Loader';
import {loginStyles} from '../Login/LoginStyles';
import {EXTRABOLD, REGULAR} from '../../constants/fontfamily';
import {claimStyles} from './ClaimStyles';
import {CLAIM} from '../../constants/imagepath';
import Header from '../../components/Header';

const Claim = ({navigation}) => {
  const [permissionStatus, setPermissionStatus] = useState(false);
  const [loader, setLoader] = useState(false);
  const [coordinates, setCoordinates] = useState({latitude: '', longitude: ''});
  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    console.log('first');
    await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.ACCESS_FINE_LOCATION
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ).then(result => {
      console.log(result);
      if (result == 'granted') {
        setPermissionStatus(true);
      }
    });
  };

  const checkLocationPermission = () => {
    if (Platform.OS == 'android') {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.LIMITED:
              console.log(
                'The permission is limited: some actions are possible',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          console.log('ERROR: ', error);
        });
    } else {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.LIMITED:
              console.log(
                'The permission is limited: some actions are possible',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          console.log('ERROR: ', error);
        });
    }
  };

  const getGeolocationDetails = async () => {
    setLoader(true);
    if (permissionStatus) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          const {latitude, longitude} = position.coords;
          console.log('Latitude: ', latitude);
          console.log('Longitide: ', longitude);
          setCoordinates({latitude: latitude, longitude: longitude});
          setLoader(false);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const skipCallback = () => {
    setLoader(true);
    setTimeout(() => {
      navigation.navigate('Login');
      setLoader(false);
    }, 1000);
  };

  return (
    <Fragment>
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
                  }}></Text>
              </View>
              <View style={claimStyles.imageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={claimStyles.image}
                  source={CLAIM}
                />
              </View>
            </View>
            <View style={claimStyles.claimIdContainer}>
              <Text style={claimStyles.titleText}>your ID is</Text>
              <Text style={claimStyles.idText}>#34232523523</Text>
            </View>
            <View style={{height: HEIGHT * 0.05}} />
            <CustomButton
              onPress={() => {
                console.log('ashutosh');
              }}
              title={'Claim ID'}
              borderColor={BRAND}
              width={'81%'}
            />
            <View style={{height: HEIGHT * 0.05}} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Fragment>
  );
};

export default Claim;

/*


<CustomButton
        onPress={() => {
          getGeolocationDetails();
        }}
        title={'Extract Geo-coordinates'}
        width={'85%'}
      />
{coordinates.latitude && (
        <View
          style={{
            marginTop: HEIGHT * 0.02,
          }}>
          <Text
            style={{
              color: BLACK,
              fontSize: RFValue(15),
            }}>
            Latitude: {coordinates.latitude}
          </Text>
          <Text
            style={{
              color: BLACK,
              fontSize: RFValue(15),
            }}>
            Longitude: {coordinates.longitude}
          </Text>
        </View>
      )}
*/
