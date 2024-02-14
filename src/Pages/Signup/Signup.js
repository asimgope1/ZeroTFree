// SignUp.js

import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';
import {HEIGHT, MyStatusBar} from '../../constants/config';
import {BRAND, WHITE} from '../../constants/color';
import CustomButton from '../../components/CustomButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import signupStyles from './SignupStyles'; // Import signupStyles from SignUpsignupStyles
import {LOGO} from '../../constants/imagepath';
import {appStyles} from '../../styles/AppStyles';
import {Loader} from '../../components/Loader';
import Header from '../../components/Header';
import {loginStyles} from '../Login/LoginStyles';
import {EXTRABOLD, REGULAR} from '../../constants/fontfamily';
import {RFValue} from 'react-native-responsive-fontsize';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState('');

  const handleSignUp = () => {
    // Your sign up logic here
    console.log('Signing up with:', name, email, password);
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              paddingBottom: 20, // Adjust padding bottom to ensure space for scrolling
            }}>
            <View style={signupStyles.imageContainer}>
              <Image
                source={LOGO}
                resizeMode="contain"
                style={signupStyles.image}
              />
            </View>
            <View style={{...loginStyles.logincontainer, height: HEIGHT * 0.5}}>
              <View style={loginStyles.loginheader}>
                <Text
                  style={{
                    ...loginStyles.msgtext,
                  }}>
                  Create Account
                </Text>
                <Text
                  style={{
                    color: '#787878',
                    fontFamily: REGULAR,
                    fontSize: RFValue(14),
                    marginBottom: HEIGHT * 0.02,
                  }}>
                  Sign in to claim ID!
                </Text>
              </View>
              <View style={loginStyles.credentialView}>
                <CustomTextInput
                  title="Name"
                  placeholder="Enter your name"
                  width={'90%'}
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={loginStyles.credentialView}>
                <CustomTextInput
                  title="Email"
                  placeholder="Enter your email"
                  width={'90%'}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View style={loginStyles.credentialView}>
                <CustomTextInput
                  title="Password"
                  placeholder="Enter your Password"
                  width={'90%'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
              </View>
              <View
                style={{
                  ...loginStyles.credentialView,
                  alignItems: 'right',
                  width: '90%',
                }}>
                <Text
                  style={{
                    textAlign: 'right',
                    color: '#787878',
                    fontFamily: REGULAR,
                    fontSize: RFValue(14),
                  }}>
                  Forgot password?
                </Text>
              </View>
            </View>
            <CustomButton
              onPress={() => navigation.navigate('Login')}
              title={'Create Account'}
              width={'81%'}
              borderColor={BRAND}
            />
            <View
              style={{
                ...loginStyles.credentialView,
                marginTop: HEIGHT * 0.03,
              }}>
              <Text
                style={{
                  color: '#787878',
                  fontFamily: EXTRABOLD,
                  fontSize: RFValue(15),
                  fontWeight: 'bold',
                }}>
                Already have an account?{' '}
                <Text
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                  style={{
                    color: BRAND,
                  }}>
                  Log in
                </Text>
              </Text>
            </View>
            <View style={{height: HEIGHT * 0.05}} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Fragment>
  );
};

export default SignUp;

/*

*/
