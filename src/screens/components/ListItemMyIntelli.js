import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconMyIntelli } from '.';
import { COLORS } from '../../settings/theme';

const ListItemMyIntelli = ({ left = null, icon = null, title = null, right = null, onPress, children, ph = 0, IconExtraRight = null, type = null }) => {
    
    return (
        <TouchableOpacity 
            style={[styles.container, styles.flexRow, { paddingHorizontal: ph}]}
            onPress={onPress}
            >
            <View style={{flex: .9, flexDirection: 'row', alignItems: 'center'}}>
                {(icon) && (
                    <IconMyIntelli
                        icon={icon}
                        size={16}
                        type={type}
                        />
                )}
                {(left) && (
                    <View style={styles.containerDateTime}>
                        {left}
                    </View>
                )}
                {(title) ? (
                    <Text style={[styles.textStyle, {marginLeft: icon ? 4 : 0} ]}>{title}</Text>
                ) : (
                    children
                )}
            </View>
            {(right) ? (
                <View style={styles.containerIconRight}>
                    {right}
                    {IconExtraRight}
                </View>
            ) : ( 
                <View style={styles.containerIconRight}>
                    <IconMyIntelli 
                        icon={'chevron-right'} 
                        size={14}
                        color={COLORS.TEXT_SEMIBLACK}
                        />
                    {IconExtraRight}
                </View>
            )}
        </TouchableOpacity>
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
    containerDateTime: {
        paddingRight: 8, 
        justifyContent: 'center', 
    },
    textStyle: {
        fontSize: 15,
    },
    containerIconRight: {
        flex: .1, 
        alignItems: 'flex-end', 
        justifyContent: 'space-between'
    }
})

export default ListItemMyIntelli;