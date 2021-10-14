import React from 'react';
import { Image } from 'react-native';
import IconNormal from 'react-native-vector-icons/FontAwesome5';
import Icon from "react-native-fontawesome-pro";
import { COLORS } from '../../settings/theme';
import { getIcons } from '../../settings/utils';

export default function IconMyIntelli({icon, size, active = false, color = COLORS.TEXT_BLACK, style, type = "light" }) {
  if(type == 'intelli'){
    return (
      <Image
        resizeMode={'contain'}
        fadeDuration={0}
        source={getIcons((active ? `${icon}_active` : icon))}
        style={{ ...style, width: size + 2, height: size + 2 }}
        />
    );
  }

  if(type == 'normal'){
    return (
      <IconNormal
        name={icon}
        size={size}
        color={color}
        style={{...style}}
        />
    );
  }

  return (
    <Icon
      name={icon}
      size={size}
      color={color}
      style={{...style}}
      type={ type ? type : "light" }
      />
  );
}