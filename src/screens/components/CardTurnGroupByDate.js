import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';
import {
  DateItem,
  IconMyIntelli,
  ItemText,
  ReturnDefaultJob,
  ReturnLocalization,
  TimeFormat,
} from '.';
import {COLORS} from '../../settings/theme';
import moment from 'moment';
import ListItemMyIntelli from './ListItemMyIntelli';

const CardTurnGroupByDate = ({onPress, Data}) => {
  const {t} = useTranslation();
  const turn = Data.schedules;
  const {permissions} = Data;

  const bgColor =
    moment().format('YYYY-MM-DD') == moment(Data.date).format('YYYY-MM-DD')
      ? COLORS.PRIMARY
      : '#9B9B9B';

  return (
    <ListItemMyIntelli
      left={<DateItem date={Data.date} backgroundColor={bgColor} />}
      onPress={() => (onPress ? onPress() : console.info(`Press `))}>
      <View style={styles.containerContent}>
        {turn.length > 0 ? (
          turn.map(
            ({date_time_in, date_time_out, id_structure, id_job, job}, i) => {
              return (
                <View
                  key={i}
                  style={{
                    position: 'relative',
                    marginBottom: i == turn.length - 1 ? 0 : 8,
                    paddingBottom: i == turn.length - 1 ? 0 : 8,
                    borderBottomWidth: i == turn.length - 1 ? 0 : 1,
                    borderBottomColor: COLORS.BORDER,
                  }}>
                  <View style={styles.flexRow}>
                    <ItemText
                      title={`${t(`Turn.since`)}:`}
                      description={<TimeFormat>{date_time_in}</TimeFormat>}
                    />
                    <ItemText
                      title={`${t(`Turn.until`)}:`}
                      description={<TimeFormat>{date_time_out}</TimeFormat>}
                      Extra={
                        permissions.length > 0 && (
                          <IconMyIntelli icon={'address-card'} size={16} />
                        )
                      }
                    />
                  </View>
                  <ItemText
                    title={`${t('Turn.localization')}:`}
                    description={<ReturnLocalization id={id_structure} />}
                  />
                  {job && (
                    <ItemText
                      title={`${t('Turn.job')}:`}
                      description={
                        id_job && job ? job.job_name : <ReturnDefaultJob />
                      }
                    />
                  )}
                </View>
              );
            },
          )
        ) : (
          <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
            <Text style={[styles.textStyle, {marginRight: 4}]}>
              {t(`Turn.unscheduled`)}
            </Text>
            {permissions.length > 0 && (
              <IconMyIntelli icon={'address-card'} size={16} />
            )}
          </View>
        )}
      </View>
    </ListItemMyIntelli>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  containerContent: {
    flex: 1,
  },
  textStyle: {
    fontSize: 14,
  },
});
export default CardTurnGroupByDate;
