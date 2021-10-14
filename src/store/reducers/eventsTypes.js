import { EVENT_TYPE_FETCH } from "../constants";

const initialState = {
  data: {
    results: [
      {
        id_event_type: 1,
        event_type: 'ACTION_SCHEDULED',
        event_components: [
          35
        ],
        event_components_excludings: [],
        event_components_optional: [],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'GENERAL'
        ],
        icon: 'intelli_action_scheduled'
      },
      {
        id_event_type: 2,
        event_type: 'TIMELOG_AC_ACCEPTED',
        event_components: [],
        event_components_excludings: [
          12,
          3
        ],
        event_components_optional: [
          5,
          8,
          27,
          28,
          1,
          2,
          31,
          3,
          4,
          33,
          6,
          29,
          32,
          36,
          37
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'ACCESS_CONTROL'
        ],
        icon: 'intelli_timelog_accepted'
      },
      {
        id_event_type: 3,
        event_type: 'TIMELOG_AC_NOT_VERIFIED',
        event_components: [],
        event_components_excludings: [
          3
        ],
        event_components_optional: [
          3,
          4,
          5,
          8,
          27,
          33
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'ACCESS_CONTROL'
        ],
        icon: 'intelli_timelog_not_verified'
      },
      {
        id_event_type: 4,
        event_type: 'OPEN_EXIT_BUTTON',
        event_components: [],
        event_components_excludings: [
          3
        ],
        event_components_optional: [
          3,
          4,
          5,
          33
        ],
        event_components_selected_one: [],
        status: 0,
        modules: [
          'ACCESS_CONTROL'
        ],
        icon: 'intelli_open_exit_button'
      },
      {
        id_event_type: 5,
        event_type: 'ACCESS_SCHEDULED',
        event_components: [
          9,
          10
        ],
        event_components_excludings: [],
        event_components_optional: [],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'ACCESS_CONTROL'
        ],
        icon: 'intelli_calendar_lock'
      },
      {
        id_event_type: 6,
        event_type: 'CHANGE_STATUS_DOOR_REMOTE',
        event_components: [],
        event_components_excludings: [
          4
        ],
        event_components_optional: [
          3,
          4,
          5,
          7,
          11,
          18,
          33
        ],
        event_components_selected_one: [],
        status: 0,
        modules: [
          'ACCESS_CONTROL'
        ],
        icon: 'intelli_change_status_door_remote'
      },
      {
        id_event_type: 7,
        event_type: 'CHANGE_STATUS_DOOR_MANUAL',
        event_components: [],
        event_components_excludings: [],
        event_components_optional: [
          3,
          4,
          5,
          7,
          18,
          33
        ],
        event_components_selected_one: [],
        status: 0,
        modules: [
          'ACCESS_CONTROL'
        ],
        icon: 'intelli_change_status_door_manual'
      },
      {
        id_event_type: 8,
        event_type: 'VISIT_NEW',
        event_components: [],
        event_components_excludings: [
          13
        ],
        event_components_optional: [
          2,
          5,
          12,
          13,
          14,
          31
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'VISITS'
        ],
        icon: 'fas fa-users'
      },
      {
        id_event_type: 9,
        event_type: 'VISIT_NEW_SCHEDULED',
        event_components: [],
        event_components_excludings: [
          13
        ],
        event_components_optional: [
          2,
          5,
          12,
          13,
          14,
          31
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'VISITS'
        ],
        icon: 'intelli_visits_scheduled'
      },
      {
        id_event_type: 10,
        event_type: 'VISIT_CLOSED',
        event_components: [],
        event_components_excludings: [
          13
        ],
        event_components_optional: [
          2,
          5,
          12,
          13,
          31
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'VISITS'
        ],
        icon: 'intelli_closing_rule'
      },
      {
        id_event_type: 11,
        event_type: 'VISIT_CHANGE_STATUS_SCHEDULED',
        event_components: [
          19
        ],
        event_components_excludings: [],
        event_components_optional: [
          2,
          5,
          12,
          13,
          31
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'VISITS'
        ],
        icon: 'intelli_visit_change_status_scheduled'
      },
      {
        id_event_type: 12,
        event_type: 'ADD_TO_BLACKLIST',
        event_components: [],
        event_components_excludings: [],
        event_components_optional: [
          5,
          11
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'ACCESS_CONTROL'
        ],
        icon: 'fas fa-user-times'
      },
      {
        id_event_type: 13,
        event_type: 'CONNECTION_CHANGE',
        event_components: [],
        event_components_excludings: [
          6
        ],
        event_components_optional: [
          3,
          4,
          5,
          7,
          16,
          17,
          33
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'DEVICES'
        ],
        icon: 'intelli_connection_change'
      },
      {
        id_event_type: 14,
        event_type: 'USER_LOGIN',
        event_components: [],
        event_components_excludings: [],
        event_components_optional: [
          5,
          11
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'USERS'
        ],
        icon: 'fas fa-user-check'
      },
      {
        id_event_type: 15,
        event_type: 'USER_CREATION',
        event_components: [],
        event_components_excludings: [],
        event_components_optional: [
          5
        ],
        event_components_selected_one: [],
        status: 0,
        modules: [
          'USERS'
        ],
        icon: 'fas fa-user-plus'
      },
      {
        id_event_type: 16,
        event_type: 'USER_BLOCKED',
        event_components: [],
        event_components_excludings: [],
        event_components_optional: [
          5,
          11
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'USERS'
        ],
        icon: 'fas fa-user-lock'
      },
      {
        id_event_type: 17,
        event_type: 'PASSWORD_CHANGE',
        event_components: [],
        event_components_excludings: [],
        event_components_optional: [
          5,
          11
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'USERS'
        ],
        icon: 'fas fa-key'
      },
      {
        id_event_type: 18,
        event_type: 'CREATE_UPDATE_USER',
        event_components: [],
        event_components_excludings: [],
        event_components_optional: [],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'SYSTEM'
        ],
        icon: 'fas fa-users'
      },
      {
        id_event_type: 19,
        event_type: 'REMOVE_FROM_BLACKLIST',
        event_components: [],
        event_components_excludings: [],
        event_components_optional: [
          5,
          11
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'ACCESS_CONTROL'
        ],
        icon: 'fas fa-user-times'
      },
      {
        id_event_type: 20,
        event_type: 'BATTERY_STATUS_CHANGE',
        event_components: [],
        event_components_excludings: [
          3
        ],
        event_components_optional: [
          3,
          4,
          33,
          34
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'DEVICES'
        ],
        icon: 'fas fa-battery-half'
      },
      {
        id_event_type: 21,
        event_type: 'TIMELOG_TA_ACCEPTED',
        event_components: [],
        event_components_excludings: [
          12,
          3
        ],
        event_components_optional: [
          5,
          8,
          27,
          28,
          1,
          2,
          31,
          3,
          4,
          33,
          6,
          29,
          32,
          36,
          37
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'TIME_ATTENDANCE'
        ],
        icon: 'intelli_timelog_accepted'
      },
      {
        id_event_type: 22,
        event_type: 'TIMELOG_TA_NOT_VERIFIED',
        event_components: [],
        event_components_excludings: [
          3
        ],
        event_components_optional: [
          3,
          4,
          5,
          8,
          27,
          33
        ],
        event_components_selected_one: [],
        status: 1,
        modules: [
          'TIME_ATTENDANCE'
        ],
        icon: 'intelli_timelog_not_verified'
      }
    ],
    count: 22,
    limit: 100,
    offset: '0'
  }
};

export default function eventsTypes(state = initialState, action) {
  switch (action.type) {
    case EVENT_TYPE_FETCH:
      return {
        ...state,
        data: action.payload.data.results,
      };
    default:
      return state;
  }
}
