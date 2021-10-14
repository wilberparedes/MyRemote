import { combineReducers } from 'redux';
import auth from './auth';
import config from './config';
import structures from './structures';
import eventsTypes from './eventsTypes';
import entitiesTypes from './entitiesTypes';
import refresh from './refresh';

const rootReducer = combineReducers({
    auth,
    config,
    structures,
    eventsTypes,
    entitiesTypes,
    refresh
})

export default rootReducer;