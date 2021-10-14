import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const LinkText = ({ onPress, text, right = false, numberOfLines = 1 }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            >
            <Text style={{textDecorationLine: 'underline', fontSize: 14, overflow: 'hidden',  width: widthPercentageToDP(60), textAlign: right ? 'right' : 'left' }} numberOfLines={numberOfLines}>{text}</Text>
        </TouchableOpacity>
    )
}

export default LinkText
