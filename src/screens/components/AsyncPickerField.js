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


const AsyncPickerField = ({ label, value, items, onValueChange, isMulti = false, defaultOptions = true }) => {

    const { t } = useTranslation();
    
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false);
    const [localItems, setLocalItems] = useState([]);
    const [itemSelected, setItemSelected] = useState(value);
    const [itemSelectedMulti, setItemSelectedMulti] = useState(value);
    const [search, setSearch] = useState('');

    const _showPicker = () => setShow(true);
    const _hidePicker = () => setShow(false);

    useEffect(() => {
        itemsDefault();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if(search.length >= 1){
                setLoading(true)
                items(search, function(r){
                    setLocalItems(r)
                    setLoading(false)
                })
            }
        }, 300);
    }, [search])

    const itemsDefault = () => {
        setLoading(true);
        if(defaultOptions){
            items('', function(r){
                setLocalItems(r);
                setLoading(false);
            })
        }else {
            setLoading(false);
            setLocalItems([])
        }
    }
    
    const _handlePicker = (selected) => {
        const item = [...localItems];
        if(isMulti){
            let ism = [...itemSelectedMulti]
            const iof = ism.indexOf(item[selected].value);
            if(iof == -1){
                ism.push(item[selected].value);
            }else{
                ism.splice(iof, 1);
            }
            setItemSelectedMulti(ism);
        }else{
            onValueChange(item[selected]);
            setItemSelected( item[selected]);
            _hidePicker();
        }
    };

    const _saveMultipleItemSelected = () => {
        _hidePicker();
        if(search.length > 0){
            setTimeout(() => {
                setSearch('');
                itemsDefault();
            }, 500);
        }
        onValueChange(itemSelectedMulti);
    }

    return (
        <TouchableOpacity onPress={() => _showPicker()}>

            <InputField 
                iconRight={"chevron-down"}
                label={label}
                value={ value && !isMulti ? value.label : ( isMulti ? `Items Selected ${value.length}` : null ) }
                editable={false}
                iconRightPress={() => _showPicker()}
                />

            <Portal>
                <Dialog
                    visible={show}
                    onDismiss={() => _hidePicker()}
                    style={{overflow: 'hidden'  }}
                    // , minHeight: (items.length > 10 ? hp(50) : undefined)
                    >
                    <View style={{paddingHorizontal: 10, paddingTop: 5, paddingBottom: 0, overflow: 'hidden'}}>
                        <InputField 
                            iconLeft={"search"}
                            label={t(`General.search`)}
                            value={search}
                            onChange={(value) => setSearch(value)}
                            />
                        <ScrollView style={{maxHeight: hp(50)}}>
                            {loading ?
                            (
                                <List.Item
                                    title={t("General.loading")}
                                    titleStyle={{textAlign: 'center'}}
                                />
                            ) : (
                                localItems && localItems.length > 0 ?
                                (
                                    localItems.map((d, i) => (
                                        <List.Item
                                        key={d.value}
                                        title={(i + 1) + ". " + d.label}
                                        onPress={() => _handlePicker(i)}
                                        right={props => ((itemSelected && itemSelected.value == d.value && !isMulti) || (isMulti && itemSelectedMulti.indexOf(d.value) != -1) ? <List.Icon {...props} icon="check-circle" color={COLORS.PRIMARY} /> : null)}
                                        />
                                        ))
                                ) : (
                                    <List.Item
                                        title={t("General.notResult")}
                                        titleStyle={{textAlign: 'center'}}
                                    />
                                )
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

export default connect(mapStateToProps)(AsyncPickerField);