import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReturnDayWeek } from '../../settings/utils';

const DayWeek = ({datestring}) => {
    const {t} = useTranslation();
    return t('General.daysAbv.'+ReturnDayWeek(datestring))
}

export default DayWeek
