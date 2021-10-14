import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { ContainerSection, DateHourPermit, ListItemMyIntelli, ListItemTextMyIntelli } from '.';
import { handleOpenLink, setStatusPermission, typePermissionsItems } from '../../settings/utils';

const ItemDetailsPermission = ({ date_time_in, date_time_out, description, entity_permission_files, novelty_permission, config, onPress, navigation }) => {

    const { t } = useTranslation();

    return (
        <ContainerSection
            title={t(`Turn.permission`)}>
            <ListItemTextMyIntelli
                icon={'clipboard-list-check'}
                title={`${t(`Permission.type`)}:`}
                description={`${novelty_permission.novelty_permission} (${typePermissionsItems.find((d) => d.value == novelty_permission.type_novelty_permission).label})`}
                />
            <DateHourPermit
                type_novelty_permission={novelty_permission.type_novelty_permission}
                date_time_in={date_time_in}
                date_time_out={date_time_out}
                />
           
            {(description != '' && description != null) && (
                <ListItemTextMyIntelli
                    icon={'comment'}
                    title={`${t(`Permission.description`)}:`}
                    description={description}
                    />
                    )}
            <ListItemTextMyIntelli
                icon={'info-circle'}
                title={`${t(`Permission.status`)}:`}
                description={t(`Permission.${setStatusPermission(novelty_permission.status)}`)}
                />
            {(entity_permission_files.length > 0) && (
                entity_permission_files.length > 1 ? (
                    <ListItemMyIntelli
                        icon={'file'}
                        title={`${t(`Turn.Files`)}`}
                        onPress={() => navigation.push('Files', {entity_permission_files}) }
                        ph={16}
                        />
                ) : (
                    <ListItemMyIntelli
                        icon={'file'}
                        title={`${entity_permission_files[0].entity_permission_file_name}`}
                        onPress={() => handleOpenLink(`${config.url}/file/${entity_permission_files[0].entity_permission_file}`)}
                        ph={16}
                        />
                )
            )}
            <ListItemMyIntelli
                icon={'link'}
                title={`${t(`Common.details`)}`}
                onPress={onPress}
                ph={16}
                />
        </ContainerSection>
    )
}

const mapStateToProps = ({ config }) => {
    return {
        config,
    };
};

export default connect(mapStateToProps)(ItemDetailsPermission);
