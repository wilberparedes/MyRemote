import React, { useEffect } from 'react';
import { View, Text, VirtualizedList, BackHandler } from 'react-native';
import { useTranslation } from "react-i18next";

import { BasePageChildren, ItemDetailsPermission, ItemDetailsTurn } from '../components';
import { getItem } from '../../settings/utils';


const DetailsTurn = ({ navigation, route }) => {

    const { t } = useTranslation();
    const { params } = route;
    const newData = params.item.schedules.concat(params.item.permissions)
    
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                Back();
                return true;
            }
        );
        return () => backHandler.remove();
    }, []);

    const Back = () => {
        navigation.goBack();
    }

    return (
        <BasePageChildren
            title={t(`Common.informationTurn`)}
            navigation={navigation}
            paddingNone
            >
            <VirtualizedList
                data={newData}
                initialNumToRender={14}
                renderItem={({item}) => (
                    (item.id_entity_permission ?
                        (
                            <ItemDetailsPermission
                                {...item}
                                navigation={navigation}
                                onPress={() => navigation.push('DetailsPermission', { Data: item } ) }
                            /> 
                        )
                        :
                        (
                            <ItemDetailsTurn
                                {...item}
                            />
                        )
                    )
                )}
                getItemCount={() => newData.length}
                keyExtractor={(item, index) => index}
                getItem={getItem}
                ListEmptyComponent={<View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 16}}><Text style={{fontSize: 18}}>{t(`Turn.unscheduled`)}</Text></View>}
                />
        </BasePageChildren>
    )
}

export default DetailsTurn;
