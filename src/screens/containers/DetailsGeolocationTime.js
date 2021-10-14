import React from 'react'
import { View, Text } from 'react-native'
import { BasePageChildren, ContainerSection, ListItemTextMyIntelli, Maps } from '../components'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DetailsGeolocationTime = ({navigation}) => {
    return (
        <BasePageChildren
            title={`2021/03/01 07:58 am`}
            navigation={navigation}
            paddingNone
            >
            <View style={{height: hp(30)}}>
                <Maps coordinates={{lat: 10.999590, lng: -74.810172}} />
            </View>
            <ContainerSection
                title={`Información de marcaje`}
                >
                <ListItemTextMyIntelli
                    title={`Tipo de marcaje:`}
                    description={'Salida'}
                    />
                <ListItemTextMyIntelli
                    title={`Localización:`}
                    description={'MADRID'}
                    />
                <ListItemTextMyIntelli
                    title={`Trabajo:`}
                    description={'Desarrollo React'}
                    />
            </ContainerSection>
        </BasePageChildren>
    )
}

export default DetailsGeolocationTime
