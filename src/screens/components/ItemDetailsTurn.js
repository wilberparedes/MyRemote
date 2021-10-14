import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  ContainerSection,
  DateFormat,
  ReturnDefaultJob,
  ReturnLocalization,
  TimeFormat,
} from '.';
import {calcdiffHours} from '../../settings/utils';
import ListItemTextMyIntelli from './ListItemTextMyIntelli';

const ItemDetailsTurn = ({
  poss,
  date_time_in,
  date_time_out,
  id_structure,
  id_job,
  job,
}) => {
  const {t} = useTranslation();

  return (
    <ContainerSection title={`${t('Turn.turn')} ${poss + 1}`}>
      <ListItemTextMyIntelli
        icon={'calendar'}
        title={`${t('Turn.date')}:`}
        description={<DateFormat>{date_time_in}</DateFormat>}
      />

      <ListItemTextMyIntelli
        icon={'business-time'}
        title={`${t('Turn.turn')}:`}
        description={
          <>
            <TimeFormat>{date_time_in}</TimeFormat>
            {` - `}
            <TimeFormat>{date_time_out}</TimeFormat>
          </>
        }
      />
      <ListItemTextMyIntelli
        icon={'clock'}
        title={`${t('Turn.hour')}:`}
        description={`${parseFloat(
          calcdiffHours(date_time_in, date_time_out),
        ).toFixed(2)} Hrs`}
      />
      <ListItemTextMyIntelli
        icon={'globe-americas'}
        title={`${t('Turn.localization')}:`}
        description={<ReturnLocalization id={id_structure} />}
      />
      {job && (
        <ListItemTextMyIntelli
          icon={'briefcase'}
          title={`${t('Turn.job')}:`}
          description={id_job && job ? job.job_name : <ReturnDefaultJob />}
        />
      )}
    </ContainerSection>
  );
};

export default ItemDetailsTurn;
