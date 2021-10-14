import React from 'react';
import { VirtualizedList, View } from 'react-native';
import { Button, Dialog, Portal, RadioButton } from "react-native-paper";
import { useTranslation } from "react-i18next";

const ModalRadioList = ({title, items, visible, onHideModal, onValueChange, value, buttonClose = false }) => {
    
    const { t } = useTranslation();

    const getItem = (data, index) => {
        return {
            id: data[index].id.toString(),
            title: data[index].value,
            value: data[index].id,
        };
    };
    
    const ListLanguage = () => {
        return (
            <VirtualizedList
                data={items}
                initialNumToRender={4}
                renderItem={({ item }) => (
                    <RadioButton.Item label={item.title} value={item.value} />
                )}
                getItemCount={() => items.length}
                keyExtractor={(item) => item.id}
                getItem={getItem}
                />
        );
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onHideModal}>
                <Dialog.Title>{title}</Dialog.Title>
                <View style={{paddingHorizontal: 10, paddingBottom: (buttonClose ? 0 : 16), overflow: 'hidden'}}>
                    <RadioButton.Group
                        onValueChange={onValueChange}
                        value={value}
                    >
                        <ListLanguage />
                    </RadioButton.Group>
                </View>
                {(buttonClose) && (
                    <Dialog.Actions>
                        <Button onPress={onHideModal}>{t("Common.close")}</Button>
                    </Dialog.Actions>
                )}
            </Dialog>
        </Portal>
    )
}

export default ModalRadioList;
