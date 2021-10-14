import Moment from "moment-timezone";
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, VirtualizedList, ActivityIndicator, BackHandler, Text } from 'react-native';
import { useTranslation } from "react-i18next";

import { BasePageChildren, CardPermissions, IconButtonMyIntelli, ModalConfirmAction, ToolbarDate } from '../components';
import { getItem } from '../../settings/utils';
import { Divider } from 'react-native-paper';
import { COLORS } from '../../settings/theme';
import { connect } from "react-redux";
import { actions } from "../../store";

let Init = true;
let vrefresh = false;
const Permissions = ({ navigation, user: User, permissionsFetch, refresh }) => {

    if (!User) {
        return null;
    }

    const { t } = useTranslation();
    const [ dateIn, setDateIn ] = useState(Moment());
    const [ dateOut, setDateOut ] = useState(Moment());
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isFetching, setIsFetching ] = useState(false);
    const [ permissions, setPermissions ] = useState(null);

    const [confirmDelete, setConfirmDelete] = useState(false);
    
    const Data = permissions ? permissions.data.results : [];

    useEffect(() => {
        
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                Back();
                return true;
            }
        );
        return () => backHandler.remove();
    }, []);

    const Back = () => {
        navigation.goBack();
    }


    useEffect(() => {
        if(!vrefresh && refresh.permissionsFetch){
            vrefresh = true;
            getDataFetch();
        }
    }, [refresh.permissionsFetch]);

    useEffect(() => {
        if(Data.length > 0) setIsFetching(true)
        else setIsLoading(true);
        const timeout = setTimeout(() => {
            getDataFetch();
        }, 500);
        return () => clearTimeout(timeout);
    }, [User.person.idEntityActive]);

    useEffect(() => {
        if(Data.length > 0) setIsFetching(true)
        else setIsLoading(true);
        const timeout = setTimeout(() => {
            getDataFetch()
        }, 500);
        return () => clearTimeout(timeout);
    }, [dateIn, dateOut])

    const getDataFetch = async () => {
        const resp = await permissionsFetch((
            {
                date_in: dateIn.format("YYYY-MM-DD"),
                date_out: dateOut.format("YYYY-MM-DD"),
            }
        ));
        setPermissions(resp);
        Init = false;
        if(Data.length > 0) setIsFetching(false)
        else setIsLoading(false);
    }


    return (
        <BasePageChildren
            title={t(`Common.permissions`)}
            BackNone
            navigation={navigation}
            Right={
                <IconButtonMyIntelli
                    icon={'plus'}
                    color={'white'}
                    onPress={() => navigation.push('ManagePermission', { new: true })}
                    />
            }
            >
            <View>
                <ToolbarDate
                    start={dateIn.format('YYYY-MM-DD')}
                    handleStart={setDateIn}
                    end={dateOut.format('YYYY-MM-DD')}
                    handleEnd={setDateOut}
                />
            </View>

            {(isLoading) ? (
                <ActivityIndicator size="large" color={COLORS.PRIMARY} />
            ) : (
                <VirtualizedList
                    onRefresh={() => getDataFetch()}
                    refreshing={isFetching}
                    data={Data}
                    initialNumToRender={1}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <CardPermissions
                            Data={item} 
                            onPress={() => navigation.push('DetailsPermission', { Data: item }) }
                            />
                    )}
                    getItemCount={() => Data.length }
                    keyExtractor={(item, index) => index}
                    getItem={getItem}
                    ItemSeparatorComponent={() => <Divider />}
                    ListEmptyComponent={<View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 16}}><Text style={{fontSize: 18}}>{t(`General.notResult`)}</Text></View>}
                    />
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
    toolbar: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 8 
    },
    toolbar_button: { 
        flexDirection: 'row' 
    }
})

const mapStateToProps = ({auth,refresh}) => {
    return {
        user: auth.user,
        refresh
    };
};

const mapDispatchToProps = dispatch => ({
    permissionsFetch: (value) => 
        dispatch(actions.myintelliapi.permissionsFetch(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Permissions);

