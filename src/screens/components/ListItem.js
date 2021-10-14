import React from 'react'
import { List } from 'react-native-paper'
import { IconMyIntelli } from '.'

const ListItem = ({ title, icon, size = 25, color, onPress }) => {
    return (
        <List.Item
            title={title} 
            titleStyle={{ fontSize: 16 }}
            style={{ paddingVertical: 0, backgroundColor: 'white'}}
            left={() => <List.Icon icon={() => <IconMyIntelli icon={icon} size={size} color={color} />} />}
            onPress={() => (onPress ? onPress() : console.info(`Press ${title}`)) } 
            right={() => <List.Icon icon={(props) => <IconMyIntelli icon={'chevron-right'} size={14} color={color} />} />}
            />
    )
}

export default ListItem
