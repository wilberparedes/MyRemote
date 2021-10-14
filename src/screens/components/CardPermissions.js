import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { DateItem, ItemText, TimeFormat, ListItemMyIntelli, IconMyIntelli } from '.';
import { typePermissionsItems, setStatusPermission, getBackground } from '../../settings/utils';



const CardPermissions = ({ onPress, Data, Details , ph = 0}) => {

    const { t } = useTranslation();
    const bgColor = getBackground(Number(Data.status_approval));

    return (
        <ListItemMyIntelli
            left={<DateItem date={Data.date_time_in} backgroundColor={bgColor} />}
            onPress={onPress}
            ph={ph}
            right={Details ? <View /> : null}
            >
            <View style={{ flex: Details ? 0 : 1}}>
                <ItemText
                    title={`${t(`Permission.type`)}:`}
                    description={`${Data.novelty_permission.novelty_permission} (${typePermissionsItems.find((d) => d.value == Data.novelty_permission.type_novelty_permission).label})`}
                    Extra={
                        (Data.entity_permission_files && Data.entity_permission_files.length > 0) && (
                            <View style={{marginTop: 4, marginRight: 4}}>
                                <IconMyIntelli icon={'paperclip'} size={14} />
                            </View>
                        )
                    }
                    />
                <ItemText
                    title={`${t(`Permission.hour`)}:`}
                    description={
                        <>
                            <TimeFormat>{Data.date_time_in}</TimeFormat>
                            {` - `}
                            <TimeFormat>{Data.date_time_out}</TimeFormat>
                        </>
                    }
                    />
                {Details && (
                    <ItemText
                        title={`${t(`Permission.description`)}:`}
                        description={Data.description}
                        />
                )}
                <ItemText
                    title={`${t(`Permission.status`)}:`}
                    description={t(`Permission.${setStatusPermission(Data.status_approval)}`)}
                    />
            </View>
        </ListItemMyIntelli>
    )
}

export default CardPermissions;
