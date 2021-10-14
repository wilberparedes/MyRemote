import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

import { ItemText, TimeFormat } from '.';
import { COLORS } from '../../settings/theme';
import { getDateNameMonth, setStatusPermission, typePermissionsItems } from '../../settings/utils';

const ItemDetailsPermissionMatriz = ({ date_time_in, date_time_out, description, status_approval, novelty_permission, index, length }) => {

    const { t } = useTranslation();


    return(
        <View
            style={[styles.flexRow, styles.container, {borderBottomWidth: (index == length-1 ? 1 : 0)}]}
            >
            <View style={styles.containerDateTime}>
                <Text style={{ textAlign: 'center' }}>{getDateNameMonth(date_time_in, ' ', 'v')}</Text>
            </View>
            <View style={styles.containerContent}>
                <ItemText
                    title={`${t(`Permission.type`)}:`}
                    description={`${novelty_permission.novelty_permission} (${typePermissionsItems.find((d) => d.value == novelty_permission.type_novelty_permission).label})`}
                    />
                <ItemText
                    title={`${t(`Permission.hour`)}:`}
                    description={
                        <>
                            <TimeFormat>{date_time_in}</TimeFormat>
                            {` - `}
                            <TimeFormat>{date_time_out}</TimeFormat>
                        </>
                    }
                    />
                <ItemText
                    title={`${t(`Permission.description`)}:`}
                    description={description}
                    />
                <ItemText
                    title={`${t(`Permission.status`)}:`}
                    description={t(`Permission.${setStatusPermission(status_approval)}`)}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flexRow:{
        flexDirection: 'row', 
    },
    container: {
        borderWidth: 1, 
        borderColor: COLORS.TEXT_SEMIBLACK, 
        borderRadius: 0,
        minHeight: 80,
    },
    containerDateTime: {
        flex: .1, 
        paddingHorizontal: 8, 
        justifyContent: 'center', 
        borderRightWidth: 1, 
        borderColor: COLORS.TEXT_SEMIBLACK, 
        paddingVertical: 8
    },
    containerContent: { 
        flex: .9, 
        marginLeft: 8, 
        paddingVertical: 8,
    },
})

export default ItemDetailsPermissionMatriz;
