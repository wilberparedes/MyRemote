import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { handleOpenLink } from '../../settings/utils';
import { BasePageChildren, ListItemMyIntelli } from '../components';

const Files = ({navigation, route, config}) => {

    const { t } = useTranslation();
    const {params} = route;

    return (
        <BasePageChildren
            title={t(`Turn.Files`)}
            navigation={navigation}
            paddingNone
            >
            {params.entity_permission_files && params.entity_permission_files.map((d, i) => (
                <ListItemMyIntelli
                    key={i}
                    icon={'file'}
                    title={`${d.entity_permission_file_name}`}
                    onPress={() => handleOpenLink(`${config.url}/file/${d.entity_permission_file}`)}
                    ph={16}
                    />
            ))}
        </BasePageChildren>
    )
}

const mapStateToProps = ({ config }) => {
    return {
        config,
    };
};

export default connect(mapStateToProps)(Files);

