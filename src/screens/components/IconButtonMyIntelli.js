import React from 'react';
import { ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { IconMyIntelli } from './';

const IconButtonMyIntelli = ({icon, color, size, onPress, style, type = 'light', loading = false }) => {
    if(loading){
        return(
            <ActivityIndicator size="small" color={color} style={{marginRight: 8}} />
        )
    }
    return (
        <IconButton
            icon={(props) => <IconMyIntelli icon={icon} size={props.size} color={props.color} type={type} />}
            onPress={onPress}
            size={size}
            color={color}
            style={style}
            />
    )
}

export default IconButtonMyIntelli
