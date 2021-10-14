import moment from "moment";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, ScrollView, BackHandler, Text } from 'react-native';
import { ActivityIndicator, Chip } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import { alertOK, handleOpenLink, invalidDateIn } from '../../settings/utils';
import { actions } from '../../store';
import { BasePageChildren, ButtonMyIntelli, DatePicker, IconButtonMyIntelli, InputField, ModalConfirmAction, PickerField, TimePicker } from '../components';
import DocumentPicker from 'react-native-document-picker';
import { requestReadStoragePermission } from '../../settings/utils';
import { COLORS } from "../../settings/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

let vrefresh = false;
const ManagePermission = ({ navigation, route, config, permissionsInsert, permissionsUpdate, noveltyPermissionsFetch, permissionsDelete, refresh}) => {

    const { params } = route;
    const { Data } = params;
    const { t } = useTranslation();

    const disabled = (Data && (Number(Data.status_approval) != 4) ? true : false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [noveltyPermission, setNoveltyPermission] = useState([]);
    const [type, setType] = useState(Data && Data.id_novelty_permission);
    const type_novelty = (Data ? Data.novelty_permission.type_novelty_permission : (type && noveltyPermission.length > 0 ? noveltyPermission.find((d) => d.value == type).type : 0));
    const [dateIn, setDateIn] = useState(Data && Data.date_time_in.split(" ")[0]);
    const [hourIn, setHourIn] = useState(Data && Data.date_time_in.split(" ")[1]);
    const [dateOut, setDateOut] = useState(Data && Data.date_time_out.split(" ")[0]);
    const [hourOut, setHourOut] = useState(Data && Data.date_time_out.split(" ")[1]);
    const [description, setDescription] = useState(Data ? Data.description : '');
    const [files, setFiles] = useState(null);
    const [oldFiles, setOldFiles] = useState(Data ? Data.entity_permission_files : null);

    const [errorsForm, setErrorsForm] = useState({
        type: null,
        dateIn: null,
        hourIn: null,
        dateOut: null,
        hourOut: null
    })

    useEffect(() => {
        loadNoveltyPermissionsFetch();
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                Back();
                return true;
            }
        );
        return () => backHandler.remove();
    }, []);


    useEffect(() => {
        if(!vrefresh && refresh.permissionsFetch){
            vrefresh = true;
            Back();
        }
    }, [refresh.permissionsFetch]);

    const Back = () => {
        navigation.goBack();
    }

    const loadNoveltyPermissionsFetch = async () => {
        let where = Data ? `where[type_novelty_permission]=${type_novelty}` : '';
        const npf = await noveltyPermissionsFetch({
            where
        });
        let values = npf.map((i) => {
            let type =
              i.type_novelty_permission == 1
                ? t("Permission.type_parcial")
                : t("Permission.type_daily");
            let text = `${i.code} - ${
              i.novelty_permission
            } (${type.toUpperCase()})`;
            return {
                value: i.id_novelty_permission,
                label: text,
                type: i.type_novelty_permission,
            };
        });
        setNoveltyPermission(values);
    } 

    useEffect(() => {
        requestReadStoragePermission()
    }, [])

    useEffect(() => {
        if(errorsForm.type) setErrorsForm({...errorsForm, type: null});
    }, [type])
    useEffect(() => {
        if(errorsForm.dateIn) setErrorsForm({...errorsForm, dateIn: null});
    }, [dateIn])
    useEffect(() => {
        if(errorsForm.hourIn) setErrorsForm({...errorsForm, hourIn: null});
    }, [hourIn])
    useEffect(() => {
        if(errorsForm.dateOut) setErrorsForm({...errorsForm, dateOut: null});
    }, [dateOut])
    useEffect(() => {
        if(errorsForm.hourOut) setErrorsForm({...errorsForm, hourOut: null});
    }, [hourOut])

    const assignedPayload = () => {
        const state = {
            time_in: hourIn,
            time_out: hourOut,
            dayIn: dateIn,
            dayOut: dateOut,
            id_novelty_permission: type,
            files,
            description,
            old_files: oldFiles
        }

        let payload = JSON.parse(JSON.stringify(state));
    
        if (type_novelty === 2) {
            let dTi = moment(dateIn).hours(0).minutes(0).seconds(0);
            let dTo = moment(dateIn).hours(23).minutes(59).seconds(0);
            payload.date_time_in = dTi.format("YYYY-MM-DD HH:mm:ss");
            payload.date_time_out = dTo.format("YYYY-MM-DD HH:mm:ss");
            payload.time_in = dTi.format("HH:mm:ss");
            payload.time_out = dTo.format("HH:mm:ss");
            return returnFormData(payload);
        }
    
        let dTi = moment(dateIn)
            .hours(parseInt(hourIn.split(":")[0]))
            .minutes(parseInt(hourIn.split(":")[1]))
            .seconds(0);
    
        let dTo = moment(dateOut)
            .hours(parseInt(hourOut.split(":")[0]))
            .minutes(parseInt(hourOut.split(":")[1]))
            .seconds(0);
    
        if (dTi.diff(dTo, "m") > 0) dTo.add(1, "d");
    
        payload.date_time_in = dTi.format("YYYY-MM-DD HH:mm:ss");
        payload.date_time_out = dTo.format("YYYY-MM-DD HH:mm:ss");
        return returnFormData(payload);
    }

    const returnFormData = (payload) => {
        let dataState = new FormData();
        if (payload.files && payload.files.length > 0) {
            payload.files.forEach((file, index) => {
                dataState.append("files[]", file, file.name);
            });
        } else {
            dataState.append("files", null);
        }
        if (payload.old_files && payload.old_files.length > 0) {
            payload.old_files.forEach((file, index) => {
                dataState.append("old_files[]", file.entity_permission_file);
            });
        } else {
            dataState.append("old_files", null);
        }
        dataState.append("date_time_in", `${payload.date_time_in}`);
        dataState.append("date_time_out", `${payload.date_time_out}`);
        dataState.append("id_novelty_permission", payload.id_novelty_permission);
        dataState.append("description", payload.description);
        return dataState;
    }

    const validForm = () => {
        if(!type){
            setErrorsForm({
                ...errorsForm,
                type: t(`FormErrors.if111`)
            })
            return false;
        }
        else if(!dateIn){
            setErrorsForm({
                ...errorsForm,
                dateIn: t(`FormErrors.if111`)
            })
            return false;
        }
        else if(!hourIn){
            setErrorsForm({
                ...errorsForm,
                hourIn: t(`FormErrors.if111`)
            })
            return false;
        }
        else if(type == 1 && !dateOut){
            setErrorsForm({
                ...errorsForm,
                dateOut: t(`FormErrors.if111`)
            })
            return false;
        }
        else if(type == 1 && !hourOut){
            setErrorsForm({
                ...errorsForm,
                hourOut: t(`FormErrors.if111`)
            })
            return false;
        }
        else if (!verifyTimes()) return false;
        return true;
    }

    const verifyTimes = () => {
        let datetimeIn = `${dateIn} ${hourIn}`;
        let datetimeOut = `${dateOut} ${hourOut}`;
        const dateNow = moment().format("YYYY-MM-DD")
        const timeNow = moment().format("HH:mm:ss")

        if (!Data && dateIn < dateNow) {
            setErrorsForm({
                ...errorsForm,
                dateIn: invalidDateIn(2)
            })
            return false;
        }
        else if (!Data && type_novelty == 1 && dateIn == dateNow && hourIn < timeNow) {
            setErrorsForm({
                ...errorsForm,
                hourIn: invalidDateIn(2)
            })
            return false;
        }
        if (type_novelty == 1) {
            if(dateOut < dateIn){
                setErrorsForm({
                    ...errorsForm,
                    dateOut: invalidDateIn(1)
                })
                return false;
            }
            else if(dateOut == dateIn && hourOut < hourIn){
                setErrorsForm({
                    ...errorsForm,
                    hourOut: invalidDateIn(1)
                })
                return false;
            }
        }
        if(Data){
            const { date_time_in, date_time_out } = Data;
            if (datetimeIn < date_time_in || date_time_in > date_time_out) {
                setErrorsForm({
                    ...errorsForm,
                    dateIn: invalidDateIn(5),
                    hourIn: invalidDateIn(5)
                })
                return false;
            }
            if (
              datetimeOut > date_time_out
            ) {
                setErrorsForm({
                    ...errorsForm,
                    dateOut: invalidDateIn(5),
                    hourOut: invalidDateIn(5)
                })
                return false;
            }
        }
        return true;
    }

    const onSave = async () => {
        if(validForm()){
            setIsLoading(true);
            const response = await permissionsInsert(assignedPayload());
            if(response){
                resetForm();
                alertOK({title: t(`Common.successTitle`), message: t(`Common.savedSuccess`)})
            }
            setIsLoading(false);
        }
    }

    const onUpdate = async () => {
        if(validForm()){
            setIsLoading(true);
            const response = await permissionsUpdate(Data.id_entity_permission, assignedPayload());
            if(response){
                alertOK({title: t(`Common.successTitle`), message: t(`Common.uploadedRegister`)})
            }
            setIsLoading(false);
        }
    }

    const selectFiles = async () => {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
            });
            let newFiles = [];
            let err = '';
            for (const res of results) {
                if(res.size <= 20480000){
                    newFiles.push(res);
                }else{
                    err += `${res.name}: ${t(`General.fileSizeExceeded`)} \n`
                }
            }
            const f = (files ? files : []);
            setFiles([...f, ...newFiles]);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log(err)
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
        }
    }
   
    const deleteOldFile = (file) => {
        let nOld = oldFiles.filter((d, index) => index != file);
        setOldFiles((nOld.length > 0 ? nOld : null));
    }

    const deleteNewFile = (file) => {
        let nFiles = files.filter((i, index) => index != file);
        setFiles((nFiles.length > 0 ? nFiles : null))
    }

    const resetForm = () => {
        setType(Data && Data.id_novelty_permission);
        setDateIn(Data && Data.date_time_in);
        setHourIn(Data && Data.date_time_in);
        setDateOut(Data && Data.date_time_out);
        setHourOut(Data && Data.date_time_out);
        setDescription(Data ? Data.description : '');
        setFiles(null);
        setOldFiles(Data ? Data.entity_permission_files : null);
    }

    const deletePermission = async () => {
        setLoadingDelete(true);
        const resp = await permissionsDelete({idPermission: Data.id_entity_permission});
        if(resp){
            alertOK({title: t(`Common.successTitle`), message: t(`Common.deletedSuccess`)});
            // getDataFetch();
            navigation.goBack()
        }
        setLoadingDelete(false);
    }

    return (
        <BasePageChildren
            title={t(`Permission.${params.new ? 'new' : 'edit'}Permission`)}
            navigation={navigation}
            Right={
                <IconButtonMyIntelli
                    icon={'check'}
                    color={'white'}
                    onPress={(Data ? onUpdate: onSave)}
                    loading={isLoading}
                    />
            }
            paddingNone
            style={{justifyContent: 'space-between'}}
            >
            <View style={{padding: 16}}>
                <PickerField
                    label={`${t(`Permission.id_novelty_permission`)} *`}
                    value={type}
                    items={noveltyPermission}
                    onValueChange={setType}
                    error={errorsForm.type}
                    disabled={disabled}
                    />
                <View style={styles.flexRow}>
                    <DatePicker
                        label={`${t("Permission.date_time_in")} *`}
                        value={dateIn}
                        onDateChange={setDateIn}
                        iconRight='calendar'
                        style={(type_novelty == 1) ? styles.width50 : styles.width100}
                        error={errorsForm.dateIn}
                        disabled={disabled}
                        />
                    {(type_novelty == 1) && (
                        <TimePicker
                            label={`${t("Permission.time_in")} *`}
                            value={hourIn}
                            onDateChange={setHourIn}
                            iconRight='clock'
                            style={styles.width50}
                            error={errorsForm.hourIn}
                            disabled={disabled}
                            />
                    )}
                </View>
                {(type_novelty == 1) && (
                    <View style={styles.flexRow}>
                        <DatePicker
                            label={`${t("Permission.date_time_out")} *`}
                            value={dateOut}
                            onDateChange={setDateOut}
                            iconRight='calendar'
                            style={styles.width50}
                            error={errorsForm.dateOut}
                            disabled={disabled}
                            />
                        <TimePicker
                            label={`${t("Permission.time_out")} *`}
                            value={hourOut}
                            onDateChange={setHourOut}
                            iconRight='clock'
                            style={styles.width50}
                            error={errorsForm.hourOut}
                            disabled={disabled}
                            />
                    </View>
                )}
                <InputField
                    value={description}
                    multiline
                    numberOfLines={4}
                    label={t("Permission.description")}
                    onChange={setDescription}
                    disabled={disabled}
                    />
                <View style={styles.containerButton}>
                    <View style={{ alignItems: 'center' }}>
                        <ButtonMyIntelli
                            icon={'file-upload'}
                            title={'adjuntar archivos'}
                            onPress={selectFiles}
                            />
                    </View>
                    <ScrollView horizontal style={{ marginTop: 10 }}>
                        {oldFiles && oldFiles.map((item, key) => (
                            <Chip 
                                key={key}
                                onPress={() => handleOpenLink(`${config.url}/file/${item.entity_permission_file}`)}
                                onClose={() => deleteOldFile(key)}
                                style={{ marginRight: 8 }}
                                >
                                {item.entity_permission_file_name}
                            </Chip>
                        ))}
                        {files && files.map((item, key) => (
                            <Chip 
                                key={key}
                                onPress={() => handleOpenLink(item.uri)}
                                onClose={() => deleteNewFile(key)}
                                style={{ marginRight: 8 }}
                                >
                                {item.name ? item.name : item.entity_permission_file_name}
                            </Chip>
                        ))}
                    </ScrollView>
                    
                </View>
            </View>

            {(Data &&  Number(Data.status_approval) > 4) && (
                <TouchableOpacity
                    onPress={() => !isLoading && setConfirmDelete(true)}
                    style={{
                        flex: 0,
                        width: '100%',
                        backgroundColor: !isLoading ? COLORS.OUT : COLORS.DISABLED,
                        minHeight:50,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    {isLoading && <ActivityIndicator animating size={'small'} color={'white'} style={{marginRight: 10}}/>}
                    <Text style={{fontSize: 16, color: 'white'}}>{t(`Common.delete`)}</Text>
                </TouchableOpacity>
            )}

            <ModalConfirmAction
                title={t(`Common.titleConfirm`)}
                message={t(`Common.confirmDelete`)}
                visible={confirmDelete}
                onHideModal={() => setConfirmDelete(false)}
                onAccept={() => deletePermission()}
                />
            
        </BasePageChildren>
    )
}

const styles = StyleSheet.create({
    width100: {
        width: wp(100)-32
    },
    width50: {
        width: wp(50)-21
    },
    flexRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    containerButton:{
        marginTop: 6
    }
})

const mapStateToProps = ({ config, refresh }) => {
    return {
        config,
        refresh
    };
};

const mapDispatchToProps = dispatch => ({
    permissionsInsert: (value) => 
        dispatch(actions.myintelliapi.permissionsInsert(value)),
    permissionsUpdate: (id, value) => 
        dispatch(actions.myintelliapi.permissionsUpdate(id, value)),
    noveltyPermissionsFetch: (value) => 
        dispatch(actions.myintelliapi.noveltyPermissionsFetch(value)),
    permissionsDelete: (value) => 
        dispatch(actions.myintelliapi.permissionsDelete(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePermission);
