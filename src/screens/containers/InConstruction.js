import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'
import { BasePageChildren } from '../components'

const InConstruction = ({ navigation }) => {

    const { t } = useTranslation()

    return (
        <BasePageChildren
            title={t(`Common.inConstruction`)}
            navigation={navigation} 
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 18}}>{t(`Common.comingSoon`)}</Text>
            </View>
        </BasePageChildren>
    )
}

export default InConstruction
