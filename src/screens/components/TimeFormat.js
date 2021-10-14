import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux';
import { TimeWithFormat }  from '../../settings/utils';

const TimeFormat = ({ children, timeFormat, style }) => {
    return (
        <Text style={{...style}}>{ children && TimeWithFormat(children, timeFormat)}</Text>
    )
}

const mapStateToProps = ({ config }) => {
    return {
        timeFormat: config.timeFormat,
    };
};

export default connect(mapStateToProps)(TimeFormat);;