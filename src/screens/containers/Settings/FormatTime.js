import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { formatTimes } from '../../../settings/utils';
import { BasePageChildren, IconButtonMyIntelli, RadioButtonGroup } from '../../components';
import { actions } from '../../../store';
import { BackHandler } from 'react-native';

const FormatTime = ({ config, navigation, configChangeValues }) => {

  const { timeFormat } = config;
  const { t } = useTranslation();
  const [format, setFormat] = useState(timeFormat);

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

  const changeValue = () => {
    var newConfig = {
      ...config,
      timeFormat: format,
    }
    configChangeValues(newConfig);
  }

  return (
    <BasePageChildren
      title={t('Common.formatHour')}
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
        items={formatTimes}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormatTime);
