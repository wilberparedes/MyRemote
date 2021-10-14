import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';

import { DateItem, ReturnDefaultJob, ReturnLocalization, TimeFormat, ItemText } from '.';
import { COLORS } from '../../settings/theme';
import ListItemMyIntelli from './ListItemMyIntelli';

const CardTurn = ({ onPress, Data }) => {

    const { t } = useTranslation();
    const bgColor = (moment().format('YYYY-MM-DD') == moment(Data.date).format('YYYY-MM-DD') ? COLORS.PRIMARY : '#9B9B9B')
    
    return (
        (Data.schedules.length) ? 
        (
            Data.schedules.map((d, i) =>
                (
                    (i == 0) && (
                        <ListItemMyIntelli
                            key={i}
                            left={<DateItem date={Data.date} backgroundColor={bgColor} />}
                            ph={16}
                            onPress={onPress}
                            >
                            <View>
                                <View style={styles.flexRow}>
                                    <ItemText
                                        title={`${t(`Turn.since`)}:`}
                                        description={<TimeFormat>{d.date_time_in}</TimeFormat>}
                                        />
                                    <ItemText
                                        title={`${t(`Turn.until`)}:`}
                                        description={<TimeFormat>{d.date_time_out}</TimeFormat>}
                                        />
                                </View>
                                <ItemText
                                    title={`${t(`Turn.localization`)}:`}
                                    description={<ReturnLocalization id={d.id_structure} />}
                                    />
                                <ItemText
                                    title={`${t(`Turn.job`)}:`}
                                    description={d.id_job && d.job ? d.job.job_name : <ReturnDefaultJob />}
                                    />
                            </View>
                        </ListItemMyIntelli>
                    )
                ))
        ) : (
            <ListItemMyIntelli
                left={<DateItem date={Data.date} backgroundColor={bgColor} />}
                title={t(`Turn.unscheduled`)}
                ph={16}
                onPress={() => (onPress ? onPress() : console.info(`Press `)) } 
                />
        )
    )
}

const styles = StyleSheet.create({
    flexRow:{
        flexDirection: 'row', 
    },
})


export default CardTurn;