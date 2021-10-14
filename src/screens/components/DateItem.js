import React from 'react';
import { View, Text } from 'react-native';
import { getDateDay } from '../../settings/utils';
import DayWeek from './DayWeek';

const DateItem = ({date, orientation = 'v', backgroundColor, color = 'white'}) => {
    return (
        <View style={{backgroundColor, width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center'}}>
            <Text style={{ textAlign: 'center', fontSize: 12, color, fontWeight: 'bold' }}>
                <DayWeek datestring={date} />
                {(orientation == 'v' ? '\n': null)}
                {getDateDay(date)}
            </Text>
        </View>
    )
}

export default DateItem;
