import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {BackHandler, View} from 'react-native';

import {itemsTimeZoneFormat, capitalize} from '../../../settings/utils';
import {
  BasePageChildren,
  IconButtonMyIntelli,
  InputField,
  RadioButtonGroup,
} from '../../components';
import {actions} from '../../../store';
import {useSearch} from '../../../hooks/useSearch';

const FormatTimeZone = ({config, navigation, configChangeValues}) => {
  const {timeZones} = config;
  const {t} = useTranslation();
  const [setSearch, items] = useSearch({items: itemsTimeZoneFormat});
  const [searching, setSearching] = useState('');
  const [format, setFormat] = useState(timeZones);

  useEffect(() => {
    setSearch(searching);
  }, [searching]);

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

  const changeValue = () => {
    var newConfig = {
      ...config,
      timeZones: format,
    };
    configChangeValues(newConfig);
  };
  return (
    <BasePageChildren
      title={t('Common.timeZone')}
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
      paddingNone>
      <View style={{paddingTop: 10, paddingHorizontal: 16}}>
        <InputField
          iconLeft={'search'}
          label={t(`General.search`)}
          value={searching}
          onChange={setSearching}
          iconRight={searching.length > 1 ? 'times' : null}
          iconRightPress={() =>
            searching.length > 1 ? setSearching('') : null
          }
        />
      </View>
      <RadioButtonGroup
        onValueChange={setFormat}
        value={format}
        items={items.map(i => {
          const auxTimezone = i.value.split(') ')[1];
          const auxTimezoneUTC = i.value.split(') ')[0];
          const timeZoneCapitalize = capitalize(auxTimezone.toLowerCase());
          return {
            ...i,
            value: `${auxTimezoneUTC}) ${timeZoneCapitalize}`,
          };
        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormatTimeZone);
