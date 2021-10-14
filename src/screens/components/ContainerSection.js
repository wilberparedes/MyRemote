import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { COLORS } from '../../settings/theme';
import { Capitalize } from '../../settings/utils';

const ContainerSection = ({ children, title, style = {}, right, bgColor =  COLORS.BGSECTION, titleAlign = 'left',  typeLetter = 'ucfirst' }) => {
    return (
        <View style={[styles.container, {...style}]}>
            <List.Subheader style={[styles.title, {textAlign: titleAlign, backgroundColor: bgColor}]}>{typeof title === "object" ? title : Capitalize(title, typeLetter)}</List.Subheader>
            {(right) && (
                <View style={{position: 'absolute', right: 16, top: 5}}>
                    {right}
                </View>
            )}
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative', 
    },
    title: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '500'
    } 
})

export default ContainerSection;
