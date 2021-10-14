import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, DefaultTheme } from 'react-native-paper';

import { COLORS } from '../../settings/theme';
import IconMyIntelli from './IconMyIntelli';


const InputField = (props) => {
  const [visible, setVisible] = useState(false);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
      primary: COLORS.BUTTON_PRIMARY,
      accent: COLORS.PRIMARY,
    },
  };

  const color = (props.disabled ? COLORS.DISABLED : (props.error ? COLORS.TEXT_DANGER : COLORS.TEXT_BLACK));

  const IconsRight = () => {
    if(props.iconRight && !props.multiline)
      return <TextInput.Icon 
                name={() => <IconMyIntelli icon={props.iconRight} size={18} color={color}  />} 
                onPress={!props.disabled && props.iconRightPress ? props.iconRightPress : undefined}
                style={{marginTop: 13}} 
                disabled={props.disabled}
                />
    else if(props.password && props.showPassword)
      return <TextInput.Icon 
                name={() => <IconMyIntelli icon={(visible ? 'eye-slash' : 'eye')} size={18} color={color} />} 
                onPress={() => setVisible(!visible)} style={{marginTop: 13}} 
                />
    else
      return null
  }
  const IconsLeft = () => {
    if(props.iconLeft)
      return <TextInput.Icon 
                name={() => <IconMyIntelli icon={props.iconLeft} size={18} color={color} />} 
                style={{marginTop: 13}} 
                />
    else
      return null
  }


  return (
    <View style={props.style}>
      <View style={ styles.container }>
          <TextInput
            ref={props.innerRef}
            {...props}
            mode={'outlined'}
            onChangeText={props.onChange}
            placeholderTextColor={COLORS.TEXT_SEMIBLACK}
            style={[
              styles.textInput,
              { color: props.editable === false ? '#bdc3c7' : null },
            ]}
            underlineColor={'transparent'}
            underlineColorAndroid={'transparent'}
            value={props.value}
            autoFocus={false}
            autoCapitalize="none"
            theme={theme}
            left={IconsLeft()}
            right={IconsRight()}
            secureTextEntry={props.password ? !visible : false}
            style={{width: '100%',  height: (props.numberOfLines ? undefined : 40), maxHeight: (props.numberOfLines ? undefined : undefined)}}
          />
      </View>
      {props.error ? (
        <Text
          style={[styles.errorText, props.icon ? { marginLeft: 40 } : null]}>
          {props.error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  iconView: {
    top: '35%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    zIndex: 1
  },
  textInput: {
    // ...Fonts.fontRegular,
    fontSize: 14,
    backgroundColor: 'white'
  },
  iconRightView:{
    top: '40%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    backgroundColor: 'white'
  },
  errorText: {
    // ...Fonts.fontSemiBold,
    color: '#e74c3c',
    marginTop: 0,
    marginBottom: 3,
    fontSize: 13,
  },
});

export default InputField
