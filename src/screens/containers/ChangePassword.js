import React, { useState, useEffect } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { BasePageChildren, IconButtonMyIntelli, InputField } from '../components';
import { useTranslation } from "react-i18next";
import { actions } from '../../store';

const ChangePassword = ({ navigation, changeConfiguration }) => {

    const inputs = {};
    const focusTheField = (id) => {  inputs[id].focus();}

    const { t } = useTranslation();
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [secondNewPassword, setSecondNewPassword] = useState('');
    const [secondNewPasswordError, setSecondNewPasswordError] = useState('');

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

    useEffect(() => {
        if(passwordError) setPasswordError(!passwordError)
        if(newPasswordError) setNewPasswordError(!newPasswordError)
        if(secondNewPasswordError) setSecondNewPasswordError(!secondNewPasswordError)
    }, [password, newPassword, secondNewPassword])

    const Back = () => {
        navigation.goBack();
    }

    const SaveNewPassword = async () => {
        if (password.trim() == '') {
            setPasswordError(t('FormErrors.if111'));
            focusTheField('password');
            return false;
        }
        else if (newPassword.trim() == '') {
            setNewPasswordError(t('FormErrors.if111'));
            focusTheField('newPassword');
            return false;
        }
        else if (newPassword.trim().length < 6) {
            setNewPasswordError(t('FormErrors.if115'));
            focusTheField('newPassword');
            return false;
        }
        else if (secondNewPassword.trim() == '') {
            setSecondNewPasswordError(t('FormErrors.if111'));
            focusTheField('secondNewPassword');
            return false;
        }
        else if (newPassword.trim() != secondNewPassword.trim()) {
            setSecondNewPasswordError(t('FormErrors.if125'));
            focusTheField('secondNewPassword');
            return false;
        }
        else {
            setLoading(true);
            const response = await changeConfiguration({password_current: password, password: secondNewPassword})
            if(response){
                setPassword('');
                setNewPassword('');
                setSecondNewPassword('');
            }
            setLoading(false);
        }
        
    }

    return (
        <BasePageChildren
            title={t(`Common.restorePassword`)}
            navigation={navigation}
            Right={
                <IconButtonMyIntelli
                    icon={'check'}
                    color={'white'}
                    loading={loading}
                    onPress={() => SaveNewPassword()}
                    />
            }
            >
            <InputField
                innerRef={(input) => {
                    inputs['password'] = input;
                }}
                value={password}
                label={t("ChangePassword.currentPassword")}
                password
                showPassword
                onChange={(value) => setPassword(value)}
                error={passwordError}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusTheField('newPassword')}
                />
            <InputField
                innerRef={(input) => {
                    inputs['newPassword'] = input;
                }}
                value={newPassword}
                label={t("ChangePassword.newPassword")}
                password
                onChange={(value) => setNewPassword(value)}
                error={newPasswordError}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => focusTheField('secondNewPassword')}
                />
            <InputField
                innerRef={(input) => {
                    inputs['secondNewPassword'] = input;
                }}
                value={secondNewPassword}
                label={t("ChangePassword.validationPassword")}
                password
                onChange={(value) => setSecondNewPassword(value)}
                error={secondNewPasswordError}
                onSubmitEditing={() => SaveNewPassword()}
                />
        </BasePageChildren>
       
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        flex: 1
    }
})

const mapDispatchToProps = dispatch => ({
    changeConfiguration: (value) => 
        dispatch(actions.myintelliapi.changeConfiguration(value)),
});

export default connect(null, mapDispatchToProps)(ChangePassword);
