import React, {useEffect, useState} from 'react';
import Moment from 'moment-timezone';
import {
  View,
  BackHandler,
  StyleSheet,
  VirtualizedList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  CardTimesGroupByDate,
  ContainerSection,
  ListItemTextMyIntelli,
  ToolbarDate,
  BasePageChildren,
} from '../../components';
import {useTranslation} from 'react-i18next';
import {useStore} from 'react-redux';
import {actions} from '../../../store';
import {Divider} from 'react-native-paper';
import {getItem, setNumberFormat, calcdiffHours} from '../../../settings/utils';
import {COLORS} from '../../../settings/theme';
import {connect} from 'react-redux';

const Calculations = ({Data, numberFormat}) => {
  const {t} = useTranslation();
  return (
    <ContainerSection title={t('Times.resumeHours')}>
      <ListItemTextMyIntelli
        title={t('Times.hoursScheduled')}
        description={`${setNumberFormat(numberFormat, Data.programmed)}`}
      />
      <ListItemTextMyIntelli
        title={t('Times.hoursWorking')}
        description={`${setNumberFormat(numberFormat, Data.worked_up)}`}
      />
      <ListItemTextMyIntelli
        title={t('Times.hoursRegular')}
        description={`${setNumberFormat(numberFormat, Data.hours_regular)}`}
      />
      <ListItemTextMyIntelli
        title={t('Times.hoursExtra')}
        description={`${setNumberFormat(numberFormat, Data.extra)}`}
      />
    </ContainerSection>
  );
};

const Times = ({navigation, numberFormat}) => {
  const {t} = useTranslation();
  const {dispatch} = useStore();
  const [dateIn, setDateIn] = useState(Moment());
  const [dateOut, setDateOut] = useState(Moment());
  const [isFetching, setIsFetching] = useState(false);
  const [pairTimelogs, setPairTimelogs] = useState([]);
  const [times, setTimes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [permission, setPermission] = useState([]);
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const Back = () => {
    navigation.goBack();
  };
  const getItems = async () => {
    getTimes().then(data => {
      processItems(data.data.results);
    });
  };

  useEffect(() => {
    let arrayMap = [];
    let dateAux = dateIn.clone();
    while (dateAux < dateOut) {
      arrayMap.push({date: dateAux.format('YYYY-MM-DD')});
      dateAux.add(1, 'd');
    }
    setElements(arrayMap);
    const timeout = setTimeout(() => {
      setIsLoading(true);
      getItems();
    }, 300);

    return () => clearTimeout(timeout);
  }, [dateIn, dateOut]);
  const getTimes = async () => {
    return await dispatch(
      actions.myintelliapi.timesFetch({
        date_in: dateIn.format('YYYY-MM-DD'),
        date_out: dateOut.format('YYYY-MM-DD'),
      }),
    );
  };
  const processItems = items => {
    if (items.length > 0) {
      setPairTimelogs(processTimelogsPair(items[0]));
      setTimes(proccessTimes(items[0]));
      setSchedules(processSchedule(items[0]));
      setPermission(items[0].permissions);
    }
    setIsLoading(false);
  };
  const proccessTimes = ({calculations, schedules}) => {
    const programmed = schedules.reduce((carrier, i) => {
      return carrier + calcdiffHours(i.date_time_in, i.date_time_out);
    }, 0);
    const hours_regular = calculations
      .filter(
        i =>
          i.status_approval == 1 &&
          ['HOUR', 'HOUR_NIGHT'].includes(i.concept_master.code_concept),
      )
      .reduce((carrier, i) => {
        return carrier + calcdiffHours(i.datetime_in, i.datetime_out);
      }, 0);
    const worked_up = calculations
      .filter(
        i =>
          i.status_approval == 1 &&
          ['HOUR', 'HOUR_NIGHT', 'EXTRA', 'EXTRA_NIGHT'].includes(
            i.concept_master.code_concept,
          ),
      )
      .reduce((carrier, i) => {
        return carrier + calcdiffHours(i.datetime_in, i.datetime_out);
      }, 0);
    const extra = calculations
      .filter(
        i =>
          i.status_approval == 1 &&
          ['EXTRA', 'EXTRA_NIGHT'].includes(i.concept_master.code_concept),
      )
      .reduce((carrier, i) => {
        return carrier + calcdiffHours(i.datetime_in, i.datetime_out);
      }, 0);
    return {
      hours_regular: Number(hours_regular.toFixed(2)),
      worked_up: Number(worked_up.toFixed(2)),
      extra: Number(extra.toFixed(2)),
      programmed: Number(programmed.toFixed(2)),
    };
  };
  const processTimelogsPair = ({timelogPairs, calculations}) => {
    return timelogPairs.map(item => {
      let coordinates = null;
      let photo = null;
      let timelog_in = null;
      if (item.timelog_in) {
        if (item.timelog_in.coordinates.length != 0) {
          coordinates = {
            lat: parseFloat(item.timelog_in.coordinates.lat),
            lng: parseFloat(item.timelog_in.coordinates.lng),
          };
        }
        if (item.timelog_in.payload_timelog.length != 0) {
          photo = item.timelog_in.payload_timelog.photo;
        }
        timelog_in = {
          timelog: item.timelog_in.timelog,
          access_type_timelog: item.timelog_in.access_type_timelog,
          id_timelog: item.timelog_in.id_timelog,
          coordinates,
          photo,
          location: item.timelog_in.structure.structure,
          timezone_pg: item.timelog_in.timezone_pg,
        };
      }
      coordinates = null;
      photo = null;
      let timelog_out = null;
      if (item.timelog_out) {
        if (item.timelog_out.coordinates.length != 0) {
          coordinates = {
            lat: parseFloat(item.timelog_out.coordinates.lat),
            lng: parseFloat(item.timelog_out.coordinates.lng),
          };
        }
        if (item.timelog_out.payload_timelog.length != 0) {
          photo = item.timelog_out.payload_timelog.photo;
        }
        timelog_out = {
          timelog: item.timelog_out.timelog,
          access_type_timelog: item.timelog_out.access_type_timelog,
          id_timelog: item.timelog_out.id_timelog,
          coordinates,
          photo,
          location: item.timelog_out.structure.structure,
          timezone_pg: item.timelog_out.timezone_pg,
        };
      }

      const hours_regular = calculations
        .filter(
          i =>
            i.id_timelog_pair === item.id_timelog_pair &&
            i.status_approval == 1 &&
            ['HOUR', 'HOUR_NIGHT'].includes(i.concept_master.code_concept),
        )
        .reduce((carrier, i) => {
          return carrier + calcdiffHours(i.datetime_in, i.datetime_out);
        }, 0);
      const hours_extra = calculations
        .filter(
          i =>
            i.id_timelog_pair === item.id_timelog_pair &&
            i.status_approval == 1 &&
            ['EXTRA', 'EXTRA_NIGHT'].includes(i.concept_master.code_concept),
        )
        .reduce((carrier, i) => {
          return carrier + calcdiffHours(i.datetime_in, i.datetime_out);
        }, 0);

      const worked_up = calculations
        .filter(
          i =>
            i.id_timelog_pair === item.id_timelog_pair &&
            i.status_approval == 1 &&
            ['HOUR', 'HOUR_NIGHT', 'EXTRA', 'EXTRA_NIGHT'].includes(
              i.concept_master.code_concept,
            ),
        )
        .reduce((carrier, i) => {
          return carrier + calcdiffHours(i.datetime_in, i.datetime_out);
        }, 0);

      const novelties = calculations
        .filter(
          i =>
            i.id_timelog_pair === item.id_timelog_pair &&
            i.status_approval == 1 &&
            ['NOVELTY'].includes(i.concept_master.code_concept),
        )
        .reduce((carrier, i) => {
          return carrier + calcdiffHours(i.datetime_in, i.datetime_out);
        }, 0);

      const breaks = calculations
        .filter(
          i =>
            i.id_timelog_pair === item.id_timelog_pair &&
            i.status_approval == 1 &&
            ['BREAK'].includes(i.concept_master.code_concept),
        )
        .reduce((carrier, i) => {
          return carrier + calcdiffHours(i.datetime_in, i.datetime_out);
        }, 0);

      return {
        hours_regular: Number(hours_regular.toFixed(2)),
        hours_extra: Number(hours_extra.toFixed(2)),
        worked_up: Number(worked_up.toFixed(2)),
        novelties: Number(novelties.toFixed(2)),
        breaks: Number(breaks.toFixed(2)),
        timelog_in,
        timelog_out,
      };
    });
  };
  const processSchedule = ({schedules}) => {
    return schedules.map(i => {
      return {
        ...i,
      };
    });
  };
  return (
    <BasePageChildren
      title={t('Times.title')}
      navigation={navigation}
      BackNone={true}
      paddingNone>
      <View style={styles.toolbarContainer}>
        <ToolbarDate
          start={dateIn.format('YYYY-MM-DD')}
          handleStart={setDateIn}
          end={dateOut.format('YYYY-MM-DD')}
          handleEnd={setDateOut}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      ) : (
        <>
          <Calculations Data={times} numberFormat={numberFormat} />
          <ContainerSection title={t('Times.worked')} style={{flex: 1}}>
            <VirtualizedList
              onRefresh={() => getItems()}
              refreshing={isFetching}
              data={elements}
              showsVerticalScrollIndicator={false}
              initialNumToRender={5}
              renderItem={({item}) => {
                const _pairTimelogs = pairTimelogs.filter(
                  i =>
                    (i.timelog_in &&
                      i.timelog_in.timelog.includes(item.date)) ||
                    (i.timelog_out &&
                      i.timelog_out.timelog.includes(item.date)),
                );
                const _schedules = schedules.filter(i =>
                  i.date_time_in.includes(item.date),
                );
                const _permission = permission.filter(i =>
                  i.date_time_in.includes(item.date),
                );
                return (
                  <CardTimesGroupByDate
                    onPress={() =>
                      navigation.push('DetailsTime', {
                        date: item.date,
                        pairTimelogs: _pairTimelogs,
                        schedules: _schedules,
                        permissions: _permission,
                      })
                    }
                    Data={{
                      date: item.date,
                      pairTimelogs: _pairTimelogs,
                      schedules: _schedules,
                      permissions: _permission,
                    }}
                  />
                );
              }}
              getItemCount={() => elements.length}
              keyExtractor={(item, index) => index}
              getItem={getItem}
              ItemSeparatorComponent={() => <Divider />}
              ListEmptyComponent={
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 16,
                  }}>
                  <Text style={{fontSize: 18}}>{t(`General.notResult`)}</Text>
                </View>
              }
            />
          </ContainerSection>
        </>
      )}
    </BasePageChildren>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbarContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
const mapStateToProps = ({config}) => {
  return {
    numberFormat: config.numberFormat,
  };
};

export default connect(mapStateToProps)(Times);
