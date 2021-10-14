import React from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import { IconMyIntelli } from '.';
import { COLORS } from '../../settings/theme';
import { Capitalize } from '../../settings/utils';


const ListItemTextMyIntelli = ({ title = null, icon = null, description = null, ph = 16, type = null, typeLetter = 'ucfirst', typeLetterTitle = 'ucfirst', fontWeight= 'bold' }) => {
    
    return (
        <View 
            style={[styles.container, styles.flexRow, { paddingHorizontal: ph}]}
            >
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    {(icon) && (
                        <IconMyIntelli
                            icon={icon}
                            size={16}
                            type={type}
                            />
                    )}
                    {(title) && (
                        <Text style={[styles.textStyle, (fontWeight == 'bold' ?styles.textBold : {}), {marginLeft: icon ? 4 : 0}]}>{typeof title === "object" ? title : Capitalize(title, typeLetterTitle)}</Text>
                    )}
                </View>
                {(description) && (
                    <Text style={[styles.description, { maxWidth: '70%', overflow: 'hidden' }]}  ellipsizeMode='middle'>{typeof description === "object" ? description : Capitalize(description, typeLetter)}</Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flexRow:{
        flexDirection: 'row', 
    },
    container: {
        borderBottomWidth: 1, 
        borderBottomColor: COLORS.BORDER, 
        paddingVertical: 8,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textStyle: {
        fontSize: 15,
        color: COLORS.TEXT_BLACK
    },
    description:{
        fontSize: 14,
    },
    textBold:{
        fontWeight: 'bold'
    },
})

export default ListItemTextMyIntelli;