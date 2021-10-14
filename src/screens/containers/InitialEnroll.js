import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  BackHandler,
  View,
  StyleSheet,
  StatusBar,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, Title} from 'react-native-paper';
import {
  HeaderTabs,
  ButtonMyIntelli,
  CameraFaceDetected,
  ModalResponse,
  ModalConfirmAction,
} from '../components/';
import {actions} from "../../store"
import { connect } from 'react-redux';

const InitialEnroll = ({navigation,authLogout}) => {
  const {t} = useTranslation();
  const [visibleCamera, setVisibleCamera] = useState(false);
  const [viewModalPermission, setViewModalPermission] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: t('Common.permission.cameraTitle'),
          message: t('Common.permission.cameraMessage'),
          buttonNeutral: t('Common.later'),
          buttonNegative: t('Common.cancel'),
          buttonPositive: t('Common.accept'),
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
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
  }, [visibleCamera]);
  const Back = () => {
    setVisibleCamera(false);
  };
  return (
    <>
      <HeaderTabs title={t('initialEnroll.title')} navigation={navigation} />
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            alignSelf: 'center',
            width: wp(40),
            height: hp(30),
            marginBottom: -hp(3),
            resizeMode: 'contain',
          }}
        />
        <View style={styles.title}>
          <Title>{t('welcome')}</Title>
        </View>
        <View>
          <Text style={styles.text}>{t('initialEnroll.message')}</Text>
        </View>
        <View style={styles.button}>
          <ButtonMyIntelli
            icon={'sign-out'}
            title={t('Common.logout')}
            onPress={async () => {
              setModalLogout(true);
            }}
          />

          <ButtonMyIntelli
            icon={'angle-right'}
            title={t('initialEnroll.continue')}
            onPress={async () => {
              const responseCamera = await requestCameraPermission();
              if (responseCamera) {
                setVisibleCamera(true);
              } else {
                setViewModalPermission(true);
              }
            }}
          />
        </View>
      </View>
      {visibleCamera && (
        <CameraFaceDetected
          access_type_timelog={false}
          navigation={navigation}
          enrollFace={true}
          initial={true}
          hideCamera={() => setVisibleCamera(false)}
        />
      )}
      <ModalResponse
        view={viewModalPermission}
        onHideModal={() => {
          setViewModalPermission(false);
        }}
        type={'warning'}
        message={'Common.warnings.notPermissionCamera'}
      />
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      <ModalConfirmAction
        title={t(`Common.logOut`)}
        message={t(`Common.sureLogOut`)}
        visible={modalLogout}
        onHideModal={() => setModalLogout(false)}
        onAccept={() => authLogout()}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(8),
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.4),
  },
  text: {
    textAlign: 'justify',
  },
  toolbarContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
const mapDispatchToProps = dispatch => ({
  authLogout: () => 
    dispatch(actions.myintelliapi.authLogout()),
});

export default connect(null, mapDispatchToProps)(InitialEnroll);