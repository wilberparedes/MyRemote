import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BackHandler } from 'react-native';

import { itemsLengthFormat } from '../../../settings/utils';
import { BasePageChildren, IconButtonMyIntelli, RadioButtonGroup } from '../../components';
import { actions } from '../../../store';

const FormatLength = ({ config, navigation, configChangeValues }) => {

  const { lengthFormat } = config;
  const { t } = useTranslation();
  const [format, setFormat] = useState(lengthFormat);

  const lengthItems = itemsLengthFormat.map((i) => {
    return { id: i.value, value: t(i.label)};
  });

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
      lengthFormat: format,
    }
    configChangeValues(newConfig);
  }

  return (
    <BasePageChildren
      title={t('Common.formatLength')}
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
        items={lengthItems}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormatLength);
