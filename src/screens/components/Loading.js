import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../settings/theme';

import {
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Loading = ({ size = 'large', color = COLORS.PRIMARY }) => {
    return(
        <View
            style={{
                position: 'relative',
                width: wp(100) - 32,
                paddingVertical: 10,
                marginVertical: 10,
            }}
        >
            <ActivityIndicator animating size={size} color={color}/>
        </View>
    )
}

export default Loading
