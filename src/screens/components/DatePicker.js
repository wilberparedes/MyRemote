import moment from "moment-timezone";
import React, { useState } from 'react';
import {
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
    Dialog,
    Portal
} from "react-native-paper";
import i18n from "i18next";
import { connect } from 'react-redux';
import { Trans, useTranslation } from "react-i18next";
import DatePicker from "react-native-date-picker";

import { ButtonMyIntelli, InputField } from ".";
import { COLORS } from "../../settings/theme";

const _DatePicker = ({ dateFormat: format, onDateChange: ODC, label, value, iconRight, style = {}, minDate = null, error = null, disabled = false}) => {

    const { t } = useTranslation();
    const [show, setShow] = useState(false)
    const [date, setDate] = useState(value ? new Date(value) : (minDate ? new Date(minDate) : new Date()))

    const _showDateTimePicker = () => setShow(true);
    const _hideDateTimePicker = () => setShow(false);

    const _handleDatePicked = (selectedDate) => {
        Platform.OS === 'android' && _hideDateTimePicker();
        if (selectedDate) {
            const newDate = moment(selectedDate).format("YYYY-MM-DD");
            ODC(newDate);
        }
        Platform.OS === 'ios' && _hideDateTimePicker();
    };

    const _setToday = () => {
        const today = new Date();
        setDate(today);
        _handleDatePicked(today);
    }

    return (
        <TouchableOpacity  onPress={() => !disabled && _showDateTimePicker()}>
            <InputField 
                iconRight={iconRight}
                label={label}
                iconRightPress={() => !disabled && _showDateTimePicker()}
                value={ value ? moment(value).format(format) : '' }
                editable={false}
                style={style}
                error={error}
                disabled={disabled}
                />
            
            <Portal>
                <Dialog
                    visible={show}
                    onDismiss={() => _hideDateTimePicker()}
                    >
                    <Dialog.Title><Trans t={t}>General.date</Trans></Dialog.Title>
                    <Dialog.Content style={{alignItems: "center"}}>
                        <DatePicker
                            date={date}
                            mode="date"
                            textColor={COLORS.TEXT_BLACK}
                            minimumDate={minDate}
                            format={"YYYY-MM-DD"}
                            locale={i18n.language.replace("lang ", "")}
                            onDateChange={setDate}
                            androidVariant={'nativeAndroid'}
                            />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <ButtonMyIntelli
                            style={{ marginBottom: 4, marginRight: 8 }}
                            title={t("Common.today")}
                            onPress={() => _setToday()}
                            />
                        <ButtonMyIntelli
                            style={{ marginBottom: 4, marginRight: 14 }}
                            title={t("General.done")}
                            onPress={() => _handleDatePicked(date)}
                            />
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </TouchableOpacity>
    );
}


const mapStateToProps = ({ config }) => {
    return {
        dateFormat: config.dateFormat,
    };
};

export default connect(mapStateToProps)(_DatePicker);