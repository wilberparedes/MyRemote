import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../settings/theme';
import { Capitalize } from '../../settings/utils';

const ItemText = ({ title, description, Extra, typeLetter = 'ucfirst' }) => {
    return (
        <View style={styles.contentItem}>
            
            <Text style={styles.description} numberOfLines={1}> <Text style={styles.title}>{title}</Text> {typeof description === "object" ? description : Capitalize(description, typeLetter)}</Text>
            {(Extra) && (
                Extra
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    contentItem:{
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    title:{
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.TEXT_BLACK
    },
    description:{
        fontSize: 14,
        marginRight: 4
    },
})

export default ItemText;
