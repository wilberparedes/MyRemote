import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, BackHandler } from 'react-native';
import {
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import { callCellPhone, openMailTo, openCoordinates } from '../../settings/utils';
import { BasePageChildren, IconMyIntelli, LinkText, ListItemTextMyIntelli, Maps } from '../components';

const DetailsCountry = ({navigation, route}) => {

    const { t } = useTranslation();
    const { Data } = route.params;

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
            title={
                <>
                    <IconMyIntelli
                        icon={Data.icon}
                        size={20}
                        type={'intelli'}
                        />
                    <Text style={{marginLeft: 8}}>{` ${t(`Countrys.${Data.icon}`)}`}</Text>
                </>
            }
            navigation={navigation}
            paddingNone
            Back={Back}
            >
            <View style={{flex: 0}}>
                
                <ListItemTextMyIntelli
                    icon={'envelope'}
                    title={t(`Support.email`)}
                    description={
                        <LinkText
                            right
                            onPress={() => openMailTo(Data.email)}
                            text={Data.email}
                            />
                    }
                    />
                <ListItemTextMyIntelli
                    icon={'phone-alt'}
                    title={t(`Support.cellphones`)}
                    description={
                        <LinkText
                            right
                            onPress={() => callCellPhone(Data.cellphone)}
                            text={Data.cellphone}
                            />
                    }
                    />
                
                <ListItemTextMyIntelli
                    icon={'map-marked'}
                    title={t(`Support.address`)}
                    description={
                        <LinkText
                            right
                            onPress={() => openCoordinates( Data.coordinates.lat, Data.coordinates.lng)}
                            text={Data.address}
                            numberOfLines={2}
                            />
                    }
                    />
            </View>
            <View style={{flex: 1}}>
                <Maps coordinates={{...Data.coordinates}} />
            </View>
        </BasePageChildren>
    )
}

export default DetailsCountry
