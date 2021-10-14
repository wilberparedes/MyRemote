import Moment from "moment-timezone";
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, VirtualizedList, ActivityIndicator, BackHandler, Text } from 'react-native';
import { useTranslation } from "react-i18next";

import { BasePageChildren, CardTurnGroupByDate, ToolbarDate } from '../components';
import { getItem } from '../../settings/utils';
import { Divider } from 'react-native-paper';
import { COLORS } from '../../settings/theme';
import { connect } from "react-redux";
import { actions } from "../../store";

let Init = true;
const Turn = ({ navigation, user: User, timePlanningCalendarFetch }) => {

    if (!User) {
        return null;
    }

    const { t } = useTranslation();
    const [dateIn, setDateIn] = useState(Moment());
    const [dateOut, setDateOut] = useState(Moment());
    const [isLoading, setIsLoading] = useState(true);
    const [ isFetching, setIsFetching ] = useState(false);
    const [ turns, setTurns ] = useState(null);

    const DataFather = turns ? turns.data.results[0] : [];
    const Data = turns ? DataFather.dates : [];

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
        const resp = await timePlanningCalendarFetch((
            {
                date_in: dateIn.format("YYYY-MM-DD"),
                date_out: dateOut.format("YYYY-MM-DD"),
            }
        ));
        setTurns(resp);
        Init = false;
        if(Data.length > 0) setIsFetching(false)
        else setIsLoading(false);
    }

    return (
        <BasePageChildren
            title={t(`Common.schedules`)}
            navigation={navigation}
            BackNone
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
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={14}
                    renderItem={({item}) => (
                        <CardTurnGroupByDate
                            onPress={() => navigation.push('DetailsTurn', { date: item.date, item  })}
                            Data={item} 
                            />
                    )}
                    getItemCount={() => Data.length }
                    keyExtractor={(item, index) => index}
                    getItem={getItem}
                    ItemSeparatorComponent={() => <Divider />}
                    ListEmptyComponent={<View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 16}}><Text style={{fontSize: 18}}>{t(`General.notResult`)}</Text></View>}
                    />
            )}
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
});

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user
    };
};

const mapDispatchToProps = dispatch => ({
    timePlanningCalendarFetch: (value) => 
        dispatch(actions.myintelliapi.timePlanningCalendarFetch(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Turn);

