import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {COLORS} from '../../settings/theme';
import {connect} from 'react-redux';
import {
  IconMyIntelli,
  ListItemMyIntelli,
  ItemText,
  TimeFormat,
  DateFormat,
  AvatarMyIntelli,
} from './';

const Card = ({
  onPress,
  timelog,
  photo,
  location,
  access_type_timelog,
  config,
}) => {
  const {t} = useTranslation();
  const bgColor = COLORS.BORDER;

  const Photo = ({url}) => (
    <View
      style={{
        backgroundColor: bgColor,
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      <AvatarMyIntelli url={url} size={45} />
    </View>
  );
  return (
    <ListItemMyIntelli
      left={
        <Photo
          url={
            photo
              ? photo.includes('client')
                ? `${config.url}/file/${photo}`
                : photo
              : null
          }
        />
      }
      onPress={onPress}
      ph={16}>
      <View>
        <ItemText
          title={`${t(`General.date`)}:`}
          description={<DateFormat>{timelog}</DateFormat>}
        />
        <ItemText
          title={`${t(`General.hour`)}:`}
          description={<TimeFormat>{timelog}</TimeFormat>}
          Extra={
            <IconMyIntelli
              icon={access_type_timelog == 1 ? 'sign-in-alt' : 'sign-out-alt'}
              size={18}
              color={access_type_timelog == 1 ? COLORS.IN : COLORS.OUT}
            />
          }
        />
        <ItemText
          title={`${t(`DetailTimelog.localization`)}:`}
          description={location}
        />
      </View>
    </ListItemMyIntelli>
  );
};

const mapStateToProps = ({config}) => {
  return {
    config,
  };
};
export default connect(mapStateToProps)(Card);
