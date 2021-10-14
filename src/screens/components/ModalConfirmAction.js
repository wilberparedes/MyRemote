import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal} from "react-native-paper";
import { useTranslation } from "react-i18next";
import { ButtonMyIntelli } from '.';

const ModalConfirmAction = ({visible, title, message, onAccept, onHideModal }) => {

    const { t } = useTranslation();

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onHideModal}>
                <Dialog.Title>{title}</Dialog.Title>
                {(message) && (
                    <View style={{paddingHorizontal: 22, overflow: 'hidden'}}>
                        <Text style={{fontSize: 16}}>{message}</Text>
                    </View>
                )}
                <Dialog.Actions>
                    <ButtonMyIntelli
                        style={{ marginTop: 8, marginRight: 8}}
                        title={t("Common.yes")}
                        onPress={() => { onAccept(); onHideModal();} }
                        />
                    <ButtonMyIntelli
                        style={{ marginTop: 8}}
                        title={t("Common.no")}
                        onPress={onHideModal}
                        />
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default ModalConfirmAction;
