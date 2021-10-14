import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {isValidURL, itemsServerUrl} from '../../../settings/utils';
import {
  BasePageChildren,
  IconButtonMyIntelli,
  RadioButtonGroup,
} from '../../components';
import {actions} from '../../../store';
import {BackHandler} from 'react-native';

const ServerUrl = ({config, navigation, configChangeValues}) => {
  const {url} = config;
  const {t} = useTranslation();
  const [format, setFormat] = useState(url);
  const [othervalue, setOthervalue] = useState('https://');
  const [errorothervalue, setErrorothervalue] = useState('');

  const DataItems = itemsServerUrl.map(i => {
    return {...i, value: t(`${i.value}`)};
  });

  useEffect(() => {
    if (!DataItems.find(i => i.id == format)) {
      setFormat('other');
      setOthervalue(url);
    }
  }, [format]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Back();
        return true;
      },
    );

    if (!itemsServerUrl.find(d => d.id == 'other')) {
      itemsServerUrl.push({id: 'other', value: t('Common.other')});
    }
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (errorothervalue) setErrorothervalue(!errorothervalue);
  }, [othervalue]);

  const Back = () => {
    navigation.goBack();
  };
  const changeValue = () => {
    if (format == 'other') {
      // if (isValidURL(othervalue)) {
      var newConfig = {
        ...config,
        url: othervalue.toLowerCase(),
      };
      configChangeValues(newConfig);
      navigation.goBack();
      // } else {
      // setErrorothervalue(t(`FormErrors.if126`));
      // }
    } else {
      var newConfig = {
        ...config,
        url: format,
      };
      configChangeValues(newConfig);
      navigation.goBack();
    }
  };
  return (
    <BasePageChildren
      title={t('Common.serverInput')}
      navigation={navigation}
      Right={
        <IconButtonMyIntelli
          onPress={() => changeValue()}
          color={'white'}
          icon={'check'}
        />
      }
      paddingNone>
      <RadioButtonGroup
        onValueChange={value => setFormat(value)}
        value={format}
        items={DataItems}
        other
        othervalue={othervalue}
        setOthervalue={setOthervalue}
        errorothervalue={errorothervalue}
      />
    </BasePageChildren>
  );
};

const mapStateToProps = ({config}) => {
  return {
    config,
  };
};

const mapDispatchToProps = dispatch => ({
  configChangeValues: value =>
    dispatch(actions.myintelliapi.configChangeValues(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerUrl);
