import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  AvatarMyIntelli,
  DateFormat,
  IconMyIntelli,
  ItemText,
  ListItemMyIntelli,
  TimeFormat,
} from '.';
import {COLORS} from '../../settings/theme';
import {connect} from 'react-redux';
import {setDateUTC} from '../../settings/utils';

const CardTimesGroupByDate = ({onPress, Data, config}) => {
  const {date} = Data;
  const [dateIn, setDateIn] = useState(null);
  const [dateOut, setDateOut] = useState(null);
  const [schedule, setSchedule] = useState(null);
  useEffect(() => {
    const {pairTimelogs, schedules} = Data;
    const scheduleIn = schedules.reduce((carrier, i) => {
      if (carrier == null) return i;
      if (carrier.date_time_in < i.date_time_in) {
        return i;
      } else {
        return carrier;
      }
    }, null);
    const scheduleOut = schedules.reduce((carrier, i) => {
      if (carrier == null) return i;
      if (carrier.date_time_out < i.date_time_out) {
        return i;
      } else {
        return carrier;
      }
    }, null);
    const timelogIn = pairTimelogs
      .filter(i => i.timelog_in != null)
      .reduce((carrier, i) => {
        if (carrier == null) return i;
        if (carrier.timelog_in.timelog > i.timelog_in.timelog) {
          return i;
        } else {
          return carrier;
        }
      }, null);
    const timelogOut = pairTimelogs
      .filter(i => i.timelog_out != null)
      .reduce((carrier, i) => {
        if (carrier == null) return i;
        if (carrier.timelog_out.timelog < i.timelog_out.timelog) {
          return i;
        } else {
          return carrier;
        }
      }, null);

    if (timelogIn) {
      const dateInUtc = setDateUTC(
        config,
        timelogIn.timelog_in.timelog,
        timelogIn.timelog_in.timezone_pg,
      );
      setDateIn({
        ...timelogIn.timelog_in,
        timelog: dateInUtc.format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    if (timelogOut) {
      const dateOutUtc = setDateUTC(
        config,
        timelogOut.timelog_out.timelog,
        timelogOut.timelog_out.timezone_pg,
      );
      setDateOut({
        ...timelogOut.timelog_out,
        timelog: dateOutUtc.format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    if (scheduleIn) {
      setSchedule({
        in: scheduleIn.date_time_in,
        out: scheduleOut.date_time_out,
      });
    }
  }, [Data]);

  const {t} = useTranslation();
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
    <ListItemMyIntelli
      left={
        <>
          <Photo
            url={dateIn && `${config.url}/file/${dateIn.photo}`}
            style={{marginBottom: 4}}
          />
          <Photo url={dateOut && `${config.url}/file/${dateOut.photo}`} />
        </>
      }
      onPress={onPress}
      ph={16}>
      <View>
        <ItemText
          title={`${t(`General.date`)}:`}
          description={<DateFormat>{date}</DateFormat>}
        />

        <ItemText
          title={`${t(`DetailTimelog.turn`)}:`}
          description={
            schedule ? (
              <>
                <TimeFormat>{schedule.in}</TimeFormat>
                {` - `}
                <TimeFormat>{schedule.out}</TimeFormat>
              </>
            ) : (
              `${t(`Times.notScheduled`)}`
            )
          }
        />
        {dateIn ? (
          <ItemText
            title={`${t(`General.hourIn`)}:`}
            description={<TimeFormat>{dateIn.timelog}</TimeFormat>}
            Extra={
              <IconMyIntelli icon={'sign-in-alt'} size={18} color={COLORS.IN} />
            }
          />
        ) : (
          <ItemText
            title={`${t(`General.hourIn`)}:`}
            description={`${t(`Times.withoutPunch`)}`}
          />
        )}

        {dateOut ? (
          <ItemText
            title={`${t(`General.hourOut`)}:`}
            description={<TimeFormat>{dateOut.timelog}</TimeFormat>}
            Extra={
              <IconMyIntelli
                icon={'sign-out-alt'}
                size={18}
                color={COLORS.OUT}
              />
            }
          />
        ) : (
          <ItemText
            title={`${t(`General.hourOut`)}:`}
            description={`${t(`Times.withoutPunch`)}`}
          />
        )}
      </View>
    </ListItemMyIntelli>
  );
};

const mapStateToProps = ({config}) => {
  return {
    config,
  };
};

export default connect(mapStateToProps)(CardTimesGroupByDate);
