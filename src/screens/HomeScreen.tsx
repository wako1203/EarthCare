import React, {useEffect, useMemo, useRef} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import BottomSheet from '@gorhom/bottom-sheet';

const HomeScreen = () => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ];

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      for (const permission in granted) {
        if (granted[permission] !== PermissionsAndroid.RESULTS.GRANTED) {
          handlePermissionDenied(permission);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePermissionDenied = permission => {
    let message = '';
    switch (permission) {
      case PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION:
        message = 'Location permission is required to use this feature.';
        break;
      case PermissionsAndroid.PERMISSIONS.CAMERA:
        message = 'Camera permission is required to use this feature.';
        break;
      // case PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE:
      //   message = 'Read storage permission is required to use this feature.';
      //   break;
      // case PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE:
      //   message = 'Write storage permission is required to use this feature.';
      //   break;
      default:
        message = 'Unknown permission is required to use this feature.';
    }

    Alert.alert(
      'Permission Denied',
      message,
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: false},
    );
  };

  const signOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => auth().signOut()},
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={signOut} />
      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <View style={styles.contentContainerStyle}>
          <Text>Awesome 🎉</Text>
          <Text>Áds</Text>
          <Text>Waka wake ê ê</Text>
          <Text>ccccccccccccc</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
});
