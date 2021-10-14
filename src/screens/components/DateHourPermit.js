import React from 'react'
import { useTranslation } from 'react-i18next';
import { DateFormat, ListItemTextMyIntelli, TimeFormat } from '.'

const DateHourPermit = ({type_novelty_permission, date_time_in, date_time_out }) => {

    const { t } = useTranslation();
    const dateIn = date_time_in.split(' ')[0];
    const dateOut = date_time_out.split(' ')[0];

    return(
        (type_novelty_permission == 1) ? //partial
            (dateIn == dateOut) ? (
                <>
                    <ListItemTextMyIntelli
                        icon={'calendar'}
                        title={`${t('Permission.date')}:`}
                        description={<DateFormat>{date_time_in}</DateFormat>}
                        />
                    <ListItemTextMyIntelli
                        icon={'business-time'}
                        title={`${t(`Permission.timeIn`)}:`}
                        description={<TimeFormat>{date_time_in}</TimeFormat>}
                        />
                    <ListItemTextMyIntelli
                        icon={'business-time'}
                        title={`${t(`Permission.timeOut`)}:`}
                        description={<TimeFormat>{date_time_out}</TimeFormat>}
                        />
                </>
            ) : (
                <>
                    <ListItemTextMyIntelli
                        icon={'calendar'}
                        title={`${t('Permission.dateIn')}:`}
                        description={<DateFormat>{date_time_in}</DateFormat>}
                        />
                    <ListItemTextMyIntelli
                        icon={'calendar'}
                        title={`${t('Permission.dateOut')}:`}
                        description={<DateFormat>{date_time_out}</DateFormat>}
                        />
                    <ListItemTextMyIntelli
                        icon={'business-time'}
                        title={`${t(`Permission.timeIn`)}:`}
                        description={<TimeFormat>{date_time_in}</TimeFormat>}
                        />
                    <ListItemTextMyIntelli
                        icon={'business-time'}
                        title={`${t(`Permission.timeOut`)}:`}
                        description={<TimeFormat>{date_time_out}</TimeFormat>}
                        />
                </>
        ) : (
            (dateIn == dateOut) ? (
                <ListItemTextMyIntelli
                    icon={'calendar'}
                    title={`${t('Permission.date')}:`}
                    description={<DateFormat>{date_time_in}</DateFormat>}
                    />
            ) : (
                <>
                    <ListItemTextMyIntelli
                        icon={'calendar'}
                        title={`${t('Permission.dateIn')}:`}
                        description={<DateFormat>{date_time_in}</DateFormat>}
                        />
                    <ListItemTextMyIntelli
                        icon={'calendar'}
                        title={`${t('Permission.dateOut')}:`}
                        description={<DateFormat>{date_time_out}</DateFormat>}
                        />
                </>
            )
        )
    )
}

export default DateHourPermit
