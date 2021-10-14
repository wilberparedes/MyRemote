import React, {useEffect, useState} from 'react';
import {View, VirtualizedList} from 'react-native';
import {Card} from '../';
import {Divider} from 'react-native-paper';
import {getItem} from '../../../settings/utils';
import {actions} from '../../../store';
import {useStore} from 'react-redux';
import {setDateUTC} from '../../../settings/utils';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const List = ({navigation, config, refresh, onRefresh, user: User}) => {
  const [timelogs, setTimelogs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [imgProfile, setImgProfile] = useState(null);
  const {dispatch} = useStore();
  const renderItem = ({item, index}) => {
    return (
      <Card
        {...item}
        onPress={() =>
          navigation.push('DetailTimelog', {...item, modView: true})
        }
      />
    );
  };
  const getImage = async () => {
    const photo = await AsyncStorage.getItem(`${User.person.dui_person}-photo`);
    if (photo) {
      setImgProfile(photo);
    }
  };
  const getDataTimelogs = () => {
    getTimelogs().then(data => {
      setTimelogs(
        data.data.results.map(t => {
          let coordinates = false;
          if (t.coordinates.length != 0) {
            coordinates = {
              lat: parseFloat(t.coordinates.lat),
              lng: parseFloat(t.coordinates.lng),
            };
          }
          let photo = imgProfile;
          if (t.payload_timelog.length != 0) {
            photo = t.payload_timelog.photo;
          }
          const dateUtc = setDateUTC(config, t.timelog, t.timezone_pg);
          return {
            id_timelog: t.id_timelog,
            access_type_timelog: t.access_type_timelog,
            timelog: dateUtc.format('YYYY-MM-DD HH:mm:ss'),
            timezone_pg: t.timezone_pg,
            location: t.structure.structure,
            verification_mode: t.verification_mode,
            coordinates,
            photo,
          };
        }),
      );
    });
  };
  useEffect(() => {
    if (refresh) {
      getDataTimelogs();
      onRefresh();
    }
  }, [refresh]);
  useEffect(async () => {
    await getImage();
    getDataTimelogs();
  }, []);
  const getTimelogs = async () => {
    return await dispatch(actions.myintelliapi.timelogsFetch());
  };
  return (
    <View style={{flexDirection: 'column', justifyContent: 'center', flex: 1}}>
      <VirtualizedList
        refreshing={isFetching}
        onRefresh={() => getDataTimelogs()}
        showsVerticalScrollIndicator={false}
        data={timelogs}
        initialNumToRender={6}
        renderItem={renderItem}
        getItemCount={() => timelogs.length}
        keyExtractor={item => item.id_timelog}
        getItem={getItem}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};
const mapStateToProps = ({config, auth}) => {
  return {
    config,
    user: auth.user,
  };
};
export default connect(mapStateToProps, null)(List);
