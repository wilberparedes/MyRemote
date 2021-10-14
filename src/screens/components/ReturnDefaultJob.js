import React from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {Capitalize} from '../../settings/utils';

const ReturnDefaultJob = ({
  user: User,
  tree,
  style = {},
  typeLetter = 'ucfirst',
}) => {
  const {person} = User;
  const {idEntityActive, entities} = person;
  const EntityActive = entities.find(d => d.id_entity == idEntityActive);
  let name = null;
  if (EntityActive.id_job) {
    name = EntityActive.job.job_name;
  } else {
    try {
      const position = tree.find(
        j =>
          EntityActive.structures.includes(j.id_structure) &&
          j.id_structure_type == 5,
      );
      name = position.jobsInfo.find(
        d => d.id_job == (position.default_job ? position.default_job : 0),
      ).job_name;
    } catch (error) {}
  }
  return <Text style={style}>{Capitalize(name, typeLetter)}</Text>;
};

const mapStateToProps = ({auth, structures}) => {
  return {
    user: auth.user,
    tree: structures.tree,
  };
};

export default connect(mapStateToProps)(ReturnDefaultJob);
