import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux';
import { DateTimeWithFormat } from '../../settings/utils';

const DateTimeFormat = ({ children, dateFormat, timeFormat, style }) => {
    return (
        <Text style={{...style}}>{DateTimeWithFormat(children, dateFormat, timeFormat)}</Text>
    )
}
const mapStateToProps = ({ config }) => {
    return {
        timeFormat: config.timeFormat,
        dateFormat: config.dateFormat,
    };
};

export default connect(mapStateToProps)(DateTimeFormat);;