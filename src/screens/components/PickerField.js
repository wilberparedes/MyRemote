import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import {
    Dialog,
    Portal,
    Button,
    List 
} from "react-native-paper";
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { InputField } from ".";
import { COLORS } from "../../settings/theme";
import { filterItemSync } from "../../settings/utils";


const PickerField = ({ label, value, items, onValueChange, isMulti = false, error, disabled = false }) => {

    const { t } = useTranslation();
    
    const [show, setShow] = useState(false);
    const [localItems, setLocalItems] = useState([]);
    const [itemSelected, setItemSelected] = useState(value);
    const [itemSelectedMulti, setItemSelectedMulti] = useState(value);
    const [search, setSearch] = useState('');
    const [aa, setaa] = useState(false);

    const _showPicker = () => setShow(true);
    const _hidePicker = () => setShow(false);

    useEffect(() => {
        setTimeout(() => {
            let result;
            if(search.length >= 1)
                result = filterItemSync(search, items);
            else result = items
            setLocalItems(result);
        }, 300);
    }, [search, items])

    useEffect(() => {
        setLocalItems(items)
        setaa(false)
    }, [aa])

    const _handlePicker = (selected) => {
        if(isMulti){
            let ism = [...itemSelectedMulti]
            const iof = ism.indexOf(selected);
            if(iof == -1){
                ism.push(selected);
            }else{
                ism.splice(iof, 1);
            }
            setaa(true)
            setItemSelectedMulti(ism);
        }else{
            _hidePicker();
            onValueChange(selected);
            setItemSelected(selected);
        }
        setTimeout(() => {
            setSearch('');
            setLocalItems(items);
        }, 500);
    };

    const _saveMultipleItemSelected = () => {
        _hidePicker();
        onValueChange(itemSelectedMulti);
    }

    return (
        <TouchableOpacity onPress={() => !disabled && _showPicker()}>

            <InputField 
                iconRight={"chevron-down"}
                label={label}
                value={ value && !isMulti && items.length ? items.filter((d) => d.value == value)[0].label : ( isMulti ? `Items Selected ${value.length}` : null ) }
                editable={false}
                iconRightPress={() => !disabled && _showPicker()}
                error={error}
                disabled={disabled}
                />

            <Portal>
                <Dialog
                    visible={show}
                    onDismiss={() => _hidePicker()}
                    style={{overflow: 'hidden'  }}
                    // , minHeight: (items.length > 10 ? hp(50) : undefined)
                    >
                    <View style={{paddingHorizontal: 10, paddingTop: 5, paddingBottom: 0, overflow: 'hidden'}}>
                        {items.length > 5 && (
                            <InputField 
                                iconLeft={"search"}
                                label={t(`General.search`)}
                                value={search}
                                onChange={(value) => setSearch(value)}
                                />
                        )}
                        <ScrollView style={{maxHeight: hp(50)}}>
                            {localItems && localItems.length > 0 ?
                            (
                                localItems.map((d, i) => (
                                    <List.Item
                                        key={d.value}
                                        title={(i + 1) + ". " + d.label}
                                        onPress={() => _handlePicker(d.value)}
                                        right={props => ((itemSelected && itemSelected == d.value && !isMulti) || (isMulti && itemSelectedMulti.indexOf(d.value) != -1) ? <List.Icon {...props} icon="check-circle" color={COLORS.PRIMARY} /> : null)}
                                    />
                                ))
                            ) : (
                                <List.Item
                                    title={t("General.notResult")}
                                    titleStyle={{textAlign: 'center'}}
                                />
                            )}
                        </ScrollView>
                    </View>
                            
                    <Dialog.Actions>
                        {isMulti && (
                            <Button
                                onPress={_saveMultipleItemSelected}
                                >
                                {t(`General.save`)}
                            </Button>
                        )}
                        {isMulti && (
                            <Button onPress={_hidePicker}>{t("General.close")}</Button>
                        )}
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </TouchableOpacity>
    );
}


const mapStateToProps = ({ config }) => {
    return {
        dateFormat: config.dateFormat,
    };
};

export default connect(mapStateToProps)(PickerField);