import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { BasePageChildren, Entities } from '../../components';
import { BackHandler } from 'react-native';

const TypePerson = ({ navigation, user: User }) => {

    const { t } = useTranslation();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
            () => {
                return true;
            }
        );
        return () => backHandler.remove();
    }, []);

    if(!User){
        return null;
    }

    useEffect(() => {
        if(User.person.idEntityActive){
            navigation.goBack();
        }
    }, [User.person.idEntityActive]);

    return (
        <BasePageChildren
            title={t('Common.selectedTypePerson')}
            navigation={navigation}
            BackNone
            paddingNone
        >
            <Entities />
        </BasePageChildren>
    );
};

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user,
    };
};

export default connect(mapStateToProps)(TypePerson);