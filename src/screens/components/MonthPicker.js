import React, {useState,useEffect} from 'react';
import Moment from 'moment-timezone';
import {View, TouchableOpacity, Platform} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {InputField, ButtonMyIntelli,IconMyIntelli} from '.';
import MonthPicker from 'react-native-month-picker';
import {connect} from 'react-redux';

const Month = ({value, handleValue, style = {}, config}) => {
  const [date, setDate] = useState(Moment(value));
  const [show, setShow] = useState(false);
  const {t} = useTranslation();
  const _showDateTimePicker = () => setShow(true);
  const _hideDateTimePicker = () => setShow(false);
  const [locale,setLocale] = useState("en");
  const _setToday = () => {
    setDate(Moment());
    handleValue(Moment().format('YYYY-MM-DD'));
    setShow(false);
  };

  const _handleDatePicked = selectedDate => {
    Platform.OS === 'android' && _hideDateTimePicker();
    if (selectedDate) {
      const newDate = Moment(selectedDate).format('YYYY-MM-DD');
      handleValue(newDate);
    }
    Platform.OS === 'ios' && _hideDateTimePicker();
  };
  useEffect(() => {
    setLocale(config.language.split("-")[0])
  },[config])
  return (
    <>
      <View>
        <TouchableOpacity onPress={_showDateTimePicker}>
          <InputField
            iconRight={'calendar'}
            label={t(`General.date`)}
            iconRightPress={_showDateTimePicker}
            value={date ? Moment(value).format('YYYY-MM') : ''}
            editable={false}
            style={style}
          />
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog visible={show} onDismiss={() => setShow(false)}>
          <Dialog.Title>{t(`General.date`)}</Dialog.Title>
          <Dialog.Content style={{alignItems: 'center'}}>
            <MonthPicker
              selectedDate={date}
              onMonthChange={setDate}
              swipable={true}
              localeLanguage={locale}
              prevIcon={<IconMyIntelli icon={"arrow-left"} size={20} color={"black"} />}
              nextIcon={<IconMyIntelli icon={"arrow-right"} size={20} color={"black"} />}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <ButtonMyIntelli
              style={{marginBottom: 4, marginRight: 8}}
              title={t('Common.today')}
              onPress={() => _setToday()}
            />
            <ButtonMyIntelli
              style={{marginBottom: 4, marginRight: 14}}
              title={t('General.done')}
              onPress={() => _handleDatePicked(date)}
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const mapStateToProps = ({config}) => {
  return {
    config,
  };
};

export default connect(mapStateToProps)(Month);