import React, {useEffect, useState} from 'react';
import {Dialog, Text, Portal, Divider} from 'react-native-paper';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ButtonMyIntelli, IconMyIntelli} from '.';
import {COLORS} from '../../settings/theme';

const ModalResponse = ({
  message,
  type,
  view,
  onHideModal = () => {
    // console.info('OnHideModal');
  },
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(view);
  }, [view]);
  const {t} = useTranslation();
  const getIcon = () => {
    let icon = 'exclamation-triangle';
    switch (type) {
      case 'success':
        icon = 'check-circle';
        break;
      case 'error':
        icon = 'exclamation-circle';
        break;
    }
    return icon;
  };
  const getColor = () => {
    let color = COLORS.DANGER;
    switch (type) {
      case 'success':
        color = COLORS.SUCCESS;
        break;
      case 'error':
        color = COLORS.ERROR;
        break;
    }
    return color;
  };
  const getTitle = () => {
    let title = 'warning';
    switch (type) {
      case 'success':
        title = 'successTitle';
        break;
      case 'error':
        title = 'errorTitle';
        break;
    }
    return title;
  };
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => {
          setVisible(false);
          onHideModal();
        }}>
        <Dialog.Title>
          <>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <IconMyIntelli icon={getIcon()} size={25} color={getColor()} />
              <Text style={{marginLeft: 10, fontSize: 16}}>
                {t(`Common.${getTitle()}`)}
              </Text>
            </View>
          </>
        </Dialog.Title>
        <Dialog.Content style={{alignItems: 'center'}}>
          <View>
            <Text>{t(message)}</Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <ButtonMyIntelli
            style={{marginTop: 2, marginBottom: 4, marginRight: 14}}
            title={t('General.done')}
            onPress={() => {
              setVisible(false);
              onHideModal();
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ModalResponse;
