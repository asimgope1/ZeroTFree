import {View, Image, SafeAreaView} from 'react-native';
import React, {Fragment, useEffect} from 'react';
import {BRAND, WHITE} from '../../constants/color';
import LinearGradient from 'react-native-linear-gradient';
import {LOGO} from '../../constants/imagepath';
import {MyStatusBar} from '../../constants/config';
import {splashStyles} from './SplashStyles';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  }, []);

  return (
    <Fragment>
      <MyStatusBar backgroundColor={BRAND} barStyle={'dark-content'} />
      <SafeAreaView style={splashStyles.maincontainer}>
        <LinearGradient
          end={{x: 0, y: 0}}
          start={{x: 0, y: 1}}
          colors={[BRAND, BRAND]}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={splashStyles.logoContainer}>
            <Image
              tintColor={WHITE}
              resizeMode={'contain'}
              style={{
                alignSelf: 'center',
                width: '80%',
                height: '90%',
              }}
              source={LOGO}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </Fragment>
  );
};

export default Splash;
