import React from 'react';
import { View, Image } from 'react-native';
import { Appbar } from 'react-native-paper';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { IconButtonMyIntelli } from '.';
import { COLORS } from '../../settings/theme';


const HeaderHome = ({navigation}) => {

    return (
        <View style={{ paddingTop: 0, backgroundColor: COLORS.BLACK }}>
            <View style={{height: getStatusBarHeight(), backgroundColor: COLORS.BLACK }} />
            <Appbar.Header
                style={{
                    elevation: 0,
                }}
                theme={{ colors: { primary: COLORS.BLACK } }}>
                <Image
                    style={{
                        width: 180,
                        height: '100%',
                        resizeMode: 'contain',
                    }}
                    source={ require("../../assets/logo-horizontal-white.png")}
                    />
                <Appbar.Content
                    title={''}
                    titleStyle={{ color: COLORS.TEXT_BLACK}}
                />
                {/* <IconButtonMyIntelli
                    icon={'bell'}
                    color={'white'}
                    size={25}
                    type={'light'}
                    onPress={() => navigation.push('Notifications')}
                    /> */}
                <IconButtonMyIntelli
                    icon={'user-circle'}
                    color={'white'}
                    size={25}
                    type={'light'}
                    style={{marginLeft: -2}}
                    onPress={() => navigation.push('User')}
                    />
            </Appbar.Header>
        </View>
    );

};

export default HeaderHome;