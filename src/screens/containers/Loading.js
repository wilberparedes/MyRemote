import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { LoadingComponent } from '../components';
import { useFocusEffect } from '@react-navigation/native';


const Loading = ({navigation, Token}) => {

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if(Token) navigation.navigate('App')
            else navigation.navigate('Login')
        });
        return unsubscribe;
    }, [Token, navigation]);

    return(
        <LoadingComponent />
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        Token: auth.token,
    };
};
export default connect( mapStateToProps )(Loading);