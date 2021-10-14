import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux';
import { TemperatureWithFormat } from '../../settings/utils';

const TemperatureFormat = ({ children, temperatureFormat, style }) => {
    return (
        <Text style={{...style}}>{TemperatureWithFormat(children, temperatureFormat)}</Text>
    )
}

const mapStateToProps = ({ config }) => {
    return {
        temperatureFormat: config.temperatureFormat,
    };
};

export default connect(mapStateToProps)(TemperatureFormat);;