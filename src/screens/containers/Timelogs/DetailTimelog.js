import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, BackHandler, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  BasePageChildren,
  IconMyIntelli,
  ListItemTextMyIntelli,
  DateFormat,
  TimeFormat,
  AvatarMyIntelli,
  ReturnDefaultJob,
  ModalResponse,
} from '../../components';
import {ActivityIndicator, Divider, Text} from 'react-native-paper';
import {Maps} from '../../components/';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {COLORS} from '../../../settings/theme';
import {formatDateTime, setDateUTCUser} from '../../../settings/utils';
import {actions} from '../../../store';

const DetailTimelog = ({
  navigation,
  timelog = '2021-06-15 13:00',
  job,
  access_type_timelog = 1,
  verified = true,
  coordinates = {lat: 10.4928495, lng: -66.8886195},
  modView = true,
  photo = null,
  route,
  config,
  auth,
  structures,
  postTimelog,
  base64,
  getLocation,
}) => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [viewModalSuccess, setViewModalSuccess] = useState(false);

  const dateTimeNow = () => {
    const datetime = setDateUTCUser(config, new Date());
    return datetime.format('YYYY-MM-DD HH:mm:ss');
  };

  const Photo = ({url}) => (
    <View
      style={{
        backgroundColor: COLORS.BORDER,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      <AvatarMyIntelli url={url} size={100} />
    </View>
  );

  if (route.params) {
    access_type_timelog = route.params.access_type_timelog;
    modView = route.params.modView;
    coordinates = route.params.coordinates;
    timelog = route.params.timelog;

    if (route.params.newTimelog) {
      timelog = dateTimeNow();
      base64 = route.params.base64;
      if (route.params.photo != null) photo = route.params.photo;
    } else {
      job = route.params.job;
      if (route.params.photo != null) {
        photo = route.params.photo
          ? route.params.photo.includes('client')
            ? `${config.url}/file/${route.params.photo}`
            : route.params.photo
          : null;
      }
    }
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Back();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
  useEffect(async () => {
    const response = await getLocation(coordinates);
    const {data} = response;
    const info = data.data.results.find(i => i.types.includes('neighborhood'));
    if (info) {
      setLocation(info.formatted_address);
    } else {
      const idEntity = auth.user ? auth.user.person.idEntityActive : null;
      const entity = auth.user.person.entities.find(
        i => i.id_entity == idEntity,
      );
      const structuresEntity = structures.filter(i =>
        structures
          .filter(i => entity.structures.includes(i.id_structure))
          .map(i => i.path.split('.'))
          .flat()
          .includes(i.id_structure.toString()),
      );
      const structure = structuresEntity.find(i => i.id_structure_type === 3);
      setLocation(structure.structure);
    }
  }, [coordinates]);

  useEffect(() => {
    if (message) {
      setViewModal(true);
    }
  }, [message]);
  const Back = o => {
    if (modView) navigation.goBack();
    else navigation.navigate('Home');
  };
  const getColor = o => {
    return o == 1 ? COLORS.IN : COLORS.OUT;
  };
  const sendTimelog = async () => {
    setIsLoading(true);
    const {response, error} = await postTimelog({
      coordinates,
      access_type_timelog: access_type_timelog,
      photo: base64,
    });
    if (response) {
      setViewModalSuccess(true);
    } else {
      if (error.response) {
        let codError = String(error.response.data.status);
        switch (codError) {
          case '748':
            setMessage('Errors.personPhotoNotBelongTo');
            break;
          case '746':
            setMessage('Errors.personPhotoThereAreNoFaces');
            break;
          case '745':
            setMessage('Errors.personPhotoMoreThanOneElementExits');
            break;
          default:
            setMessage('Errors.invalid');
            break;
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <BasePageChildren
      title={t('DetailTimelog.title')}
      navigation={navigation}
      Back={modView ? null : Back}
      paddingNone>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 0,
          }}>
          <Photo url={photo ? photo : null} />

          <View style={{width: wp(65), marginLeft: 16}}>
            <ListItemTextMyIntelli
              ph={0}
              icon={'calendar'}
              fontWeight={'normal'}
              title={<DateFormat>{timelog}</DateFormat>}
            />
            <ListItemTextMyIntelli
              ph={0}
              icon={'clock'}
              fontWeight={'normal'}
              title={<TimeFormat>{timelog}</TimeFormat>}
            />
            <ListItemTextMyIntelli
              ph={0}
              icon={'faceid'}
              type={'intelli'}
              fontWeight={'normal'}
              title={
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Text>{`${t(
                    `DetailTimelog.${access_type_timelog == 1 ? 'in' : 'out'}`,
                  )} ${
                    modView
                      ? `- ${
                          verified &&
                          t(
                            `DetailTimelog.${
                              verified ? 'verified' : 'notVerified'
                            }`,
                          )
                        } `
                      : ''
                  } `}</Text>
                  <IconMyIntelli
                    icon={
                      access_type_timelog == 1 ? 'sign-in-alt' : 'sign-out-alt'
                    }
                    size={16}
                    color={getColor(access_type_timelog)}
                  />
                </View>
              }
            />
            {job && (
              <ListItemTextMyIntelli
                ph={0}
                fontWeight={'normal'}
                icon={'briefcase'}
                title={job}
              />
            )}
            <ListItemTextMyIntelli
              ph={0}
              icon={'location'}
              fontWeight={'normal'}
              title={location}
            />
          </View>
        </View>
        <Divider />
        {coordinates && (
          <View style={{flex: 1}}>
            <Maps coordinates={coordinates} />
          </View>
        )}
        {!modView && (
          <TouchableOpacity
            onPress={() => !isLoading && sendTimelog()}
            style={{
              flex: 0,
              width: '100%',
              backgroundColor: !isLoading ? COLORS.IN : COLORS.DISABLED,
              minHeight: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isLoading && (
              <ActivityIndicator
                animating
                size={'small'}
                color={'white'}
                style={{marginRight: 10}}
              />
            )}
            <Text style={{fontSize: 16, color: 'white'}}>
              {t(`DetailTimelog.sendTimelog`)}
            </Text>
          </TouchableOpacity>
        )}
        <ModalResponse
          view={viewModal}
          onHideModal={() => {
            setViewModal(false);
            navigation.navigate('Home');
          }}
          type={'warning'}
          message={message}
        />
        <ModalResponse
          view={viewModalSuccess}
          onHideModal={() => {
            setViewModalSuccess(false);
            navigation.navigate('Home', {newTimelog: true});
          }}
          type={'success'}
          message={'Common.successTimelogNew'}
        />
      </View>
    </BasePageChildren>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    flex: 1,
  },
});

const mapStateToProps = ({config, auth, structures}) => {
  return {
    config,
    auth,
    structures: structures.tree,
  };
};
const mapDispatchToProps = dispatch => ({
  postTimelog: value => dispatch(actions.myintelliapi.timelogsNew(value)),
  getLocation: value => dispatch(actions.myintelliapi.getLocationMaps(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailTimelog);
