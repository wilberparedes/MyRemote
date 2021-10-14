import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  BackHandler,
  VirtualizedList,
  PermissionsAndroid,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {connect} from 'react-redux';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {useTurns} from '../../hooks/useTurns';
import {getItem} from '../../settings/utils';
import {
  DateTimeNowUTC,
  HeaderHome,
  CardTurn,
  ButtonTimelog,
  ListTimelogs,
  ContainerSection,
  Loading,
  ModalResponse,
} from '../components';
import {COLORS} from '../../settings/theme';
import {CameraFaceDetected} from '../components';

const HomeApp = ({navigation, user: User, config, route}) => {
  if (!User) {
    return null;
  }
  const {t} = useTranslation();
  const [isFetching, setIsFetching] = useState(false);
  const [visibleCamera, setVisibleCamera] = useState(false);
  const [accessTypeTimelog, setAccessTypeTimelog] = useState(null);
  const [refreshNewTimelog, setRefreshNewTimelog] = useState(false);
  const [viewModalPermission, setViewModalPermission] = useState(false);
  const [viewModalPermissionLocation, setViewModalPermissionLocation] = useState(false);

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
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: t('Common.permission.gpsTitle'),
          message: t('Common.permission.gpsMessage'),
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
    accessTypeTimelog ? setVisibleCamera(false) : navigation.goBack();
  };
  useEffect(() => {
    if (route.params) {
      if (route.params.newTimelog) {
        setRefreshNewTimelog(true);
        route.params.newTimelog = false;
      }
    }
  }, [route]);
  useEffect(() => {
    usetSetParams(moment(), 'T');
  }, [User.person.idEntityActive]);

  const [isLoading, turns, usetSetParams] = useTurns({
    date: moment(),
    type: 'T',
  });

  useEffect(() => {
    if (
      !config.enrolled &&
      User.person.person_user.facial_recognition_app == 1
    ) {
      navigation.navigate('InitialEnroll');
    }
  }, []);

  const refresh = async () => {
    setIsFetching(true);
    await usetSetParams(moment(), 'T');
    setIsFetching(false);
  };

  const DataFather = turns ? turns.data.results[0] : [];
  const Data = turns ? DataFather.dates : [];

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <HeaderHome navigation={navigation} />
      <View style={{margin: 0, flex: 1, position: 'relative'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 16,
            marginVertical: 8,
            height: 70,
            backgroundColor: 'white',
          }}>
          <ButtonTimelog
            title={t(`General.in`)}
            icon={'sign-in-alt'}
            position={'left'}
            color={COLORS.IN}
            textColor={'white'}
            onPress={async () => {
              const responseCamera = await requestCameraPermission();
              if (responseCamera) {
                const responseGps = await requestLocationPermission();
                if (responseGps) {
                  setAccessTypeTimelog(1);
                  setVisibleCamera(true);
                } else {
                  setViewModalPermissionLocation(true);
                }
              } else {
                setViewModalPermission(true);
              }
            }}
          />
          <DateTimeNowUTC />
          <ButtonTimelog
            title={t(`General.out`)}
            icon={'sign-out-alt'}
            position={'right'}
            color={COLORS.OUT}
            textColor={'white'}
            onPress={async () => {
              const responseCamera = await requestCameraPermission();
              if (responseCamera) {
                const responseGps = await requestLocationPermission();
                if (responseGps) {
                  setAccessTypeTimelog(2);
                  setVisibleCamera(true);
                } else {
                  setViewModalPermissionLocation(true);
                }
              } else {
                setViewModalPermission(true);
              }
            }}
          />
        </View>

        <ContainerSection
          title={t(`Common.punchesHistory`)}
          titleAlign={'center'}
          typeLetter={'normal'}
          style={{flex: 1}}>
          <ListTimelogs
            navigation={navigation}
            refresh={refreshNewTimelog}
            onRefresh={() => setRefreshNewTimelog(false)}
          />
        </ContainerSection>

        <ContainerSection
          title={t(`Turn.turns`)}
          titleAlign={'center'}
          style={{flex: 0}}>
          {isLoading ? (
            <Loading />
          ) : (
            <VirtualizedList
              onRefresh={() => refresh()}
              refreshing={isFetching}
              data={Data}
              initialNumToRender={3}
              renderItem={({item}) => (
                <CardTurn
                  Data={item}
                  onPress={() =>
                    navigation.push('DetailsTurn', {date: item.date, item})
                  }
                />
              )}
              getItemCount={() => Data.length}
              keyExtractor={(item, index) => index}
              getItem={getItem}
              ItemSeparatorComponent={() => <Divider />}
            />
          )}
        </ContainerSection>
      </View>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      {visibleCamera && (
        <CameraFaceDetected
          access_type_timelog={accessTypeTimelog}
          navigation={navigation}
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
      <ModalResponse
        view={viewModalPermissionLocation}
        onHideModal={() => {
          setViewModalPermissionLocation(false);
        }}
        type={'warning'}
        message={'Common.warnings.notPermissionGPS'}
      />
    </View>
  );
};

const mapStateToProps = ({auth, config}) => {
  return {
    user: auth.user,
    config,
  };
};

export default connect(mapStateToProps)(HomeApp);
