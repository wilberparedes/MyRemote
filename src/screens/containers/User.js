import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AvatarMyIntelli,
  BasePageChildren,
  Camera,
  CameraFaceDetected,
  ContainerSection,
  Entities,
  IconMyIntelli,
  ListItemTextMyIntelli,
  ModalResponse,
} from '../components';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../settings/theme';

const User = ({navigation, user: User, config}) => {
  const {t} = useTranslation();
  const [visibleCamera, setVisibleCamera] = useState(false);
  const [enrollFace, setEnrollFace] = useState(false);
  const [imgProfile, setImgProfile] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Back();
        return true;
      },
    );
    return () => backHandler.remove();
  }, [visibleCamera, enrollFace]);

  useEffect(async () => {
    const photo = await AsyncStorage.getItem(`${User.person.dui_person}-photo`);
    if (photo) {
      setImgProfile(photo);
    }
  }, []);

  const Back = () => {
    if (visibleCamera) {
      setVisibleCamera(false);
    } else if (enrollFace) {
      setEnrollFace(false);
    } else {
      navigation.goBack();
    }
  };

  if (!User) {
    return null;
  }

  const {user, person} = User;
  const IconTextButton = ({icon, text, onPress, type, size = 35}) => (
    <TouchableOpacity style={{alignItems: 'center'}} onPress={onPress}>
      <IconMyIntelli
        icon={icon}
        size={size}
        type={type}
        color={COLORS.PRIMARY}
      />
      <Text style={{fontSize: 14, color: COLORS.PRIMARY, fontWeight: 'bold'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
  return (
    <BasePageChildren
      title={t(`Common.user`)}
      navigation={navigation}
      paddingNone>
      <ContainerSection title={t(`User.personalInformation`)}>
        <ListItemTextMyIntelli
          icon={'address-card'}
          title={`${t(`User.fullName`)}:`}
          description={user.user_name}
        />
        <ListItemTextMyIntelli
          icon={'id-card'}
          title={`${t(`User.dni`)}:`}
          typeLetterTitle={'normal'}
          description={
            person.dui_person ? person.dui_person : t(`User.dataNotRegistered`)
          }
        />
        <ListItemTextMyIntelli
          icon={'envelope'}
          typeLetter={'lower'}
          title={`${t(`User.email`)}:`}
          description={user.email ? user.email : t(`User.dataNotRegistered`)}
        />
        <ListItemTextMyIntelli
          icon={'phone'}
          title={`${t(`User.cel`)}:`}
          description={user.phone ? user.phone : t(`User.dataNotRegistered`)}
        />
      </ContainerSection>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 16,
          marginBottom: 0,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => setVisibleCamera(true)}>
          <View
            style={{
              backgroundColor: COLORS.BORDER,
              borderWidth: 2,
              borderColor: COLORS.PRIMARY,
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            <AvatarMyIntelli
              url={imgProfile}
              size={35}
              recapturePhoto={true}
              onRepcaturePhoto={() => setVisibleCamera(true)}
            />
          </View>
          <Text
            style={{fontSize: 14, color: COLORS.PRIMARY, fontWeight: 'bold'}}>
            {t(`User.profilePicture`)}
          </Text>
        </TouchableOpacity>

        <IconTextButton
          icon={
            person.person_user.facial_recognition_app == 1 && config.enrolled
              ? 'faceid_check'
              : 'faceid_active'
          }
          type={'intelli'}
          size={38}
          text={t(`User.enrollFace`)}
          onPress={() => {
            if (
              person.person_user.facial_recognition_app == 1 &&
              config.enrolled
            ) {
              setViewModal(true);
            } else {
              setEnrollFace(true);
            }
          }}
        />
        <IconTextButton
          icon={'lock-alt'}
          size={40}
          text={t('Common.restorePassword')}
          onPress={() => navigation.push('ChangePassword')}
        />
      </View>

      {/* ENTITIES */}
      <View style={{marginTop: 16}}>
        <Entities />
      </View>

      {visibleCamera && (
        <Camera
          onHideModal={() => setVisibleCamera(false)}
          onAccept={img => {
            setImgProfile(img);
            AsyncStorage.setItem(`${User.person.dui_person}-photo`, img);
          }}
        />
      )}
      {enrollFace && (
        <CameraFaceDetected
          access_type_timelog={false}
          enrollFace={true}
          initial={false}
          hideCamera={() => setEnrollFace(false)}
        />
      )}
      <ModalResponse
        view={viewModal}
        onHideModal={() => {
          setViewModal(false);
        }}
        type={'warning'}
        message={'Errors.personExistPhoto'}
      />
    </BasePageChildren>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
  },
  contentItem: {
    paddingBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  containerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.BORDER,
    overflow: 'hidden',
  },
  imageSize: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  button: {
    position: 'absolute',
    right: 0,
    top: 16,
    width: 100,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  buttonActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  buttonInactive: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
  },
});

const mapStateToProps = ({auth, config}) => {
  return {
    user: auth.user,
    config,
  };
};

export default connect(mapStateToProps)(User);
