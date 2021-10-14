import React, {useState, useEffect} from 'react';
import {RNCamera, FaceDetector} from 'react-native-camera';
import RNLocation from 'react-native-location';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Snackbar, Portal} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {IconMyIntelli, ModalResponse} from './';
import {COLORS} from '../../settings/theme';
import IconButtonMyIntelli from './IconButtonMyIntelli';
import {actions} from '../../store';
import {useStore} from 'react-redux';
import {connect} from 'react-redux';

const CameraFaceDetected = ({
  access_type_timelog = false,
  enrollFace = false,
  initial = false,
  hideCamera,
  navigation,
  config,
}) => {
  const {t} = useTranslation();
  const {dispatch} = useStore();
  const [PhotoFace, setPhotoFace] = useState('');
  const [photoBase64, setPhotoBase64] = useState(null);
  const [faceDetect, setFaceDetect] = useState(false);
  const [errorFace, setErrorFace] = useState(false);
  const [moreFacesDetect, setMoreFacesDetect] = useState(false);
  const [isPermissionLocation, setIsPermissionLocation] = useState(true);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [showWarningLocation, setShowWarningLocation] = useState(false);
  const [notPermissionLocation, setNotPermissionLocation] = useState(false);
  const [notLocationGet, setNotLocationGet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [viewModalSuccess, setViewModalSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFaceDetect(false);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(async () => {
    if (!enrollFace) {
      RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      }).then(granded => {
        setIsPermissionLocation(granded);
      });
    }
  }, []);
  useEffect(() => {
    if (!enrollFace) {
      if (isPermissionLocation) {
        RNLocation.configure({
          distanceFilter: 0.5,
          desiredAccuracy: {
            ios: 'best',
            android: 'balancedPowerAccuracy',
          },
        }).catch(error => {
          setShowWarningLocation(true);
        });
      } else {
        setNotPermissionLocation(true);
      }
    }
  }, [isPermissionLocation]);
  useEffect(async () => {
    setIsLoading(true);
    if (!enrollFace) {
      await getLocation();
    }
    if (photoBase64 != null) savePicture();
  }, [photoBase64]);
  useEffect(() => {
    if (message) {
      setViewModal(true);
    }
  }, [message]);

  const getLocation = async () => {
    const response = await RNLocation.getLatestLocation({timeout: 5000});
    if (response) {
      setLat(response.latitude);
      setLng(response.longitude);
    }
  };
  const takePicture = async camera => {
    const options = {quality: 1, base64: true, fixOrientation: true};
    let data = [];
    try {
      data = await camera.takePictureAsync(options);
    } catch (error) {
      console.error(error);
      return false;
    }
    setPhotoFace(data.uri);
    setPhotoBase64(`data:image/jpg;base64,${data.base64}`);
  };

  const enrollFacePost = async photo => {
    return await dispatch(
      actions.myintelliapi.enrollPhoto({
        photo,
      }),
    );
  };

  const changeStatusEnrolled = async () => {
    const newConfig = {
      ...config,
      enrolled: true,
    };
    await dispatch(actions.myintelliapi.configChangeValues(newConfig));
  };

  const savePicture = async () => {
    if (enrollFace) {
      const {response, error} = await enrollFacePost(photoBase64);
      if (response) {
        setViewModalSuccess(true);
        changeStatusEnrolled();
      } else {
        if (error.response) {
          let codError = String(error.response.data.status);
          switch (codError) {
            case '747':
              setMessage('Errors.personExistPhoto');
              break;
            case '745':
              setMessage('Errors.personPhotoMoreThanOneElementExits');
              break;
            default:
              navigation.navigate('Home');
              break;
          }
        }
      }
      setIsLoading(false);
    }
    if (access_type_timelog) {
      if (lat != null && lng != null) {
        hideCamera();
        setIsLoading(false);
        navigation.push('DetailTimelog', {
          access_type_timelog,
          photo: PhotoFace,
          base64: photoBase64,
          modView: false,
          coordinates: {lat, lng},
          newTimelog: true,
        });
      } else {
        setNotLocationGet(true);
        setIsLoading(false);
      }
    }
  };

  return (
    <Portal>
      <View style={styles.container}>
        {PhotoFace ? (
          <>
            <View
              style={{
                marginTop: StatusBar.currentHeight,
                position: 'relative',
                flex: 1,
              }}>
              <Image
                style={{width: wp(100), height: hp(100)}}
                source={{uri: PhotoFace}}
              />
            </View>
            <View
              style={{
                marginTop: StatusBar.currentHeight,
                position: 'relative',
                flex: 1,
              }}>
              <ActivityIndicator size="large" color={COLORS.PRIMARY} />
            </View>
          </>
        ) : (
          <View
            style={{
              marginTop: StatusBar.currentHeight,
              position: 'relative',
              flex: 1,
            }}>
            {!isLoading && (
              <IconButtonMyIntelli
                icon={'arrow-left'}
                color={'black'}
                size={22}
                style={styles.close}
                onPress={hideCamera}
              />
            )}
            <RNCamera
              style={styles.preview}
              type={RNCamera.Constants.Type.front}
              faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
              androidCameraPermissionOptions={{
                title: t('camera.permissionCameraTitle'),
                message: t('camera.permissionCameraMessage'),
                buttonPositive: t('common.accept'),
                buttonNegative: t('common.cancel'),
              }}
              // faceDetectionLandmarks={
              //   RNCamera.Constants.FaceDetection.Landmarks.all
              // }
              // faceDetectionClassifications={
              //   RNCamera.Constants.FaceDetection.Classifications.all
              // }
              onFacesDetected={({faces}) => {
                if (faces.length > 1) {
                  setMoreFacesDetect(true);
                } else {
                  setMoreFacesDetect(false);
                  setFaceDetect(true);
                }
              }}
              captureAudio={false}>
              {({camera, status}) => {
                // if (
                //   ['PENDING_AUTHORIZATION', 'NOT_AUTHORIZED'].includes(status)
                // ) {
                //   return <ModalNotPermissionCamera />;
                // }
                if (status !== 'READY')
                  return (
                    <View>
                      <ActivityIndicator size="large" color={COLORS.PRIMARY} />
                    </View>
                  );
                return (
                  <>
                    {!errorFace && !moreFacesDetect && (
                      <View
                        style={{
                          flex: 0,
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            faceDetect
                              ? takePicture(camera)
                              : setErrorFace(true)
                          }
                          style={styles.capture}>
                          <IconMyIntelli
                            icon={'circle'}
                            size={65}
                            type={'light'}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <Snackbar
                      visible={errorFace}
                      onDismiss={() => setErrorFace(false)}
                      duration={1500}
                      action={{
                        label: t('Common.close'),
                        onPress: () => {
                          // Do something
                        },
                      }}>
                      {t('Common.notFaceDetected')}
                    </Snackbar>
                    <Snackbar
                      visible={moreFacesDetect}
                      onDismiss={() => setMoreFacesDetect(false)}
                      duration={1500}
                      action={{
                        label: t('Common.close'),
                        onPress: () => {
                          // Do something
                        },
                      }}>
                      {t('Common.moreFacesDetect')}
                    </Snackbar>
                  </>
                );
              }}
            </RNCamera>
          </View>
        )}

        <ModalResponse
          view={showWarningLocation}
          onHideModal={() => {
            setShowWarningLocation(false);
            hideCamera();
          }}
          type={'warning'}
          message={'Common.warnings.notActiveGPS'}
        />
        <ModalResponse
          view={notPermissionLocation}
          onHideModal={() => {
            setNotPermissionLocation(false);
            hideCamera();
          }}
          type={'warning'}
          message={'Common.warnings.locationMessage'}
        />
        <ModalResponse
          view={notLocationGet}
          onHideModal={() => {
            setNotLocationGet(false);
            hideCamera();
          }}
          type={'error'}
          message={'Common.warnings.notLocationGet'}
        />
        <ModalResponse
          view={viewModal}
          onHideModal={() => {
            setViewModal(false);
            initial ? navigation.navigate('Home') : hideCamera();
          }}
          type={'warning'}
          message={message}
        />
        <ModalResponse
          view={viewModalSuccess}
          onHideModal={() => {
            setViewModalSuccess(false);
            initial ? navigation.navigate('Home') : hideCamera();
          }}
          type={'success'}
          message={'initialEnroll.success'}
        />
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
    left: 0,
    zIndex: 2,
  },
});

const mapStateToProps = ({config}) => {
  return {
    config,
  };
};

export default connect(mapStateToProps)(CameraFaceDetected);
