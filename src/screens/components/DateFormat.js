import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux';

import { DateWithFormat } from '../../settings/utils';
import { DayWeek } from '.';

const DateFormat = ({ children, dateFormat, style }) => {

    return (
        <Text style={{...style}}>
            {children && <DayWeek datestring={children} />}
            {children && `, ${DateWithFormat( children, dateFormat )}`}</Text>
    )
}
const mapStateToProps = ({ config }) => {
    return {
        dateFormat: config.dateFormat,
    };
};

export default connect(mapStateToProps)(DateFormat);