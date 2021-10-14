import React, { useState } from 'react';
import { VirtualizedList, View } from 'react-native';
import { Button, Dialog, Portal, RadioButton } from "react-native-paper";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { languajes } from "../../settings/utils";

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
            data={languajes}
            initialNumToRender={4}
            renderItem={({ item }) => (
                <RadioButton.Item label={item.title} value={item.value} />
            )}
            getItemCount={() => languajes.length}
            keyExtractor={(item) => item.id}
            getItem={getItem}
            />
    );
};

const ModalLanguage = (props) => {
    const { t } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);


    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onHideModal}>
                <Dialog.Title>{t("Common.languageTitle")}</Dialog.Title>
                <View style={{paddingHorizontal: 10, paddingTop: 5, paddingBottom: 0, overflow: 'hidden'}}>
                    <RadioButton.Group
                        onValueChange={(value) => {
                            setLanguage(value);
                            i18n.changeLanguage(value);
                        }}
                        value={language}
                    >
                        <ListLanguage />
                    </RadioButton.Group>
                </View>
                <Dialog.Actions>
                    <Button onPress={props.onHideModal}>{t("Common.close")}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default ModalLanguage;
