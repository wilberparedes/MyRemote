import React, { useEffect, useState } from 'react';
import {
  VirtualizedList,
  StatusBar,
  View,
  BackHandler
} from 'react-native';
import {Divider} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {uid} from 'uid';
import { HeaderTabs, ListItem } from '../../components';
import { ModalConfirmAction } from '../../components';
import { actions } from '../../../store';
import { connect } from 'react-redux';

const getItem = (data, i) => {
  return {
    ...data[i],
  };
};

const getItemCount = data => data.length;

const Settings = ({ authLogout, navigation }) => {
  const {t} = useTranslation();
  const [ModalLogout, setModalLogout] = useState(false);

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

  const DATA = [
    {
      id: uid(),
      title: 'Common.user',
      icon: 'user-alt',
      onPress: () => navigation.push('User')
    },
    {
      id: uid(),
      title: 'Common.languageTitle',
      icon: 'globe',
      onPress: () => navigation.push('Language')
    },
    {
      id: uid(),
      title: 'Common.support',
      icon: 'user-headset',
      onPress: () => navigation.push('TechnicalSupport')
    },
    // {
    //   id: uid(),
    //   title: 'Common.server',
    //   icon: 'server',
    //   onPress: () => navigation.push('ServerUrl')
    // },
    {
      id: uid(),
      title: 'Common.device',
      icon: 'mobile-alt',
      onPress: () => navigation.push('Device')
    },
    {
      id: uid(),
      title: 'Common.formatDate',
      icon: 'calendar',
      onPress: () => navigation.push('FormatDate')
    },
    {
      id: uid(),
      title: 'Common.formatHour',
      icon: 'watch',
      onPress: () => navigation.push('FormatTime')
    },
    {
      id: uid(),
      title: 'Common.formatNumber',
      icon: 'hashtag',
      onPress: () => navigation.push('FomatNumber')
    },
    {
      id: uid(),
      title: 'Common.formatLength',
      icon: 'ruler-vertical',
      onPress: () => navigation.push('FormatLength')
    },
    // {
    //   id: uid(),
    //   title: 'Common.formatTemperature',
    //   icon: 'thermometer-three-quarters',
    //   onPress: () => navigation.push('FormatTemperature')
    // },
    {
      id: uid(),
      title: 'Common.timeZone',
      icon: 'clock',
      onPress: () => navigation.push('FormatTimeZone')
    },
    // {
    //   id: uid(),
    //   title: 'Common.restorePassword',
    //   icon: 'unlock',
    //   onPress: () => navigation.push('ChangePassword')
    // },
    {
      id: uid(),
      title: 'Common.about',
      icon: 'info-circle',
      onPress: () => navigation.push('About')
    },
    {
      id: uid(),
      title: 'Common.logout',
      icon: 'sign-out',
      onPress: () => setModalLogout(true)
    },
  ];

  return (
    
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderTabs
        title={t('Common.settings')}
        navigation={navigation}
        />
      <VirtualizedList
        data={DATA}
        initialNumToRender={11}
        renderItem={({item}) => (
          <ListItem title={t(item.title)} icon={item.icon} key={item.id} onPress={item.onPress} />
        )}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
        ItemSeparatorComponent={() => <Divider />}
      />

      <ModalConfirmAction
        title={t(`Common.logOut`)}
        message={t(`Common.sureLogOut`)}
        visible={ModalLogout}
        onHideModal={() => setModalLogout(false)}
        onAccept={() => authLogout()}
        />
      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true}/>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  authLogout: () => 
    dispatch(actions.myintelliapi.authLogout()),
});

export default connect(null, mapDispatchToProps)(Settings);
