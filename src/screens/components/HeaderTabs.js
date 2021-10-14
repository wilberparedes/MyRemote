import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLORS } from '../../settings/theme';

const HeaderTabs = ({title, Right}) => {

    return (
        <View style={{ paddingTop: getStatusBarHeight(), backgroundColor: COLORS.BLACK }}>
            <Appbar.Header
                style={{
                    elevation: 0,
                }}
                theme={{ colors: { primary: COLORS.BLACK } }}>
                <Appbar.Content
                    title={title}
                    titleStyle={{ color: 'white'}}
                />
                {(Right) && (
                    Right
                )}
            </Appbar.Header>
        </View>
    );

};

export default HeaderTabs;