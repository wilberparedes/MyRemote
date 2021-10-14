import React from 'react';
import { View, } from 'react-native';
import { Button } from 'react-native-paper';

import { IconMyIntelli } from './';

const ButtonMyIntelli = ({styleContainer, style, mode = "outlined", onPress, title, icon, iconSize = 18, loading, disabled}) => {
    return (
        <View style={{...styleContainer}}>
            <Button
                icon={icon ? (props) => <IconMyIntelli icon={icon} size={iconSize} color={props.color} /> : null}
                mode={mode}
                onPress={onPress}
                style={{...style}}
                loading={loading}
                disabled={disabled}
                >
                {title}
            </Button>
        </View>
    )
}

export default ButtonMyIntelli
