import React, { useState } from 'react';
import Moment from "moment/min/moment-with-locales";
import { connect } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Text, View, StatusBar, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
// import TextInputMask from 'react-native-text-input-mask';


import { actions } from '../../store';
import { HeaderTitleWithBack, IconMyIntelli, InputField, DatePicker, TimePicker, DateTimeFormat, DateFormat, TimeFormat, TemperatureFormat, PickerField, AsyncPickerField, IconButtonMyIntelli, HeaderHome, HeaderWithButtons, ModalRadioList } from '../components';
import { languages, NameWithFormat, TimeWithFormat, DateTimeWithFormat, DateWithFormat } from '../../settings/utils';
import { COLORS } from '../../settings/theme';
import i18n from 'i18next';

const App1 = ({ timeFormat, dateFormat, nameFormat, aExampleAsync, navigation }) => {

    const { t } = useTranslation();
    const [usuario, setUsuario] = useState('')
    const [celular, setCelular] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [pass, setPass] = useState('')
    const [date, setDate] = useState( Moment().format('YYYY-MM-DD') )
    const [time, setTime] = useState( Moment().format('HH:mm:ss') )
    const [pickerSelected, setPickerSelected] = useState(null)
    const [pickerSelectedSearch, setpickerSelectedSearch] = useState(null)
    const [pickermultiple, setPickermultiple] = useState([])
    const [pickerSelectedAync, setPickerSelectedAync] = useState(null)
    const [pickerSelectedMultiAync, setPickerSelectedMultiAync] = useState([])
    const [visibleLanguage, setVisibleLanguage] = useState(false)


    const equipos = [
        {
            value: 1,
            label: "Liverpool"
        },
        {
            value: 2,
            label: "Flamengo"
        },
        {
            value: 3,
            label: "Barcelona"
        },
        {
            value: 4,
            label: "River Plate"
        },
        {
            value: 5,
            label: "Palmeiras"
        },
        {
            value: 6,
            label: "Manchester City"
        },
        {
            value: 7,
            label: "Bayer Munchen"
        },
        {
            value: 8,
            label: "Gremio"
        },
        {
            value: 9,
            label: "Boca Juniors"
        },
        {
            value: 10,
            label: "Valencia"
        },
        {
            value: 11,
            label: "PSG"
        },
        {
            value: 12,
            label: "Atlético Madrid"
        },
        {
            value: 13,
            label: "Juventus"
        },
        {
            value: 14,
            label: "Juventus"
        },
        {
            value: 15,
            label: "Athletico Paranaense"
        },
        {
            value: 16,
            label: "RB Leipzig"
        },
        {
            value: 17,
            label: "Internacional"
        },
        {
            value: 18,
            label: "Real Madrid"
        },
        {
            value: 19,
            label: "Chelsea"
        },
        {
            value: 20,
            label: "Monterrey"
        },
        {
            value: 21,
            label: "Ajax"
        },
        {
            value: 22,
            label: "Bayer Leverkusen"
        },
        {
            value: 23,
            label: "Tigres UANL"
        },
        {
            value: 24,
            label: "Arsenal"
        },
        {
            value: 25,
            label: "Atalanta"
        },
        {
            value: 26,
            label: "Getafe"
        },
        {
            value: 27,
            label: "León"
        },
        {
            value: 28,
            label: "Shanghai SIPG"
        },
        {
            value: 29,
            label: "Al Nassr"
        },
        {
            value: 30,
            label: "Sevilla"
        },
        {
            value: 31,
            label: "Real Sociedad"
        },
        {
            value: 32,
            label: "Atlético Mineiro"
        },
        {
            value: 33,
            label: "América"
        },
        {
            value: 34,
            label: "Wolverhampton Wanderers"
        },
        {
            value: 35,
            label: "Borussia Dortmund"
        },
        {
            value: 36,
            label: "Inter"
        },
        {
            value: 37,
            label: "Napoli"
        },
        {
            value: 38,
            label: "Manchester United"
        },
        {
            value: 39,
            label: "Santos"
        },
        {
            value: 40,
            label: "Lazio"
        }
    ];

    const loadNBAPlayers = (value, callback) => {
        setTimeout(() => {
            aExampleAsync(value)
            .then((res) => {
                const { data } = res.data;
                const newData = data.map((item) => {
                    return {
                        value: item.id,
                        label: `${item.first_name} ${item.last_name} (${item.team.full_name})`
                    }
                })
                callback (newData)
            })
            .catch((error) => {
                console.log(error);
            });
        }, 500);
    }

    return (
        <View style={{ flex: 1,  }}>
            <HeaderTitleWithBack
                title={'App Documentation'}
                navigation={navigation} //required
                // goBack={() => function()} //optional default goBack()
                // Right={<Component />} //optional
                />
            <ScrollView style={{ flex: 1,backgroundColor: 'white', padding: 16, }}>
                <View>

                    <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 15 }}>
                        <Trans t={t}>welcome</Trans>
                    </Text>
                    <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 15 }}>
                        <Trans t={t}>welcome</Trans>
                    </Text>

                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <Text>{`Icon Example (Font Awesome5)`}</Text>
                        <IconMyIntelli icon={'user'} size={20} />
                    </View>
                    

                    <IconButtonMyIntelli
                        icon="globe"
                        // size={18}
                        // onPress={() => setVisibleLanguage(true)}
                        color={COLORS.PRIMARY}
                        />

                    <HeaderHome
                        navigation={navigation} //required
                        />
                    
                    <HeaderWithButtons
                        // transparent //optional
                        Left={//optional
                            <IconButtonMyIntelli
                                icon="cog"
                                // onPress={() => setVisibleServer(true)}
                                color={'white'}
                                />
                        }
                        title={'texto'} //optional
                        colorTitle={'white'} //required if title != ''
                        Right={//optional
                            <IconButtonMyIntelli
                                icon="globe"
                                // onPress={() => setVisibleLanguage(true)}
                                color={'white'}
                                />
                        }
                        />

                    <InputField
                        iconLeft='user'
                        value={usuario}
                        label="Usuario:"
                        // placeholder="abc@mail.com"
                        onChange={(text) => setUsuario(text)}
                        />
                    <InputField
                        iconLeft='mobile-alt'
                        value={celular}
                        label="Celular:"
                        // placeholder="+"
                        // render={props =>
                        //     <TextInputMask
                        //       {...props}
                        //       mask="+[00] [000] [000] [0000]"
                        //     />
                        // }
                        onChange={(extracted) => setCelular(extracted)}
                        error={'Mensaje de error'}
                        keyboardType="phone-pad"
                        />
                    <InputField
                        value={pass}
                        label="Contraseña:"
                        placeholder="********"
                        password
                        showPassword
                        onChange={(text) => setPass(text)}
                        />
                    <InputField
                        value={descripcion}
                        multiline
                        numberOfLines={4}
                        label="Descripción:"
                        onChange={(text) => setDescripcion(text)}
                        />

                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <Text>{`Function DateTime Example`}</Text>
                        <Text>{DateTimeWithFormat('2021-06-04 14:35:00',  dateFormat, timeFormat)}</Text>
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <Text>{`Function Date Example`}</Text>
                        <Text>{DateWithFormat('2021-06-04',  dateFormat)}</Text>
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <Text>{`Function Time Example`}</Text>
                        <Text>{TimeWithFormat('14:35:00',  timeFormat)}</Text>
                    </View>


                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <Text>{`Text DateTime Example`}</Text>
                        <DateTimeFormat>2021-06-04 14:35:00</DateTimeFormat>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <Text>{`Text Date Example`}</Text>
                        <DateFormat>2021-06-04</DateFormat>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <Text>{`Text Time Example`}</Text>
                        <TimeFormat>14:35:00</TimeFormat>
                    </View>


                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <Text>{`Text Temperature Example`}</Text>
                        <TemperatureFormat>30.00</TemperatureFormat>
                    </View>


                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <Text>{`Function Name Example`}</Text>
                        <Text>{NameWithFormat({first_name: "WILBER", middle_name: "JOSÉ", last_name1: "PAREDES", last_name2: "GONZÁLEZ"},  nameFormat)}</Text>
                    </View>


                    <DatePicker
                        label={"DatePicker"}
                        value={date}
                        onDateChange={(val) => setDate( val )}
                        iconRight='calendar'
                        />

                    
                    <TimePicker
                        label={t("configuration.formatHour")}
                        value={time}
                        onDateChange={(val) => setTime( val )}
                        iconRight='calendar'
                        />

                    <PickerField
                        label={"PickerField"}
                        value={pickerSelected}
                        items={languages.map((item) => ({
                            label: item.value,
                            value: item.id,
                        }))}
                        onValueChange={(val) => setPickerSelected( val )}
                        />

                    <PickerField
                        label={"PickerField Search"}
                        value={pickerSelectedSearch}
                        items={equipos}
                        onValueChange={(val) => { console.log(val); setpickerSelectedSearch( val )}}
                        />

                    <PickerField
                        label={"PickerField select multiple"}
                        value={pickermultiple}
                        items={equipos}
                        isMulti
                        onValueChange={(val) => setPickermultiple( val )}
                        />

                    <AsyncPickerField
                        label={"PickerField select async"}
                        value={pickerSelectedAync}
                        items={loadNBAPlayers}
                        defaultOptions
                        onValueChange={(val) => setPickerSelectedAync( val )}
                        />

                    <AsyncPickerField
                        label={"PickerField multi select async"}
                        value={pickerSelectedMultiAync}
                        items={loadNBAPlayers}
                        defaultOptions
                        isMulti
                        onValueChange={(val) => setPickerSelectedMultiAync( val )}
                        />
                    

                    <TouchableOpacity onPress={() => setVisibleLanguage(true)} style={{backgroundColor: 'yellow', padding:10}}>
                        <Text>{`Modal RadioButton Example`}</Text>
                    </TouchableOpacity>

                    <View style={{height: 80}} />
                    <ModalRadioList
                        visible={visibleLanguage}
                        onHideModal={() => setVisibleLanguage(false)}
                        // buttonClose //opcional default false
                        title={t("Common.languageTitle")}
                        items={languages}
                        value={i18n.language}
                        onValueChange={(value) => { i18n.changeLanguage(value); setVisibleLanguage(false) }}
                        />


                </View>
                <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true}/>
            </ScrollView>
        </View>
    );

};


const mapStateToProps = ({ config }) => {
    return {
        timeFormat: config.timeFormat,
        dateFormat: config.dateFormat,
        nameFormat: config.nameFormat
    };
};


const mapDispatchToProps = dispatch => ({
    aExampleAsync: (name) => 
        dispatch(actions.myintelliapi.aExampleAsync(name)),
    dispatch
});
  
export default connect(mapStateToProps, mapDispatchToProps)(App1);