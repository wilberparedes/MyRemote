import React, { useEffect, useState } from 'react';
import { BackHandler, Text } from 'react-native';
import { useTranslation } from "react-i18next";

import { BasePageChildren, LinkText, ListItemMyIntelli, ListItemTextMyIntelli } from '../components';
import { COLORS } from '../../settings/theme';
import { callCellPhone, openMailTo, countrys } from '../../settings/utils';

const TechnicalSupport = ({ navigation }) => {

    const { t } = useTranslation();
    const [cActive, setCActive] = useState(null);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                Back();
                return true;
            }
        );
        return () => backHandler.remove();
    }, [cActive]);

    const Back = () => {
        if(cActive){
            setCActive(null);
        }else{
            navigation.goBack();
        }
    }

    return (
        <BasePageChildren
            title={t(`Common.support`)}
            navigation={navigation}
            paddingNone
            Back={Back}
            >
                {(!cActive) ? 
                    countrys.map((d) => (
                        <ListItemMyIntelli
                            key={d.id}
                            icon={d.icon}
                            type={'intelli'}
                            title={t(`Countrys.${d.icon}`)}
                            ph={16}
                            onPress={() => setCActive(d.id)}
                            />
                    ))
                    : (
                        <>
                            <ListItemTextMyIntelli
                                icon={'envelope'}
                                title={t(`Support.email`)}
                                description={
                                    <LinkText
                                        right
                                        onPress={() => openMailTo(countrys.find(d => d.id == cActive).email)}
                                        text={countrys.find(d => d.id == cActive).email}
                                        />
                                }
                                />
                            <ListItemTextMyIntelli
                                icon={'phone-alt'}
                                title={t(`Support.cellphones`)}
                                description={
                                    <LinkText
                                        right
                                        onPress={() => callCellPhone(countrys.find(d => d.id == cActive).cellphone)}
                                        text={countrys.find(d => d.id == cActive).cellphone}
                                        />
                                }
                                />
                            <ListItemTextMyIntelli
                                icon={'book'}
                                title={t(`Support.userManual`)}
                                description={<Text style={{ textDecorationLine: 'underline', color: COLORS.PRIMARY }}>MyIntelli V1.pdf</Text>}
                                /> 
                        </>
                    )
                }
        </BasePageChildren>
    )
}

export default TechnicalSupport;
