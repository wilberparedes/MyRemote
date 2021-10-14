import React from 'react';
import { VirtualizedList, View, Text } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { InputField } from '.';

const getItem = (data, index) => {
    return {
        id: index.toString(),
        title: data[index].value,
        value: data[index].id,
    };
};


const RadioButtonGroup = ({ onValueChange, value, items, other = false, othervalue = null, setOthervalue = null, errorothervalue = null}) => {

    const { t } = useTranslation();
    
    return (
        <RadioButton.Group
            onValueChange={onValueChange}
            value={value}>
            <VirtualizedList
                data={items}
                initialNumToRender={4}
                renderItem={({item}) => (
                    <RadioButton.Item label={item.title} value={item.value} />
                )}
                getItemCount={() => items.length}
                keyExtractor={item => item.id}
                getItem={getItem}
                ItemSeparatorComponent={() => <Divider />}
                ListEmptyComponent={<View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 8}}><Text style={{fontSize: 18}}>{t(`General.notResult`)}</Text></View>}
            />
            {(other && value == 'other') && (
                <InputField
                    style={{marginHorizontal: 16}}
                    value={othervalue}
                    label={t("Common.urlserver")}
                    keyboardType={"url"}
                    onChange={setOthervalue}
                    error={errorothervalue}
                    />
            )}
        </RadioButton.Group>
    )
}

export default RadioButtonGroup
