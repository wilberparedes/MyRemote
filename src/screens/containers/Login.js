import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, StyleSheet, Image, BackHandler, TouchableOpacity,ImageBackground } from 'react-native';
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { actions } from '../../store';
import { COLORS } from '../../settings/theme';
import { ButtonMyIntelli, InputField, HeaderWithButtons, IconButtonMyIntelli, ModalRestorePassword } from '../components';

function Login({ authLogin, navigation }) {

    const { t } = useTranslation();
    const [visibleRestore, setVisibleRestore] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [erroremail, setErroremail] = useState(false)
    const [pass, setPass] = useState('');
    const [errorpassword, setErrorpassword] = useState(false)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                return true;
            }
        );
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        if(erroremail) setErroremail(!erroremail)
    }, [email])
    useEffect(() => {
        if(errorpassword) setErrorpassword(!errorpassword)
    }, [pass])

    const sendLogin = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.trim() == '') {
            setErroremail(t('Login.placeholderEmail'));
            return false;
        }
        else if (!reg.test(email)) {
            setErroremail(t('FormErrors.if116'));
            return false;
        }
        else if (pass.trim() == '') {
            setErrorpassword(t('Login.placeholderPassword'));
            return false;
        }
        else{
            setLoading(true);
            const respLogin = await authLogin({email, password: pass});
            if(!respLogin) setLoading(false);
        }
    }

    return (
        <ImageBackground 
                source={require('../../assets/login-background.jpg')}
                style={{flex: 1, width: wp(100), backgroundColor: "white",}}
                >
        <View style={{ flex: 1, justifyContent: 'space-between'}}>

            <HeaderWithButtons
                transparent
                Left={
                    <IconButtonMyIntelli
                        icon="cog"
                        onPress={() => navigation.push('ServerUrl')}
                        color={COLORS.PRIMARY}
                        />
                }
                Right={
                    <IconButtonMyIntelli
                        icon="globe"
                        onPress={() => navigation.push('Language')}
                        color={COLORS.PRIMARY}
                        />
                }
                 />
            
            <View style={{paddingHorizontal: 32}} >
                <View style={{alignItems: 'center', paddingBottom: 16}}>
                    <Image
                        style={styles.logo}
                        source={ require("../../assets/logo.png")}
                        />
                </View>
                <View>
                    <InputField
                        iconLeft='user'
                        value={email}
                        label={t("Login.email")}
                        keyboardType={"email-address"}
                        onChange={setEmail}
                        error={erroremail}
                        />
                    <InputField
                        style={{marginBottom: 5}}
                        iconLeft='lock'
                        value={pass}
                        label={t("Login.password")}
                        password
                        showPassword
                        onChange={setPass}
                        error={errorpassword}
                        />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'space-between',  flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => setVisibleRestore(true)}>
                        <Text style={{fontSize: 14, color: COLORS.PRIMARY, textDecorationLine: 'underline'}}>{t("Common.forgotPassword")}</Text>
                    </TouchableOpacity>
                    <ButtonMyIntelli 
                        icon={'sign-in-alt'}
                        title={t("Login.signIn")}
                        loading={loading}
                        disabled={loading}
                        onPress={sendLogin}
                        style={{backgroundColor: 'white'}}
                        />
                </View>
            </View>

            <View style={{alignItems: 'center', padding: 16}}>
                <Text>{t("Common.copyright")}</Text>
            </View>

            <ModalRestorePassword
                onHideModal={() => setVisibleRestore(false)}
                visible={visibleRestore}
                email={email}
                setEmail={setEmail}
                />
            <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true}/>
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: wp(55),
        height: wp(55),
        resizeMode: "contain",
        marginTop: -100
    },
});

const mapDispatchToProps = dispatch => ({
    authLogin: (value) => 
        dispatch(actions.myintelliapi.authLogin(value)),
});

export default connect(null, mapDispatchToProps)(Login);
