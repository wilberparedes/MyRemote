import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { typePermissionsItems, setStatusPermission, handleOpenLink } from '../../settings/utils';
import { BasePageChildren, CardPermissions, ContainerSection, DateHourPermit, IconButtonMyIntelli, ItemDetailsPermissionMatriz, LinkText, ListItemMyIntelli, ListItemTextMyIntelli } from '../components';

let vrefresh = false;
const DetailsPermission = ({ navigation, route, config, refresh }) => {

    const { t } = useTranslation();
    const { Data } = route.params;

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                Back();
                return true;
            }
        );
        return () => backHandler.remove();
    }, []);
    useEffect(() => {
        if(!vrefresh && refresh.permissionsFetch){
            vrefresh = true;
            Back();
        }
    }, [refresh.permissionsFetch]);

    const Back = () => {
        navigation.goBack();
    }

    return (
        <BasePageChildren
            title={t(`Common.permissionDetails`)}
            navigation={navigation}
            Right={
                (Number(Data.status_approval) > 2) && (
                    <IconButtonMyIntelli
                        icon={'pencil'}
                        color={'white'}
                        type={'solid'}
                        onPress={() => navigation.push('ManagePermission', { new: false, Data })}
                        />
                )
            }
            paddingNone
            >
                <View>
                    <ListItemTextMyIntelli
                        icon={'clipboard-list-check'}
                        title={`${t(`Permission.type`)}:`}
                        description={`${Data.novelty_permission.novelty_permission} (${typePermissionsItems.find((d) => d.value == Data.novelty_permission.type_novelty_permission).label})`}
                        />
                    
                    <DateHourPermit
                        type_novelty_permission={Data.novelty_permission.type_novelty_permission}
                        date_time_in={Data.date_time_in}
                        date_time_out={Data.date_time_out}
                        />
                    
                    {(Data.description != ''  && Data.description != null) && (
                        <ListItemTextMyIntelli
                            icon={'comment'}
                            title={`${t(`Permission.description`)}:`}
                            description={Data.description}
                            />
                    )}
                    <ListItemTextMyIntelli
                        icon={'info-circle'}
                        title={`${t(`Permission.status`)}:`}
                        description={t(`Permission.${setStatusPermission(Data.status_approval)}`)}
                        />
                    {(Data.entity_permission_files.length > 0) && (
                        Data.entity_permission_files.length > 1 ? (
                            <ListItemMyIntelli
                                icon={'file'}
                                title={`${t(`Turn.Files`)}`}
                                onPress={() => navigation.push('Files', {entity_permission_files: Data.entity_permission_files}) }
                                ph={16}
                                />
                        ) : (
                            <ListItemMyIntelli
                                icon={'file'}
                                title={`${Data.entity_permission_files[0].entity_permission_file_name}`}
                                onPress={() => handleOpenLink(`${config.url}/file/${Data.entity_permission_files[0].entity_permission_file}`)}
                                ph={16}
                                />
                        )
                    )}
                </View>
                
                {(Data.novelty_permission_history && Data.novelty_permission_history.length > 0) &&(
                    <ContainerSection
                        title={t(`Permission.history`)}
                        style={{paddingTop: 0, flex: 1}}
                        >
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                >
                                { Data.novelty_permission_history.map((item, i) => (
                                    <CardPermissions
                                        key={i}
                                        Data={item} 
                                        Details
                                        ph={16}
                                        />
                                ))}

                            </ScrollView>
                    </ContainerSection>
                )}
        </BasePageChildren>
    )
}

const mapStateToProps = ({ config, refresh }) => {
    return {
        config,
        refresh
    };
};

export default connect(mapStateToProps)(DetailsPermission);
