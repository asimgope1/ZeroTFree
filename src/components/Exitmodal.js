import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import React from 'react';

import {IBTN} from '../constants/imagepath';
import {HEIGHT, WIDTH} from '../constants/config';
import {BRAND, WHITE} from '../constants/color';
import {BOLD, MEDIUM} from '../constants/fontfamily';
import {RFValue} from 'react-native-responsive-fontsize';

const Exitmodal = ({title, onCancel, onOkay, visible, onBackpress}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => onBackpress(false)}>
      <Pressable
        onPress={() => {
          onBackpress(false);
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(100, 100, 100, 0.5)',
        }}>
        <View style={{...styles.mainContainer}}>
          {/* <Text>{title}</Text> */}
          <View style={{...styles.iBtnTextContainer}}>
            <View style={{...styles.iBtnContainer}}>
              <Image
                style={{
                  width: '60%',
                  height: '60%',
                }}
                resizeMode="contain"
                source={IBTN}
              />
            </View>
            <View style={{...styles.textContainer}}>
              <Text
                style={{
                  ...styles.alertText,
                  fontFamily: BOLD,
                  fontWeight: '800',
                }}>
                {'Are you sure?'}
              </Text>
              <Text style={{...styles.alertText}}>{title}</Text>
            </View>
          </View>
          <View style={{...styles.btnsContainer}}>
            <TouchableOpacity
              onPress={() => {
                onBackpress(false);
              }}
              style={styles.btn}>
              <Text
                style={{
                  color: '#787878',
                  fontFamily: MEDIUM,
                  fontSize: RFValue(15),
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onBackpress(false);
                BackHandler.exitApp();
              }}
              style={{
                ...styles.btn,
                marginRight: WIDTH * 0.04,
                backgroundColor: BRAND,
                borderColor: BRAND,
              }}>
              <Text
                style={{
                  color: WHITE,
                  fontFamily: MEDIUM,
                  fontSize: RFValue(15),
                }}>
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '85%',
    height: HEIGHT * 0.21,
    backgroundColor: WHITE,
    borderRadius: 10,
    borderColor: '#D1D1D1',
    borderWidth: 1,
  },
  iBtnTextContainer: {
    width: '100%',
    height: HEIGHT * 0.11,
    flexDirection: 'row',
  },
  iBtnContainer: {
    width: '25%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: '6%',
  },
  textContainer: {
    width: '75%',
    // height: '100%',
    paddingRight: '6%',
    justifyContent: '',
    paddingTop: HEIGHT * 0.024,
    // backgroundColor: 'red',
  },
  alertText: {
    color: '#444242',
    fontFamily: MEDIUM,
    fontSize: RFValue(15),
  },
  btnsContainer: {
    width: '100%',
    height: HEIGHT * 0.1,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btn: {
    width: '32%',
    height: '50%',
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 4,
    marginLeft: WIDTH * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Exitmodal;
