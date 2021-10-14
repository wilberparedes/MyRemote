import { CHANGE_CONFIG, RESET_CONFIG } from "../constants";
const initialState = {
    url: "https://api.admin.myintelli.net",
    theme: "Light",
    dateFormat: "DD-MM-YYYY",
    timeFormat: "hh:mm a",
    timeZones: "America/Bogota",
    numberFormat: "999.99",
    timeEvents: 1,
    nameFormat: 1,
    temperatureFormat: "K",
    lengthFormat: 1,
    language: "es-CO",
    enrolled: false
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CONFIG:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_CONFIG:
      return {
        ...state,
      };

    default:
      return state;
  }
}
