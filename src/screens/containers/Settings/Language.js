import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

import { BasePageChildren, IconButtonMyIntelli, RadioButtonGroup } from '../../components';
import { languages } from '../../../settings/utils';
import { actions } from '../../../store';

const Language = ({ navigation, config, configChangeValues }) => {

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

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
    configChangeValues
    var newConfig = {
      ...config,
      language: language,
    }
    i18n.changeLanguage(language);
    configChangeValues(newConfig);
  }

  return (
    <BasePageChildren
      title={t('Common.languageTitle')}
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
        onValueChange={value => setLanguage(value)}
        value={language}
        items={languages}
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

export default connect(mapStateToProps, mapDispatchToProps)(Language);
