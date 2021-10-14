import React, {useEffect, useState} from 'react';
import Moment from 'moment-timezone';
import {View, StyleSheet} from 'react-native';
import {DatePicker, ButtonCircle, MonthPicker} from '../';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../../settings/theme';
import {Divider} from 'react-native-paper';

const ToolbarDate = ({start, end, handleStart, handleEnd}) => {
  const {t} = useTranslation();
  const [dateIn, setDateIn] = useState(Moment(start));
  const [dateOut, setDateOut] = useState(Moment(end));
  const [type, setType] = useState('W');
  const handleDate = value => {
    let auxDate = null;
    const In = Moment(value);
    setDateIn(In);
    handleStart(In);
    const in1 = In.clone();
    switch (type) {
      case 'D':
        setDateOut(in1);
        handleEnd(in1);
        break;
      case 'W':
        auxDate = in1.add(6, 'd');
        setDateOut(auxDate);
        handleEnd(auxDate);
        break;
      case 'M':
        auxDate = in1.startOf('month');
        const out = dateIn.endOf('month');
        setDateIn(auxDate);
        handleStart(auxDate);
        setDateOut(out);
        handleEnd(out);
        break;
      case 'B':
        auxDate = in1.add(14, 'd');
        setDateOut(auxDate);
        handleEnd(auxDate);
        break;
    }
  };
  useEffect(() => {
    setDateByCut();
  }, [type]);
  useEffect(() => {
    setDateByCut();
  },[])
  const setDateByCut = () => {
    let auxDate = null;
    const in1 = dateIn.clone();
    switch (type) {
      case 'D':
        setDateOut(in1);
        handleEnd(in1);
        break;
      case 'W':
        auxDate = in1.add(6, 'd');
        setDateOut(auxDate);
        handleEnd(auxDate);
        break;
      case 'M':
        auxDate = in1.startOf('month');
        const out = dateIn.endOf('month');
        setDateIn(auxDate);
        handleStart(auxDate);
        setDateOut(out);
        handleEnd(out);
        break;
      case 'B':
        auxDate = in1.add(14, 'd');
        setDateOut(auxDate);
        handleEnd(auxDate);
        break;
    }
  };
  return (
    <>
      <View style={styles.toolbar}>
        {type == 'M' ? (
          <MonthPicker
            value={dateIn.format('YYYY-MM-DD')}
            handleValue={handleDate}
          />
        ) : (
          <DatePicker
            label={t(`General.date`)}
            value={dateIn}
            onDateChange={handleDate}
            iconRight="calendar"
          />
        )}
        <View style={styles.toolbar_button}>
          <ButtonCircle
            title={t(`Turn.week`)}
            color={COLORS.PRIMARY}
            textColor={'white'}
            active={type == 'W'}
            onPress={() => setType('W')}
          />
          <ButtonCircle
            title={t(`Turn.biweekly`)}
            color={COLORS.PRIMARY}
            textColor={'white'}
            active={type == 'B'}
            onPress={() => setType('B')}
          />
          <ButtonCircle
            title={t(`Turn.monthly`)}
            color={COLORS.PRIMARY}
            textColor={'white'}
            active={type == 'M'}
            onPress={() => setType('M')}
          />
        </View>
      </View>
      <Divider  style={{backgroundColor: COLORS.BORDER, height: 1}} />
    </>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolbar_button: {
    flexDirection: 'row',
  },
});
export default ToolbarDate;
