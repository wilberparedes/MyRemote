import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { formatTemperature } from '../../../settings/utils';
import { BasePageChildren, IconButtonMyIntelli, RadioButtonGroup } from '../../components';
import { actions } from '../../../store';
import { BackHandler } from 'react-native';

const FormatTemperature = ({ config, navigation, configChangeValues }) => {

  const { temperatureFormat } = config;
  const { t } = useTranslation();
  const [format, setFormat] = useState(temperatureFormat);

  const changeValue = () => {
    var newConfig = {
      ...config,
      temperatureFormat: format,
    }
    configChangeValues(newConfig);
  }

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
      title={t('Common.formatTemperature')}
      navigation={navigation}
      Right={
        <IconButtonMyIntelli
          onPress={async () => {
            await changeValue();
            navigation.goBack();
          }}
          color={'white'}
          icon={'check'}
          />
      }
      paddingNone
      >
      <RadioButtonGroup
        onValueChange={value => setFormat(value)}
        value={format}
        items={formatTemperature}
        />
    </BasePageChildren>
  );
};

const mapStateToProps = ({ config }) => {
  return {
    config
  };
};

const mapDispatchToProps = dispatch => ({
  configChangeValues: (value) => 
    dispatch(actions.myintelliapi.configChangeValues(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormatTemperature);
