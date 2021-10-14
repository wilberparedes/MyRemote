import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HomeApp, Settings, Permissions, Turn, Times, TypePerson} from '../';
import {IconMyIntelli} from '../components';
import {COLORS} from '../../settings/theme';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

const HomeTabs = ({user: User}) => {
  const {t} = useTranslation();

  const Item = ({icon, color, size, label, type = undefined, focused}) => (
    <View style={{alignItems: 'center', marginTop: 4}}>
      <IconMyIntelli
        icon={icon}
        type={type}
        active={focused}
        color={color}
        size={size}
      />
      <Text style={{color, fontSize: 12}}>{label}</Text>
    </View>
  );

  const Tab = createBottomTabNavigator();

  if (!User) {
    return null;
  }
  const Disabled = !User.person.idEntityActive;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const color = Disabled ? 'gray' : focused ? COLORS.PRIMARY : 'black';
          const size = 25;
          if (route.name == 'Home') {
            return (
              <Item
                icon={'home-alt'}
                label={t(`Menu.dashboard`)}
                color={color}
                size={size}
              />
            );
          } else if (route.name == 'Times') {
            return (
              <Item
                icon={'faceid'}
                type={'intelli'}
                focused={focused}
                label={t(`Menu.times`)}
                color={color}
                size={size}
              />
            );
          } else if (route.name == 'Horarios') {
            return (
              <Item
                icon={'calendar-alt'}
                label={t(`Menu.shifts`)}
                color={color}
                size={size}
              />
            );
          } else if (route.name == 'Permisos') {
            return (
              <Item
                icon={'address-card'}
                label={t(`Menu.permits`)}
                color={color}
                size={size}
              />
            );
          } else if (route.name == 'Ajustes') {
            return (
              <Item
                icon={'cog'}
                label={t(`Menu.Setting`)}
                color={color}
                size={size}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#FAFAFA',
        },
      }}>
      <Tab.Screen name="Home" component={Disabled ? TypePerson : HomeApp} />
      {!Disabled && (
        <>
          <Tab.Screen name="Times" component={Times} />
          <Tab.Screen name="Horarios" component={Turn} />
          <Tab.Screen name="Permisos" component={Permissions} />
          <Tab.Screen name="Ajustes" component={Settings} />
        </>
      )}
    </Tab.Navigator>
  );
};

const mapStateToProps = ({auth}) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(HomeTabs);
