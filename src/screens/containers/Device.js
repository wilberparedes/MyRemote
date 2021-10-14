import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  getModel,
  getSystemName,
  getSystemVersion,
  getUniqueId,
} from 'react-native-device-info';

import {
  BasePageChildren,
  ListItemTextMyIntelli,
} from '../components';

const Device = ({navigation}) => {
  const {t} = useTranslation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Back();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  const Back = () => {
    navigation.goBack();
  };

  return (
    <BasePageChildren
      title={t(`Common.device`)}
      navigation={navigation}
      paddingNone>
      <ListItemTextMyIntelli
        title={t(`Device.device`)}
        description={getModel()}
      />
      <ListItemTextMyIntelli
        title={t(`Device.os`)}
        description={`${getSystemName()} ${getSystemVersion()}`}
      />
      <ListItemTextMyIntelli
        title={t(`Device.key`)}
        description={getUniqueId()}
      />
    </BasePageChildren>
  );
};

export default Device;
