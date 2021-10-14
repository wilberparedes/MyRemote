import React from 'react';
import { View, StatusBar } from 'react-native';
import { HeaderTitleWithBack } from './';

const BasePageChildren = ({ navigation, BackNone = false, children, title, Right = null, Back = null, paddingNone = false,  style = {} }) => {

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <HeaderTitleWithBack
                title={title}
                navigation={navigation}
                Right={Right}
                goBack={Back}
                BackNone={BackNone}
                />
            <View style={{...style, flex: 1, paddingHorizontal: (paddingNone ? 0 : 16), paddingTop: (paddingNone ? 0 : 16), paddingBottom: (paddingNone ? 0 : 0) }}>
                {children}
            </View>
            <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true}/>
        </View>
    )
}

export default BasePageChildren;
