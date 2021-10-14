import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Capitalize } from '../../settings/utils';

const ReturnLocalization = ({ tree, style = {}, id, typeLetter  = 'ucfirst' }) => {
    const name = tree.find((j) => j.id_structure == id).structure;
    return <Text style={style}>{Capitalize(name, typeLetter)}</Text>;
}

const mapStateToProps = ({ structures }) => {
    return {
        tree: structures.tree
    };
};

export default connect(mapStateToProps)(ReturnLocalization);
