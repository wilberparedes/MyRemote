import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ItemInfo = ({ title, description }) => {
    return (
        <View style={styles.contentItem}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contentItem:{
        paddingBottom: 4
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    description:{
        fontSize: 14
    }
})

export default ItemInfo
