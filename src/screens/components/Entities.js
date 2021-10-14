import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {COLORS} from '../../settings/theme';
import {actions} from '../../store';
import {ContainerSection, ListItemTextMyIntelli} from '.';

const Entities = ({user: User, tree, entitiesTypes, selectedEntityActive}) => {
  const {t} = useTranslation();
  const {person} = User;
  const {idEntityActive, entities} = person;

  let entitiess = [];
  if (tree) {
    entitiess = entities.map(d => {
      const StructuresTree = tree.filter(j =>
        d.structures.includes(j.id_structure),
      );
      let position = null;
      try {
        position = StructuresTree.find(i => i.id_structure_type == 5);
      } catch (error) {}

      let job = null;
      try {
        if (d.id_job) {
          job = d.job;
        } else {
          job = position.jobsInfo.find(
            i => i.id_job == (position.default_job ? position.default_job : 0),
          );
        }
      } catch (error) {}

      return {
        id_entity: d.id_entity,
        id_person: d.id_person,
        id_entity_type: d.id_entity_type,
        id_job: d.id_job,
        position,
        localization: StructuresTree.find(i => i.id_structure_type == 3),
        job,
      };
    });
  }

  const selectedNewEntity = id => {
    selectedEntityActive(id);
  };
  console.info(entitiess);
  return entitiess.map((data, i) => {
    const EntityName = entitiesTypes
      ? entitiesTypes.results.find(d => d.id_entity_type == data.id_entity_type)
          .entity_type
      : 'Entity not found';
    return (
      <ContainerSection
        key={data.id_entity}
        title={EntityName}
        right={
          <TouchableOpacity
            style={[
              styles.button,
              idEntityActive == data.id_entity
                ? styles.buttonActive
                : styles.buttonInactive,
            ]}
            onPress={() =>
              idEntityActive != data.id_entity &&
              selectedNewEntity(data.id_entity)
            }>
            <Text
              style={{
                color:
                  idEntityActive == data.id_entity
                    ? 'white'
                    : COLORS.TEXT_BLACK,
              }}>
              {idEntityActive == data.id_entity
                ? t(`User.active`)
                : t(`User.activate`)}
            </Text>
          </TouchableOpacity>
        }>
        {data.position.structure && (
          <ListItemTextMyIntelli
            icon={'user-tie'}
            title={`${t(`User.position`)}:`}
            description={data.position.structure && data.position.structure}
          />
        )}
        {data.job && (
          <ListItemTextMyIntelli
            icon={'briefcase'}
            title={`${t(`User.job`)}:`}
            description={data.job && data.job.job_name}
          />
        )}
        {data.localization.structure && (
          <ListItemTextMyIntelli
            icon={'globe-americas'}
            title={`${t(`User.localization`)}:`}
            description={
              data.localization.structure && data.localization.structure
            }
          />
        )}
      </ContainerSection>
    );
  });
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  buttonActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  buttonInactive: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: 'white',
    borderWidth: 1,
  },
});

const mapStateToProps = ({auth, structures, entitiesTypes}) => {
  return {
    user: auth.user,
    tree: structures.tree,
    entitiesTypes: entitiesTypes.data,
  };
};

const mapDispatchToProps = dispatch => ({
  selectedEntityActive: value =>
    dispatch(actions.myintelliapi.selectedEntityActive(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Entities);
