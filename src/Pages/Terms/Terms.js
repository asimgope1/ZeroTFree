import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {HEIGHT, MyStatusBar} from '../../constants/config';
import {BLACK, BRAND, GRAY, LIGHTGRAY, WHITE} from '../../constants/color';
import {appStyles} from '../../styles/AppStyles';
import {Loader} from '../../components/Loader';
import Header from '../../components/Header';
import styles from './TermsStyles';
import {BOLD, MEDIUM} from '../../constants/fontfamily';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../../components/CustomButton';
import {CHECKMARK, CROSS, LOGO, TICK} from '../../constants/imagepath';

const Terms = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleAccept = () => {
    // Handle accept logic
    console.log('User accepted terms');
  };

  const handleDecline = () => {
    // Handle decline logic
    console.log('User declined terms');
    navigation.navigate('Login');
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
            />
          </View>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              paddingBottom: 20, // Adjust padding bottom to ensure space for scrolling
            }}>
            <View style={{}}>
              <View
                style={{
                  width: '90%',
                }}>
                <Text
                  style={{
                    color: BLACK,
                    fontFamily: BOLD,
                    fontSize: RFValue(25),
                  }}>
                  Terms of Services
                </Text>
                <Text
                  style={{
                    color: '#C8C8C8',
                    fontFamily: MEDIUM,
                    fontSize: RFValue(18),
                  }}>
                  Last Updated on Jan 2024
                </Text>
              </View>
              <View style={{width: '90%'}}>
                <Text style={styles.heading}>Introduction</Text>
                <Text style={styles.paragraph}>
                  These terms and conditions ("Terms") govern your use of the
                  ZeroTFree mobile application. By downloading, accessing, or
                  using the App, you agree to be bound by these Terms. If you do
                  not agree to these Terms, please do not use the App.
                </Text>
                <Text style={styles.heading}>Information Collection</Text>
                <Text style={styles.paragraph}>
                  The App may collect certain information from your device,
                  including but not limited to IP address, location data,
                  International Mobile Equipment Identity (IMEI), Service Set
                  Identifier (SSID), and Basic Service Set Identifier (BSSID).
                  This information is collected solely for the purpose of
                  providing you with the services offered by the App.
                </Text>
                <Text style={styles.heading}>Use of Information</Text>
                <Text style={styles.paragraph}>
                  We may use the collected information to: Provide and maintain
                  the functionality of the App. Improve and optimize the
                  performance of the App. Customize your experience with the
                  App. Analyze usage patterns and trends to enhance our
                  services.
                </Text>
                <Text style={styles.heading}>Privacy</Text>
                <Text style={styles.paragraph}>
                  We may use the collected information to: Provide and maintain
                  the functionality of the App. Improve and optimize the
                  performance of the App. Customize your experience with the
                  App. Analyze usage patterns and trends to enhance our
                  services.
                </Text>
                <Text style={styles.heading}>Security</Text>
                <Text style={styles.paragraph}>
                  We employ industry-standard security measures to protect your
                  information from unauthorized access, disclosure, alteration,
                  or destruction. However, no method of transmission over the
                  internet or electronic storage is 100% secure, and we cannot
                  guarantee absolute security.
                </Text>
                <Text style={styles.heading}>User Responsibilities</Text>
                <Text style={styles.paragraph}>
                  You are responsible for maintaining the confidentiality of any
                  account credentials associated with the App and for all
                  activities that occur under your account. You agree to notify
                  us immediately of any unauthorized use of your account or any
                  other breach of security.
                </Text>
                <Text style={styles.heading}>Updates to Terms</Text>
                <Text style={styles.paragraph}>
                  We reserve the right to update or modify these Terms at any
                  time without prior notice. By continuing to use the App after
                  any such changes, you agree to be bound by the revised Terms.
                </Text>
                <Text style={styles.heading}>Contact Us</Text>
                <Text style={styles.paragraph}>
                  If you have any questions or concerns about these Terms or the
                  App, please contact us at ZeroTFree official mail.
                </Text>
              </View>
            </View>
            <View style={{height: HEIGHT * 0.2}} />
          </ScrollView>
          <View
            style={{
              width: '90%',
              backgroundColor: WHITE,
              justifyContent: 'center',
              position: 'absolute',
              bottom: 0,
              height: HEIGHT * 0.15,
              alignSelf: 'center',
            }}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() => setIsChecked(!isChecked)}
                style={{
                  ...styles.checkbox,
                  borderColor: isChecked ? BRAND : BLACK,
                }}>
                {isChecked && (
                  <Image
                    tintColor={BRAND}
                    resizeMode="contain"
                    style={{
                      width: '80%',
                      height: '80%',
                    }}
                    source={CHECKMARK}
                  />
                )}
              </TouchableOpacity>
              <Text
                onPress={() => {
                  setIsChecked(!isChecked);
                }}
                style={styles.checkboxLabel}>
                I have read the all terms and conditions
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                onPress={handleDecline}
                title={'Decline'}
                borderColor="#A6A4A4"
                backgroundColor={WHITE}
                textColor={BLACK}
                icon={CROSS}
                width="47%"
              />
              <CustomButton
                onPress={() => {
                  if (isChecked) {
                    navigation.navigate('Claim');
                  } else {
                    Alert.alert('Please accept by clicking checkbox !');
                  }
                }}
                icon={TICK}
                borderColor={BRAND}
                title={'Accept'}
                width="47%"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Fragment>
  );
};

export default Terms;

/*

 <Text style={styles.subHeading}>About</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non
            dui sagittis, consectetur libero non, sodales massa. Integer sed
            enim et odio sagittis elementum ut vitae nunc. Maecenas consequat,
            risus et facilisis tincidunt, justo purus ultricies enim, id posuere
            lectus lorem sit amet elit.
          </Text>
          <Text style={styles.heading}>Terms and Conditions</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non
            dui sagittis, consectetur libero non, sodales massa. Integer sed
            enim et odio sagittis elementum ut vitae nunc. Maecenas consequat,
            risus et facilisis tincidunt, justo purus ultricies enim, id posuere
            lectus lorem sit amet elit.
          </Text>
*/

/*
<View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setIsChecked(!isChecked)}
            style={styles.checkbox}>
            {isChecked ? <Text>X</Text> : null}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I accept the terms and conditions
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button]} onPress={handleAccept}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={handleDecline}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>

*/
