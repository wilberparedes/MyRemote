import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { formatDateTime, ReturnDayWeek, setDateUTCUser } from '../../settings/utils';

const DateTimeNowUTC = ({ config, style }) => {

    const {t} = useTranslation();
    const [dateNow, setDateNow] = useState('')
    const [timeNow, setTimeNow] = useState('')

    useEffect(() => {
        dateTimeNow();
        const timer = window.setInterval(() => {
            dateTimeNow();
        }, 1000);
        return () => {
            window.clearInterval(timer);
        };
    }, [config]);

    const dateTimeNow = () => {
        const datetime = setDateUTCUser(
            config,
            new Date()
        );
        setDateNow(`${t('General.daysAbv.'+ReturnDayWeek(datetime))}, ${formatDateTime(config, null, datetime)}`);
        setTimeNow(`${formatDateTime(config, null, datetime, "time", true)}`);
    };
    return (
        
        <View>
            <Text style={{...style, fontSize: 14, textAlign: 'center'}}>{dateNow}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {timeNow.split('').map((d, i) => (
                    <Text key={i} style={{...style, width: 16, fontSize: 35, textAlign: 'center', fontFamily: 'Technology' }}>{d}</Text>
                ))}
            </View>
        </View>
    )
}

const mapStateToProps = ({ config }) => {
    return {
        config
    };
};

export default connect(mapStateToProps)(DateTimeNowUTC);
