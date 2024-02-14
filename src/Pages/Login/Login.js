/* eslint-disable prettier/prettier */
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
import React, {Fragment} from 'react';
import {BLACK, BRAND, WHITE} from '../../constants/color';
import CustomButton from '../../components/CustomButton';
import {loginStyles} from './LoginStyles';
import {HEIGHT, MyStatusBar, WIDTH} from '../../constants/config';
import {LOGO} from '../../constants/imagepath';
import {CustomTextInput} from '../../components/CustomTextInput';
import {Loader} from '../../components/Loader';
import {useState} from 'react';
import {appStyles} from '../../styles/AppStyles';
import {EXTRABOLD, REGULAR} from '../../constants/fontfamily';
import {RFValue} from 'react-native-responsive-fontsize';
import {useFocusEffect} from '@react-navigation/native';

const Login = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useFocusEffect(() => {
    const backAction = () => {
      Alert.alert('', 'Are you sure you want to Exit app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });

  return (
    <Fragment>
      <MyStatusBar backgroundColor={WHITE} barStyle={'dark-content'} />
      <SafeAreaView style={appStyles.safeareacontainer}>
        <Loader visible={loader} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              paddingBottom: 20, // Adjust padding bottom to ensure space for scrolling
            }}>
            <View style={{height: HEIGHT * 0.1}} />
            <View style={loginStyles.imageContainer}>
              <Image
                source={LOGO}
                resizeMode="contain"
                style={loginStyles.image}
              />
            </View>
            <View style={loginStyles.logincontainer}>
              <View style={loginStyles.loginheader}>
                <Text
                  style={{
                    ...loginStyles.msgtext,
                  }}>
                  Log in
                </Text>
                <Text
                  style={{
                    color: '#787878',
                    fontFamily: REGULAR,
                    fontSize: RFValue(14),
                    marginBottom: HEIGHT * 0.02,
                  }}>
                  Log into your account to claim the ID
                </Text>
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
              onPress={() => navigation.navigate('Terms')}
              borderColor={BRAND}
              title={'Login'}
              width={'81%'}
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
                Don't have an account?{' '}
                <Text
                  onPress={() => {
                    navigation.navigate('Signup');
                  }}
                  style={{
                    color: BRAND,
                  }}>
                  Create Account
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

export default Login;
