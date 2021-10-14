const VERSION = `/v1`;

import _ from 'lodash';
import axios from 'axios';
import i18n from 'i18next';
import {getUniqueId} from 'react-native-device-info';
import {alertOK, errorHandler, headerAxios} from '../../settings/utils';
import {
  CHANGE_CONFIG,
  ENTITIES_TYPES_FETCH,
  PERMISSION_FETCH,
  TREE_FETCH,
  USER_LOGIN,
  USER_LOGOUT,
} from '../constants';

export const aExample = () => dispatch => {
  const _url = `https://reqres.in/api/users?page=2`;
  const results = axios.get(_url, {
    // headers: utils.headerAxios(token),
  });
  return results;
};
export const aExampleAsync = search => dispatch => {
  const _url = `https://balldontlie.io/api/v1/players?search=${search}`;
  const results = axios.get(_url, {});
  return results;
};

export const selectedEntityActive = value => async (dispatch, getState) => {
  try {
    const newData = {
      ...getState().auth.user,
      person: {
        ...getState().auth.user.person,
        idEntityActive: value,
      },
    };
    dispatch({
      type: USER_LOGIN,
      payload: newData,
    });
    return true;
  } catch (error) {
    errorHandler(error, dispatch);
    return false;
  }
};
export const configChangeValues = value => async (dispatch, getState) => {
  try {
    const url = getState().config.url;
    const token = getState().auth.token;
    const id_user = getState().auth.user
      ? getState().auth.user.user.id_user
      : null;

    const data = {
      settings_user: {
        format_numeric: value.numberFormat,
        format_time: value.timeFormat,
        languaje: value.language,
        format_date: value.dateFormat,
        timezone_pg: value.timeZones,
        id_event_hour: value.timeEvents,
        id_format_name: value.nameFormat,
      },
    };
    if (token) {
      await axios.put(`${url}${VERSION}/users_update/${id_user}`, data, {
        headers: headerAxios(token),
      });
    }
    dispatch({type: CHANGE_CONFIG, payload: value});
    return true;
  } catch (error) {
    errorHandler(error, dispatch);
    return false;
  }
};

export const authLogin = params => async (dispatch, getState) => {
  try {
    const url = getState().config.url;
    const {data} = await axios.post(`${url}${VERSION}/remote/login`, params, {
      headers: headerAxios(false),
    });
    const {settings_user} = data.user;

    const keyPhone = getUniqueId();

    const newData = {
      ...data,
      person: {
        ...data.person,
        idEntityActive:
          data.person.entities.length == 1
            ? data.person.entities[0].id_entity
            : null,
      },
    };

    try {
      if (newData.person.person_user.add_phone == 1) {
        if (
          !newData.person.person_user.phones_info.find(
            i => i.serial == keyPhone,
          )
        ) {
          await axios.post(
            `${url}${VERSION}/person/enrollPhone`,
            {serial: keyPhone},
            {
              headers: headerAxios(data.token),
            },
          );
        }
      }
    } catch (error) {
      console.info('Fallo enrolamiento', error);
    }
    let enrolled = false;
    if (newData.person.photo_rekognition) enrolled = true;
    let newConfig = {
      ...getState().config,
      timeFormat: settings_user.format_time,
      timeZones: settings_user.timezone_pg,
      numberFormat: settings_user.format_numeric,
      timeEvents: settings_user.id_event_hour,
      dateFormat: settings_user.format_date,
      nameFormat: settings_user.id_format_name,
      temperatureFormat: settings_user.format_temperature,
      lengthFormat: settings_user.format_length,
      enrolled,
      // language: settings_user.languaje
    };
    i18n.changeLanguage(settings_user.languaje);
    dispatch({type: CHANGE_CONFIG, payload: newConfig});

    const {data: dataTree} = await axios.get(
      `${url}${VERSION}/tree?filter=0&all=0`,
      {
        headers: headerAxios(newData.token),
      },
    );
    const respET = await axios.get(
      `${url}${VERSION}/entities_types?limit=0&offset=0`,
      {
        headers: headerAxios(newData.token),
      },
    );
    dispatch({
      type: ENTITIES_TYPES_FETCH,
      payload: respET,
    });

    dispatch({
      type: TREE_FETCH,
      payload: dataTree,
    });

    dispatch({
      type: USER_LOGIN,
      payload: newData,
    });
    return true;
  } catch (error) {
    errorHandler(error, dispatch);
    return false;
  }
};

export const authUserRecovery = params => async (dispatch, getState) => {
  try {
    const url = getState().config.url;
    await axios.post(`${url}${VERSION}/send_email_reset`, params, {
      headers: headerAxios(false),
    });
    alertOK({
      title: i18n.t(`Common.successTitle`),
      message: i18n.t(`Common.uploadedRegister`),
    });
    return true;
  } catch (error) {
    errorHandler(error, dispatch);
    return false;
  }
};

export const authLogout = () => dispatch => {
  dispatch({
    type: USER_LOGOUT,
  });
  return true;
};

export const changeConfiguration = params => async (dispatch, getState) => {
  try {
    const url = getState().config.url;
    const token = getState().auth.token;
    const id_user = getState().auth.user
      ? getState().auth.user.user.id_user
      : null;
    // const { data } =
    await axios.put(`${url}${VERSION}/users_update/${id_user}`, params, {
      headers: headerAxios(token),
    });
    alertOK({
      title: i18n.t(`Common.successTitle`),
      message: i18n.t(`Common.uploadedRegister`),
    });
    return true;
  } catch (error) {
    errorHandler(error, dispatch);
    return false;
  }
};

export const getTree = () => async (dispatch, getState) => {
  try {
    let fil = 0;
    let all = 0;
    const url = getState().config.url;
    const token = getState().auth.token;
    // const { data } =
    const {data} = await axios.get(
      `${url}${VERSION}/tree?filter=${fil}&all=${all}`,
      {
        headers: headerAxios(token),
      },
    );
    dispatch({
      type: TREE_FETCH,
      payload: data,
    });
    return true;
  } catch (error) {
    errorHandler(error, dispatch);
    return false;
  }
};

export const entitiesTypeFetch =
  (Options = {}) =>
  async (dispatch, getState) => {
    try {
      const url = getState().config.url;
      const token = getState().auth.token;
      Options = _.extend(
        {
          limit: 20,
          offSet: 0,
          search: '',
          where: '',
          orderBy: 'entity_type ASC',
          allItem: false,
          dispatch: true,
        },
        Options,
      );

      if (
        !Options.allItem &&
        Options.search.indexOf('where[ma_entities_types.status]=0') == -1
      ) {
        Options.search += '&where[ma_entities_types.status]=1';
      }

      let search = '';
      if (Options.search !== '') {
        search = `&${Options.search}`;
      }

      const resp = await axios.get(
        `${url}${VERSION}/entities_types?limit=${Options.limit}&offset=${Options.offSet}&orderby=${Options.orderBy}${search}`,
        {
          headers: headerAxios(token),
        },
      );
      dispatch({
        type: ENTITIES_TYPES_FETCH,
        payload: resp,
      });
      return true;
    } catch (error) {
      errorHandler(error, dispatch);
      return false;
    }
  };

export const timePlanningCalendarFetch =
  (Options = {}) =>
  async (dispatch, getState) => {
    try {
      const url = getState().config.url;
      const token = getState().auth.token;
      const idEntity = getState().auth.user
        ? getState().auth.user.person.idEntityActive
        : null;

      Options = _.extend(
        {
          limit: 20,
          offSet: 0,
          search: '',
          select: '*',
          where: '',
          orderBy: '',
          allItem: false,
          dispatch: true,
        },
        Options,
      );

      let search = '';
      if (Options.search !== '') {
        search = `&${Options.search}`;
      }

      let urlApi = `${url}${VERSION}/person/${idEntity}/time_lines?where[datetime]=${Options.date_in},${Options.date_out}&offset=${Options.offSet}&limit=${Options.limit}&${Options.where}`;
      const {data} = await axios.get(urlApi, {
        headers: headerAxios(token),
      });
      return data;
    } catch (error) {
      errorHandler(error, dispatch);
      return false;
    }
  };

export const timelogsFetch =
  (Options = {}) =>
  async (dispatch, getState) => {
    try {
      const url = getState().config.url;
      const token = getState().auth.token;
      const idEntity = getState().auth.user
        ? getState().auth.user.person.idEntityActive
        : null;

      Options = _.extend(
        {
          limit: 20,
          offSet: 0,
          search: '',
          select: '*',
          where: '',
          orderBy: 'timelog desc',
        },
        Options,
      );
      let urlApi = `${url}${VERSION}/person/${idEntity}/timelogs?offset=0&limit=20&orderby=${Options.orderBy}`;

      const {data} = await axios.get(urlApi, {
        headers: headerAxios(token),
      });

      return data;
    } catch (error) {
      errorHandler(error, dispatch);
      return false;
    }
  };
export const timesFetch =
  (Options = {}) =>
  async (dispatch, getState) => {
    try {
      const url = getState().config.url;
      const token = getState().auth.token;
      const idEntity = getState().auth.user
        ? getState().auth.user.person.idEntityActive
        : null;

      Options = _.extend(
        {
          limit: 10,
          offSet: 0,
          search: '',
          select: '*',
          where: '',
          orderBy: '',
          date_in: '',
          date_out: '',
        },
        Options,
      );
      let urlApi = `${url}${VERSION}/person/${idEntity}/times?where[datetime]=${Options.date_in},${Options.date_out}&offset=0&limit=${Options.limit}`;
      const {data} = await axios.get(urlApi, {
        headers: headerAxios(token),
      });

      return data;
    } catch (error) {
      errorHandler(error, dispatch);
      return false;
    }
  };

export const permissionsFetch =
  (Options = {}) =>
  async (dispatch, getState) => {
    try {
      const url = getState().config.url;
      const token = getState().auth.token;
      const idEntity = getState().auth.user
        ? getState().auth.user.person.idEntityActive
        : null;
      Options = _.extend(
        {
          limit: 20,
          offSet: 0,
          orderBy: 'date_time_in asc',
        },
        Options,
      );

      let urlApi = `${url}${VERSION}/person/${idEntity}/permissions?where[date_time_in]=${Options.date_in},${Options.date_out}&offset=${Options.offSet}&limit=${Options.limit}&orderby=${Options.orderBy}`;
      const {data} = await axios.get(urlApi, {
        headers: headerAxios(token),
      });
      dispatch({
        type: PERMISSION_FETCH,
        payload: {
          refresh: false,
        },
      });
      return data;
    } catch (error) {
      errorHandler(error, dispatch);
      return false;
    }
  };

export const permissionsInsert =
  (Options = {}) =>
  async (dispatch, getState) => {
    try {
      const url = getState().config.url;
      const token = getState().auth.token;
      const idEntity = getState().auth.user
        ? getState().auth.user.person.idEntityActive
        : null;
      let urlApi = `${url}${VERSION}/person/${idEntity}/permission/`;
      await axios.post(urlApi, Options, {
        headers: headerAxios(token),
      });
      return true;
    } catch (error) {
      errorHandler(error, dispatch);
      return false;
    }
  };

export const permissionsUpdate =
  (idPermission, Options = {}) =>
  async (dispatch, getState) => {
    try {
      const url = getState().config.url;
      const token = getState().auth.token;
      const idEntity = getState().auth.user
        ? getState().auth.user.person.idEntityActive
        : null;

      let urlApi = `${url}${VERSION}/person/${idEntity}/permission/${idPermission}`;
      await axios.post(urlApi, Options, {
        headers: headerAxios(token),
      });
      return true;
    } catch (error) {
      errorHandler(error, dispatch);
      return false;
    }
  };

export const permissionsDelete =
  (Options = {}) =>
  async (dispatch, getState) => {
    try {
      const url = getState().config.url;
      const token = getState().auth.token;
      const idEntity = getState().auth.user
        ? getState().auth.user.person.idEntityActive
        : null;
      let urlApi = `${url}${VERSION}/person/${idEntity}/permission/${Options.idPermission}`;
      await axios.delete(urlApi, {
        headers: headerAxios(token),
      });
      dispatch({
        type: PERMISSION_FETCH,
        payload: {
          refresh: true,
        },
      });
      return true;
    } catch (error) {
      errorHandler(error, dispatch);
      return false;
    }
  };

export const timelogsNew = params => async (dispatch, getState) => {
  try {
    const url = getState().config.url;
    const token = getState().auth.token;
    const idEntity = getState().auth.user
      ? getState().auth.user.person.idEntityActive
      : null;
    const entity = getState().auth.user.person.entities.find(
      i => i.id_entity == idEntity,
    );
    const structures = getState().structures.tree;

    const structuresEntity = structures.filter(i =>
      structures
        .filter(i => entity.structures.includes(i.id_structure))
        .map(i => i.path.split('.'))
        .flat()
        .includes(i.id_structure.toString()),
    );
    const structure = structuresEntity.find(i => i.id_structure_type === 3);

    params.id_structure = structure && structure.id_structure;
    const data = await axios.post(
      `${url}${VERSION}/remote/${idEntity}/timelogs`,
      params,
      {
        headers: headerAxios(token),
      },
    );

    return {
      response: true,
    };
  } catch (error) {
    // errorHandler(error, dispatch, 'Timelogs');
    return {response: false, error};
  }
};

export const noveltyPermissionsFetch =
  (Options = {}) =>
  async (dispatch, getState) => {
    try {
      const url = getState().config.url;
      const token = getState().auth.token;

      Options = _.extend(
        {
          limit: 20,
          offSet: 0,
          select:
            'code,id_novelty_permission,novelty_permission,type_novelty_permission',
          orderBy: 'id_novelty_permission ASC',
          where: '',
        },
        Options,
      );
      const {data} = await axios.get(
        `${url}${VERSION}/novelties_permissions?limit=0&offset=0&select=${Options.select}&orderby=${Options.orderBy}&${Options.where}`,
        {
          headers: headerAxios(token),
        },
      );

      return data.data.results;
    } catch (error) {
      errorHandler(error, dispatch);
      return false;
    }
  };

export const enrollPhoto =
  (Options = {}) =>
  async (dispatch, getState) => {
    try {
      const url = getState().config.url;
      const token = getState().auth.token;
      // const idEntity = (getState().auth.user ? getState().auth.user.person.idEntityActive : null );
      let urlApi = `${url}${VERSION}/person/enrollPhoto`;
      await axios.post(urlApi, Options, {
        headers: headerAxios(token),
      });
      return {response: true};
    } catch (error) {
      // errorHandler(error, dispatch);
      return {response: false, error};
    }
  };

export const enrollPhone =
  (idEntity, Options = {}) =>
  async (dispatch, getState) => {
    try {
      const url = getState().config.url;
      const token = getState().auth.token;
      const idEntity = getState().auth.user
        ? getState().auth.user.person.idEntityActive
        : null;
      let urlApi = `${url}${VERSION}/person/${idEntity}/enrollPhone`;
      await axios.post(urlApi, Options, {
        headers: headerAxios(token),
      });
      return true;
    } catch (error) {
      errorHandler(error, dispatch);
      return false;
    }
  };

export const getLocationMaps =
  (Options = {}) =>
  async dispatch => {
    try {
      const keyGoogle = 'AIzaSyAttwscXTcDTs4TGaUWOmnpWk15apPHmf8';
      let urlApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${Options.lat},${Options.lng}&key=${keyGoogle}`;
      const data = await axios.post(urlApi, {});
      return {response: true, data};
    } catch (error) {
      errorHandler(error, dispatch);
      return {response: false, data: []};
    }
  };
