import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLORS } from '../../settings/theme';


const HeaderWithButtons = ({title, Left, Right, colorTitle, transparent = false}) => {

    return (
        <View style={{ paddingTop: 0, backgroundColor: (transparent ? 'transparent' : COLORS.PRIMARY) }}>
            <View style={{height: getStatusBarHeight(), backgroundColor: (transparent ? 'transparent' : COLORS.PRIMARY) }} />
            <Appbar.Header
                style={{
                    elevation: 0,
                }}
                theme={{ colors: { primary:  (transparent ? 'transparent' : COLORS.PRIMARY) } }}>
                {(Left) && (
                   Left
                )}
                <Appbar.Content
                    title={title}
                    titleStyle={{ color: colorTitle}}
                />
                {(Right) && (
                    Right
                )}
            </Appbar.Header>
        </View>
    );

};

export default HeaderWithButtons;