/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import RNExitApp from 'react-native-exit-app';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert, PermissionsAndroid
} from 'react-native';
import CookieManager from '@react-native-community/cookies';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';

const App: () => React$Node = () => {
  useEffect(() => {
    console.log("Inside useEffect")
    requestCameraPermission();
  }, [])
  return (
    <View style={styles.container}>
      <Button
        title="Exit"
        onPress={handleAlert}
      />
      <WebView
        source={{ uri: "https://gopeshgopinath.com" }}
      />
    </View>
  )
};

const handleAlert = () => {
  Alert.alert(
    'Exit App',
    'Exiting the application?', [{
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel'
    }, {
      text: 'OK',
      onPress: () => CookieManager.clearAll()
        .then((success) => {
          console.log('CookieManager.clearAll =>', success);
          RNExitApp.exitApp();
        })
    },], {
    cancelable: false
  }
  )
  return true;
}

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

export default App;
