import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  StatusBar,
  BackHandler,
} from 'react-native';
import {Portal, Dialog, Text, ButtonMyIntelli} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';
import {launchImageLibrary} from 'react-native-image-picker';
import IconMyIntelli from './IconMyIntelli';
import {COLORS} from '../../settings/theme';
import IconButtonMyIntelli from './IconButtonMyIntelli';

const Camera = ({onAccept, onHideModal}) => {
  const {t} = useTranslation();
  const [PhotoFace, setPhotoFace] = useState('');
  const [typeCamera, setTypeCamera] = useState(RNCamera.Constants.Type.front);

  const takePicture = async camera => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    setPhotoFace(data.uri);
  };
  const onPressReverseCamera = () => {
    typeCamera === RNCamera.Constants.Type.front
      ? setTypeCamera(RNCamera.Constants.Type.back)
      : setTypeCamera(RNCamera.Constants.Type.front);
  };
  const launchGalery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      ({assets, errorCode, errorMessage, didCancel}) => {
        if (!didCancel) {
          setPhotoFace(assets[0].uri);
        }
      },
    );
  };
  const savePicture = () => {
    onAccept(PhotoFace);
    onHideModal();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Back();
        return true;
      },
    );
    return () => backHandler.remove();
  }, [PhotoFace]);

  const Back = () => {
    if (PhotoFace) setPhotoFace('');
    else onHideModal();
  };
  const ModalNotPermissionCamera = () => {
    return (
      <Dialog visible={true} onDismiss={onHideModal}>
        <Dialog.Title>{t(`Common.warning`)}</Dialog.Title>
        <Dialog.Content style={{alignItems: 'center'}}>
          <Text>{t('Common.warnings.notPermissionCamera')}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <ButtonMyIntelli
            style={{marginBottom: 4, marginRight: 14}}
            title={t('General.done')}
            onPress={onHideModal}
          />
        </Dialog.Actions>
      </Dialog>
    );
  };

  return (
    <Portal>
      <View style={styles.container}>
        {PhotoFace ? (
          <View
            style={{
              marginTop: StatusBar.currentHeight,
              position: 'relative',
              flex: 1,
            }}>
            <IconButtonMyIntelli
              icon={'times'}
              color={'black'}
              size={22}
              style={styles.close}
              onPress={() => setPhotoFace('')}
            />
            <Image
              style={{width: wp(100), height: hp(100)}}
              source={{uri: PhotoFace}}
            />
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                zIndex: 10,
                bottom: 0,
                left: wp(40),
                position: 'absolute',
              }}>
              <TouchableOpacity
                onPress={() => savePicture()}
                style={styles.check}>
                <IconMyIntelli icon={'check'} color={'white'} size={25} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <RNCamera
            style={styles.preview}
            type={typeCamera}
            androidCameraPermissionOptions={{
              title: t('camera.permissionCameraTitle'),
              message: t('camera.permissionCameraMessage'),
              buttonPositive: t('common.accept'),
              buttonNegative: t('common.cancel'),
            }}
            captureAudio={false}>
            {({camera, status}) => {
              // if (
              //   ['PENDING_AUTHORIZATION', 'NOT_AUTHORIZED'].includes(status)
              // ) {
              //   // return <ModalNotPermissionCamera />;
              // }
              if (status !== 'READY')
                return (
                  <ActivityIndicator size="large" color={COLORS.PRIMARY} />
                );
              return (
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    alignContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={launchGalery}
                    style={styles.images}>
                    <IconMyIntelli icon={'images'} size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => takePicture(camera)}
                    style={styles.capture}>
                    <IconMyIntelli icon={'circle'}  size={65} type={'light'}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onPressReverseCamera}
                    style={styles.reverse}>
                    <IconMyIntelli icon={'retweet'} size={25} />
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>
        )}
      </View>
    </Portal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 40,
    width: 70,
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  check: {
    flex: 0,
    backgroundColor: COLORS.IN,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  images: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  reverse: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  close: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 30,
    height: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
});

export default Camera;
