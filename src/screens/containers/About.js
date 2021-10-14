import React, { useEffect, } from 'react';
import { View, Text, BackHandler, Image, Platform } from 'react-native';
import { useTranslation } from "react-i18next";
import { getVersion } from 'react-native-device-info';

import { BasePageChildren, ButtonMyIntelli, ContainerSection, ListItemMyIntelli, ListItemTextMyIntelli } from '../components';
import { countrys, handleOpenLink } from '../../settings/utils';

const About = ({ navigation }) => {

    const { t } = useTranslation();

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
            title={t(`Common.about`)}
            navigation={navigation}
            paddingNone
            Back={Back}
            >
            <View style={{ justifyContent: 'space-between', flex: 1, paddingTop: 0, paddingBottom: 16 }}>
                <View>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={{alignSelf: 'center', width: 200, height: 200, marginBottom: 8}}
                        />
                    
                    <ContainerSection
                        title={t('About.contactus')}
                        >
                        {countrys.map((d) => (
                            <ListItemMyIntelli
                                key={d.id}
                                icon={d.icon}
                                type={'intelli'}
                                title={t(`Countrys.${d.icon}`)}
                                ph={16}
                                onPress={() => navigation.push('DetailsCountry', {Data: d})}
                                />
                        ))}
                    </ContainerSection>

                    <ContainerSection
                        title={t('About.app')}
                        >
                        <ListItemTextMyIntelli
                            icon={Platform.OS === 'ios' ? 'app-store' : 'google-play'}
                            type={'normal'}
                            title={`${t('About.nameapp')}:`}
                            description={`MyIntelli`}
                            />
                        <ListItemTextMyIntelli
                            icon={'code'}
                            title={`Core:`}
                            description={`V ${getVersion()}`}
                            />
                        <ListItemTextMyIntelli
                            icon={'layer-group'}
                            title={`Front:`}
                            description={`V 1.0`}
                            />
                    </ContainerSection>


                    <ButtonMyIntelli
                        icon={'globe'}
                        title={`www.intelli-next.com`}
                        style={{ alignSelf: 'center'}}
                        mode={'contained'}
                        styleContainer={{ marginTop: 8 }}
                        onPress={() => handleOpenLink('https://www.intelli-next.com/')}
                        />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>{t("Common.copyright")}</Text>
                </View>
            </View>
        
        </BasePageChildren>
    )
}

export default About;
