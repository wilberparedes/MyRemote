import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../settings/theme';
import { IconMyIntelli } from '.';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ButtonTimelog = ({ title, icon, position = 'left', onPress, color = 'white', textColor = COLORS.TEXT_BLACK }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button, 
                (position == 'left' ? styles.left : styles.right ),
                { backgroundColor: color}
            ]}>
            <View style={styles.content}>
                <IconMyIntelli
                    icon={icon}
                    size={22}
                    color={textColor}
                />
                <Text style={{ color: textColor, }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        // borderWidth: 1, 
        // borderColor: COLORS.TEXT_SEMIBLACK, 
        borderRadius: 8,
        width: hp(10),
        height: hp(10),
        maxHeight: 70,
        maxWidth: 70
        // position: 'absolute',
        // bottom: 25
    },
    left: {
        // left: 25,
    },
    right: {
        // right: 25,
    },
    content: {
        alignItems: 'center',
        // justifyContent: 'flex-start',
        flex: 1,
        justifyContent: 'center'
    }
})
export default ButtonTimelog;
