import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, BackHandler, VirtualizedList} from 'react-native';
import {Divider} from 'react-native-paper';
import {COLORS} from '../../settings/theme';
import {setNumberFormat, getItem, calcdiffHours} from '../../settings/utils';
import {
  AvatarMyIntelli,
  BasePageChildren,
  ContainerSection,
  ListItemTextMyIntelli,
  Card,
  CardTurn,
  CardPermissions,
} from '../components';
import {connect} from 'react-redux';

const DetailsTime = ({route, navigation, numberFormat}) => {
  const {t} = useTranslation();
  const {params} = route;
  const [hoursRegular, setHoursRegular] = useState(0);
  const [hoursExtra, setHoursExtra] = useState(0);
  const [workedUp, setWorkedUp] = useState(0);
  const [novelties, setNovelties] = useState(0);
  const [breaks, setBreaks] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [timelogs, setTimelogs] = useState([]);
  const [hoursScheduled, setHoursScheduled] = useState(0);
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

  useEffect(() => {
    const {pairTimelogs, schedules, permissions} = params;
    setPermissions(permissions);
    const hoursNovelties = permissions.reduce((carrier, i) => {
      return carrier + calcdiffHours(i.date_time_in, i.date_time_out);
    }, 0);
    setNovelties(Number(hoursNovelties.toFixed(2)));
    setHoursRegular(
      pairTimelogs.reduce((carrier, i) => {
        return carrier + i.hours_regular;
      }, 0),
    );
    setHoursExtra(
      pairTimelogs.reduce((carrier, i) => {
        return carrier + i.hours_extra;
      }, 0),
    );
    setWorkedUp(
      pairTimelogs.reduce((carrier, i) => {
        return carrier + i.worked_up;
      }, 0),
    );
    setBreaks(
      pairTimelogs.reduce((carrier, i) => {
        return carrier + i.breaks;
      }, 0),
    );
    if (schedules.length > 0) {
      const _schedules = schedules.map(schedule => {
        return {
          ...schedule,
          hours: calcdiffHours(schedule.date_time_in, schedule.date_time_out),
        };
      });
      setSchedules(_schedules);
    }
    if (pairTimelogs.length > 0) {
      const _timelogs = pairTimelogs
        .map(timelog => {
          return [timelog.timelog_in, timelog.timelog_out];
        })
        .flat()
        .filter(timelog => timelog != null);
      setTimelogs(_timelogs);
    }
  }, [params]);
  useEffect(() => {
    if (schedules.length > 0) {
      setHoursScheduled(
        schedules.reduce((carrier, i) => {
          return carrier + i.hours;
        }, 0),
      );
    }
  }, [schedules]);
  const Back = () => {
    navigation.goBack();
  };

  const TotalGeneral = () => {
    return (
      <ContainerSection title={t('Times.generalTotal')}>
        <View>
          <ListItemTextMyIntelli
            title={t('Times.hoursScheduled')}
            description={`${setNumberFormat(
              numberFormat,
              Number(hoursScheduled.toFixed(2)),
            )}`}
          />
          <ListItemTextMyIntelli
            title={t('Times.hoursWorking')}
            description={`${setNumberFormat(
              numberFormat,
              Number(workedUp.toFixed(2)),
            )}`}
          />
          <ListItemTextMyIntelli
            title={t('Times.hoursRegular')}
            description={`${setNumberFormat(
              numberFormat,
              Number(hoursRegular.toFixed(2)),
            )}`}
          />
          <ListItemTextMyIntelli
            title={t('Times.hoursExtra')}
            description={`${setNumberFormat(
              numberFormat,
              Number(hoursExtra.toFixed(2)),
            )}`}
          />
          <ListItemTextMyIntelli
            title={t('Times.breaks')}
            description={`${setNumberFormat(
              numberFormat,
              Number(breaks.toFixed(2)),
            )}`}
          />
          <ListItemTextMyIntelli
            title={t('Times.novelties')}
            description={`${setNumberFormat(
              numberFormat,
              Number(novelties.toFixed(2)),
            )}`}
          />
        </View>
      </ContainerSection>
    );
  };

  const Photo = ({url, style}) => (
    <View
      style={{
        ...style,
        backgroundColor: COLORS.BORDER,
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      <AvatarMyIntelli url={url} size={45} />
    </View>
  );
  return (
    <BasePageChildren
      title={t('Times.workingDay')}
      navigation={navigation}
      paddingNone>
      <TotalGeneral />
      <ContainerSection
        title={t('Menu.shifts')}
        style={{flex: schedules.length > 1 ? 1 : 0}}>
        <VirtualizedList
          data={schedules}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          renderItem={({item}) => {
            return (
              <CardTurn
                Data={{date: params.date, schedules: [item]}}
                onPress={() =>
                  navigation.push('DetailsTurn', {
                    date: params.date,
                    item: {
                      schedules: [item],
                      permissions: [],
                    },
                  })
                }
              />
            );
          }}
          getItemCount={() => schedules.length}
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
              <Text style={{fontSize: 14}}>{t(`Turn.notTurn`)}</Text>
            </View>
          }
        />
      </ContainerSection>
      <ContainerSection
        title={t('Menu.permits')}
        style={{flex: permissions.length > 1 ? 1 : 0}}>
        <VirtualizedList
          data={permissions}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          renderItem={({item}) => {
            return (
              <CardPermissions
                Data={item}
                onPress={() =>
                  navigation.push('DetailsPermission', {Data: item})
                }
                ph={16}
              />
            );
          }}
          getItemCount={() => permissions.length}
          keyExtractor={(permission, index) => index}
          getItem={getItem}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 16,
              }}>
              <Text style={{fontSize: 14}}>
                {t(`Permission.notPermission`)}
              </Text>
            </View>
          }
        />
      </ContainerSection>
      <ContainerSection
        title={t('Common.timelogs')}
        style={{flex: timelogs.length > 1 ? 1 : 0}}>
        <VirtualizedList
          data={timelogs}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          renderItem={({item}) => {
            return (
              <Card
                {...item}
                onPress={() =>
                  navigation.push('DetailTimelog', {...item, modView: true})
                }
              />
            );
          }}
          getItemCount={() => timelogs.length}
          keyExtractor={(timelogs, index) => index}
          getItem={getItem}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 16,
              }}>
              <Text style={{fontSize: 14}}>{t(`Common.notTimelog`)}</Text>
            </View>
          }
        />
      </ContainerSection>
    </BasePageChildren>
  );
};
const mapStateToProps = ({config}) => {
  return {
    numberFormat: config.numberFormat,
  };
};

export default connect(mapStateToProps)(DetailsTime);
