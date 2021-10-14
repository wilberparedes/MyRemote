import moment from "moment";
import React, { useState } from 'react';
import {
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
    Dialog,
    Portal
  } from "react-native-paper";
  import { connect } from 'react-redux';
import { Trans, useTranslation } from "react-i18next";
import DatePicker from "react-native-date-picker";

import { ButtonMyIntelli, InputField } from ".";
import { COLORS } from "../../settings/theme";


const TimePicker = ({ timeFormat: format, onDateChange, label, value, iconRight, style = {}, error = null, disabled = false }) => {

    const { t } = useTranslation();

    const [show, setShow] = useState(false)
    const [time, setTime] = useState(value ? new Date(value) : new Date())

    const _showDateTimePicker = () => setShow(true);
    const _hideDateTimePicker = () => setShow(false);

    const _handleDatePicked = (selectedTime) => {
        Platform.OS === 'android' && _hideDateTimePicker();
        if (selectedTime) {
            const newTime = moment(selectedTime, format).format("HH:mm:ss");
            onDateChange(newTime);
        }
        Platform.OS === 'ios' && _hideDateTimePicker();
    };

    const _setNow = () => {
        const today = new Date();
        setTime(today);
        _handleDatePicked(today);
    }

    return (
        <TouchableOpacity onPress={() => !disabled && _showDateTimePicker()}>
            <InputField 
                label={label}
                value={ value ? moment(value, "HH:mm:ss").format(format) : '' }
                editable={false}
                iconRight={iconRight}
                iconRightPress={() => !disabled &&  _showDateTimePicker()}
                style={style}
                error={error}
                disabled={disabled}
                />
            <Portal>
                <Dialog
                    visible={show}
                    onDismiss={() => _hideDateTimePicker()}
                    >
                    <Dialog.Title><Trans t={t}>General.hour</Trans></Dialog.Title>
                    <Dialog.Content style={{alignItems: "center"}}>
                        <DatePicker
                            date={time}
                            mode="time"
                            is24hourSource={"locale"}
                            textColor={COLORS.TEXT_BLACK}
                            locale={format == "HH:mm" ? "fr" : "en"}
                            onDateChange={setTime}
                            androidVariant={Platform.OS === 'android' ? 'nativeAndroid' : 'nativeAndroid' }
                            />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <ButtonMyIntelli
                            style={{ marginBottom: 4, marginRight: 8 }}
                            title={t("Common.now")}
                            onPress={() => _setNow()}
                            />
                        <ButtonMyIntelli
                            style={{ marginBottom: 4, marginRight: 8 }}
                            title={t("General.done")}
                            onPress={() => _handleDatePicked(time)}
                            />
                    </Dialog.Actions>
                </Dialog>
            </Portal>
      
        </TouchableOpacity>
    );
}

const mapStateToProps = ({ config }) => {
    return {
        timeFormat: config.timeFormat,
    };
};

export default connect(mapStateToProps)(TimePicker);