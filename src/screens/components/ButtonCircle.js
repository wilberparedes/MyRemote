import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ButtonCircle = ({ onPress = () => {}, title, active = false, color = 'red', textColor = 'white' }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[(active && styles.active), styles.button, { backgroundColor: (active ? color : 'gray')} ]}
            >
            <Text style={[ styles.button_text, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red', 
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginLeft: 8
    },
    button_text:{
        fontSize: 18, 
        fontWeight: 'bold'
    },
    active: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    }
})

export default ButtonCircle;
