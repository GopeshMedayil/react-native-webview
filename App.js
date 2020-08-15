/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import RNExitApp from 'react-native-exit-app';

import {
  StyleSheet,
  View,
  Button,
  Alert,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';
import CookieManager from '@react-native-community/cookies';

import { WebView } from 'react-native-webview';

const App: () => React$Node = () => {
  const [messages, setMessages] = useState('');
  useEffect(() => {
    console.log('Inside useEffect');
    const languages = getTranslations();
    var locale = (NativeModules.I18nManager.localeIdentifier) ? NativeModules.I18nManager.localeIdentifier : 'en_US';
    console.log('language', NativeModules.I18nManager);
    console.log('languages', languages);
    console.log('correct lan', languages[locale.substring(0, 2)]);
    setMessages(languages[locale.substring(0, 2)]);
    requestCameraPermission();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'flex-end', paddingRight: 1 }}><Button color="#EF2637" title="NEW LOGIN" onPress={() => handleAlert(messages)} /></View>
      <WebView source={{ uri: 'https://google.com/' }} />
    </View>
  );
};

const handleAlert = (obj) => {
  Alert.alert(
    '',
    obj.EXIT_TEXT,
    [
      {
        text: obj.NO,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: obj.OK,
        onPress: () =>
          CookieManager.clearAll().then((success) => {
            console.log('CookieManager.clearAll =>', success);
            RNExitApp.exitApp();
          }),
      },
    ],
    {
      cancelable: false,
    },
  );
  return true;
};

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'Application needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied !');
    }
  } catch (err) {
    console.warn(err);
  }
};

const getTranslations = () => {
  return {
    'en': {
      'EXIT_HEADER': 'EXIT the Application',
      'EXIT_TEXT': 'Are you sure you want to exit and log in again?',
      'OK': 'Exit',
      'NO': 'Cancel',
    },
    'fr': {
      'EXIT_HEADER': 'EXIT the Application',
      'EXIT_TEXT': 'Etes-vous sûr de vouloir quitter et vous reconnecter?',
      'OK': 'Quitter',
      'NO': 'Annuler',
    },
    'nl': {
      'EXIT_HEADER': 'EXIT the Application',
      'EXIT_TEXT': 'Bent u zeker dat u wil afsluiten en opnieuw inloggen?',
      'OK': 'Afsluiten',
      'NO': 'Annuleren',
    },
    'de': {
      'EXIT_HEADER': 'EXIT the Application',
      'EXIT_TEXT': 'Sind SIe sicher sich abzumelden?',
      'OK': 'Ja',
      'NO': 'Nein',
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4A4F',
    paddingTop: 0,
    padding: 0,
  }
});

export default App;
