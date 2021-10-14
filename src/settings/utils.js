import _ from 'lodash';
// import Moment from "moment/min/moment-with-locales";
import Moment from 'moment-timezone';
import i18n from 'i18next';
import {Alert, Linking, PermissionsAndroid, ToastAndroid} from 'react-native';
import {USER_LOGOUT} from '../store/constants';
import { COLORS } from './theme';

export const formatTimes = [
  {id: 'HH:mm', value: '24 H'},
  {id: 'hh:mm a', value: '12 H'},
];

export const formatTemperature = [
  {id: 'F', value: 'FAHRENHEIT'},
  {id: 'C', value: 'CELCIUS'},
  {id: 'K', value: 'KELVIN'},
];

export const formatsDates = [
  {id: 'DD-MM-YYYY', value: 'DD-MM-YYYY', mask: 'dd-MM-yyyy'},
  {id: 'DD/MM/YYYY', value: 'DD/MM/YYYY', mask: 'dd/MM/yyyy'},
  {id: 'YYYY-MM-DD', value: 'YYYY-MM-DD', mask: 'yyyy-MM-dd'},
  {id: 'YYYY/MM/DD', value: 'YYYY/MM/DD', mask: 'yyyy/MM/dd'},
  {id: 'MM/DD/YYYY', value: 'MM/DD/YYYY', mask: 'MM/dd/yyyy'},
  {id: 'MM-DD-YYYY', value: 'MM-DD-YYYY', mask: 'MM-dd-yyyy'},
];

export const languages = [
  {id: 'es-CO', value: 'Español CO'},
  {id: 'es-VE', value: 'Español VE'},
  {id: 'en-US', value: 'English US'},
];

export const formatNumeric = [
  {id: '999.99', value: '999.99'},
  {id: '999,99', value: '999,99'},
];

export const itemsLengthFormat = [
  {value: 1, label: 'Configuration.kilometres'},
  {value: 2, label: 'Configuration.miles'},
];

export const itemsServerUrl = [
  {id: 'https://api.admin.myintelli.net', value: 'Common.mainServer'},
];

export const itemsTimeZoneFormat = [
  {value: '(UTC) COORDINATED UNIVERSAL TIME', id: 'UTC'},
  {value: '(UTC-12:00) INTERNATIONAL DATE LINE WEST', id: 'Etc/GMT+12'},
  {
    value: '(UTC-11:00) COORDINATED UNIVERSAL TIME-11',
    id: 'Pacific/Samoa',
  },
  {value: '(UTC-10:00) HAWAII', id: 'US/Hawaii'},
  {value: '(UTC-09:00) ALASKA', id: 'US/Alaska'},
  {value: '(UTC-08:00) BAJA CALIFORNIA', id: 'Mexico/BajaNorte'},
  {
    value: '(UTC-08:00) PACIFIC TIME (US & CANADA)',
    id: 'Canada/Pacific',
  },
  {value: '(UTC-07:00) ARIZONA', id: 'US/Arizona'},
  {
    value: '(UTC-07:00) CHIHUAHUA, LA PAZ, MAZATLAN',
    id: 'America/Chihuahua',
  },
  {value: '(UTC-07:00) MOUNTAIN TIME (US & CANADA)', id: 'US/Mountain'},
  {value: '(UTC-06:00) CENTRAL TIME (US & CANADA)', id: 'US/Central'},
  {
    value: '(UTC-06:00) GUADALAJARA, MEXICO CITY, MONTERREY',
    id: 'Mexico/General',
  },
  {value: '(UTC-06:00) SASKATCHEWAN', id: 'Canada/Saskatchewan'},
  {
    value: '(UTC-05:00) BOGOTA, LIMA, QUITO, RIO BRANCO',
    id: 'America/Bogota',
  },
  {value: '(UTC-05:00) EASTERN TIME (US & CANADA)', id: 'US/Eastern'},
  {value: '(UTC-05:00) INDIANA (EAST)', id: 'US/East-Indiana'},
  {value: '(UTC-04:00) ASUNCION', id: 'America/Asuncion'},
  {value: '(UTC-04:00) ATLANTIC TIME (CANADA)', id: 'Canada/Atlantic'},
  {value: '(UTC-04:00) CARACAS', id: 'America/Caracas'},
  {value: '(UTC-04:00) CUIABA', id: 'America/Cuiaba'},
  {
    value: '(UTC-04:00) GEORGETOWN, LA PAZ, MANAUS, SAN JUAN',
    id: 'America/La_Paz',
  },
  {value: '(UTC-04:00) SANTIAGO', id: 'America/Santiago'},
  {value: '(UTC-03:30) NEWFOUNDLAND', id: 'Canada/Newfoundland'},
  {value: '(UTC-03:00) BRASILIA', id: 'Brazil/East'},
  {value: '(UTC-03:00) BUENOS AIRES', id: 'America/Buenos_Aires'},
  {value: '(UTC-03:00) CAYENNE, FORTALEZA', id: 'America/Fortaleza'},
  {value: '(UTC-03:00) GREENLAND', id: 'America/Godthab'},
  {value: '(UTC-03:00) MONTEVIDEO', id: 'America/Montevideo'},
  {value: '(UTC-03:00) SALVADOR', id: 'America/Bahia'},
  {
    value: '(UTC-02:00) COORDINATED UNIVERSAL TIME-02',
    id: 'Atlantic/South_Georgia',
  },
  {value: '(UTC-02:00) MID-ATLANTIC - OLD', id: 'America/Noronha'},
  {value: '(UTC-01:00) AZORES', id: 'Atlantic/Azores'},
  {value: '(UTC-01:00) CABO VERDE IS.', id: 'Atlantic/Cape_Verde'},
  {value: '(UTC) CASABLANCA', id: 'Africa/Casablanca'},
  {value: '(UTC) DUBLIN, EDINBURGH, LISBON, LONDON', id: 'GMT'},
  {value: '(UTC) MONROVIA, REYKJAVIK', id: 'Greenwich'},
  {
    value: '(UTC+01:00) AMSTERDAM, BERLIN, BERN, ROME, STOCKHOLM, VIENNA',
    id: 'Europe/Amsterdam',
  },
  {
    value: '(UTC+01:00) BELGRADE, BRATISLAVA, BUDAPEST, LJUBLJANA, PRAGUE',
    id: 'Europe/Bratislava',
  },
  {
    value: '(UTC+01:00) BRUSSELS, COPENHAGEN, MADRID, PARIS',
    id: 'Europe/Paris',
  },
  {
    value: '(UTC+01:00) SARAJEVO, SKOPJE, WARSAW, ZAGREB',
    id: 'Europe/Sarajevo',
  },
  {value: '(UTC+01:00) WEST CENTRAL AFRICA', id: 'Africa/Lagos'},
  {value: '(UTC+01:00) WINDHOEK', id: 'Africa/Windhoek'},
  {value: '(UTC+02:00) AMMAN', id: 'Asia/Amman'},
  {value: '(UTC+02:00) ATHENS, BUCHAREST', id: 'Europe/Athens'},
  {value: '(UTC+02:00) BEIRUT', id: 'Asia/Beirut'},
  {value: '(UTC+02:00) CAIRO', id: 'Africa/Cairo'},
  {value: '(UTC+02:00) DAMASCUS', id: 'Asia/Damascus'},
  {value: '(UTC+02:00) E. EUROPE', id: 'Europe/Kaliningrad'},
  {value: '(UTC+02:00) HARARE, PRETORIA', id: 'Africa/Harare'},
  {
    value: '(UTC+02:00) HELSINKI, KYIV, RIGA, SOFIA, TALLINN, VILNIUS',
    id: 'Europe/Helsinki',
  },
  {value: '(UTC+02:00) ISTANBUL', id: 'Asia/Istanbul'},
  {value: '(UTC+02:00) JERUSALEM', id: 'Asia/Jerusalem'},
  {value: '(UTC+02:00) KALININGRAD (RTZ 1)', id: 'Europe/Kaliningrad'},
  {value: '(UTC+02:00) TRIPOLI', id: 'Africa/Tripoli'},
  {value: '(UTC+03:00) BAGHDAD', id: 'Asia/Baghdad'},
  {value: '(UTC+03:00) KUWAIT, RIYADH', id: 'Asia/Kuwait'},
  {value: '(UTC+03:00) MINSK', id: 'Europe/Minsk'},
  {
    value: '(UTC+03:00) MOSCOW, ST. PETERSBURG, VOLGOGRAD (RTZ 2)',
    id: 'Europe/Moscow',
  },
  {value: '(UTC+03:00) NAIROBI', id: 'Africa/Nairobi'},
  {value: '(UTC+03:30) TEHRAN', id: 'Asia/Tehran'},
  {value: '(UTC+04:00) ABU DHABI, MUSCAT', id: 'Asia/Muscat'},
  {value: '(UTC+04:00) BAKU', id: 'Asia/Baku'},
  {value: '(UTC+04:00) IZHEVSK, SAMARA (RTZ 3)', id: 'Europe/Samara'},
  {value: '(UTC+04:00) PORT LOUIS', id: 'Indian/Mauritius'},
  {value: '(UTC+04:00) TBILISI', id: 'Asia/Tbilisi'},
  {value: '(UTC+04:00) YEREVAN', id: 'Asia/Yerevan'},
  {value: '(UTC+04:30) KABUL', id: 'Asia/Kabul'},
  {value: '(UTC+05:00) ASHGABAT, TASHKENT', id: 'Asia/Ashgabat'},
  {value: '(UTC+05:00) EKATERINBURG (RTZ 4)', id: 'Asia/Yekaterinburg'},
  {value: '(UTC+05:00) ISLAMABAD, KARACHI', id: 'Asia/Karachi'},
  {
    value: '(UTC+05:30) CHENNAI, KOLKATA, MUMBAI, NEW DELHI',
    id: 'Asia/Kolkata',
  },
  {value: '(UTC+05:30) SRI JAYAWARDENEPURA', id: 'Asia/Kolkata'},
  {value: '(UTC+05:45) KATHMANDU', id: 'Asia/Katmandu'},
  {value: '(UTC+06:00) DHAKA - ASTANA', id: 'Asia/Dhaka'},
  {value: '(UTC+06:00) NOVOSIBIRSK (RTZ 5)', id: 'Asia/Novosibirsk'},
  {value: '(UTC+06:30) YANGON (RANGOON)', id: 'Asia/Yangon'},
  {value: '(UTC+07:00) BANGKOK, HANOI, JAKARTA', id: 'Asia/Bangkok'},
  {value: '(UTC+07:00) KRASNOYARSK (RTZ 6)', id: 'Asia/Krasnoyarsk'},
  {
    value: '(UTC+08:00) BEIJING, CHONGQING, HONG KONG, URUMQI',
    id: 'Asia/Hong_Kong',
  },
  {value: '(UTC+08:00) IRKUTSK (RTZ 7)', id: 'Asia/Irkutsk'},
  {
    value: '(UTC+08:00) KUALA LUMPUR, SINGAPORE',
    id: 'Asia/Kuala_Lumpur',
  },
  {value: '(UTC+08:00) PERTH', id: 'Australia/Perth'},
  {value: '(UTC+08:00) TAIPEI', id: 'Asia/Taipei'},
  {value: '(UTC+08:00) ULAANBAATAR', id: 'Asia/Ulaanbaatar'},
  {value: '(UTC+09:00) OSAKA, SAPPORO, TOKYO', id: 'Asia/Tokyo'},
  {value: '(UTC+09:00) SEOUL', id: 'Asia/Seoul'},
  {value: '(UTC+09:00) YAKUTSK (RTZ 8)', id: 'Asia/Yakutsk'},
  {value: '(UTC+09:30) ADELAIDE', id: 'Australia/Adelaide'},
  {value: '(UTC+09:30) DARWIN', id: 'Australia/Darwin'},
  {value: '(UTC+10:00) BRISBANE', id: 'Australia/Brisbane'},
  {
    value: '(UTC+10:00) CANBERRA, MELBOURNE, SYDNEY',
    id: 'Australia/Canberra',
  },
  {value: '(UTC+10:00) GUAM, PORT MORESBY', id: 'Pacific/Guam'},
  {value: '(UTC+10:00) HOBART', id: 'Australia/Hobart'},
  {value: '(UTC+10:00) MAGADAN', id: 'Asia/Magadan'},
  {
    value: '(UTC+10:00) VLADIVOSTOK, MAGADAN (RTZ 9)',
    id: 'Asia/Vladivostok',
  },
  {value: '(UTC+11:00) CHOKURDAKH (RTZ 10)', id: 'Antarctica/Macquarie'},
  {
    value: '(UTC+11:00) SOLOMON IS., NEW CALEDONIA',
    id: 'Pacific/Noumea',
  },
  {
    value: '(UTC+12:00) ANADYR, PETROPAVLOVSK-KAMCHATSKY (RTZ 11)',
    id: 'Asia/Anadyr',
  },
  {value: '(UTC+12:00) AUCKLAND, WELLINGTON', id: 'Pacific/Auckland'},
  {
    value: '(UTC+12:00) COORDINATED UNIVERSAL TIME+12',
    id: 'Pacific/Wake',
  },
  {value: '(UTC+12:00) FIJI', id: 'Pacific/Fiji'},
  {
    value: '(UTC+12:00) PETROPAVLOVSK-KAMCHATSKY - OLD',
    id: 'Asia/Kamchatka',
  },
  {value: "(UTC+13:00) NUKU'ALOFA", id: 'Pacific/Tongatapu'},
  // { value: "(UTC+13:00) SAMOA", id: "Pacific/Auckland" },
  {value: '(UTC+14:00) KIRITIMATI ISLAND', id: 'Pacific/Kiritimati'},
];

export const itemsNameFormat = [
  {value: 0, label: i18n.t('Configuration.FnLn1')},
  {value: 1, label: i18n.t('Configuration.FnLn1Ln2')},
  {value: 2, label: i18n.t('Configuration.FnMnLn1Ln2')},
  {value: 3, label: i18n.t('Configuration.FnMnLn1')},
  {value: 4, label: i18n.t('Configuration.Ln1Fn')},
  {value: 5, label: i18n.t('Configuration.Ln1Ln2Fn')},
  {value: 6, label: i18n.t('Configuration.Ln1Ln2FnMn')},
  {value: 7, label: i18n.t('Configuration.Ln1FnMn')},
];

export const itemsEventHour = [
  {value: 0, label: i18n.t('Configuration.timeLocal')},
  {value: 1, label: i18n.t('Configuration.timeEvent')},
];

export const headerAxios = (Token = null) => {
  const header = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (Token !== null) {
    const token = `Bearer ${Token}`;
    return token === undefined ? false : {...header, Authorization: token};
  }
  return header;
};

export const DateTimeWithFormat = (datestring, formatdate, formattime) => {
  return Moment(datestring).format(formatdate + ' ' + formattime);
};

export const DateWithFormat = (datestring, formatdate) => {
  return Moment(datestring).format(formatdate);
};
export const ReturnDayWeek = datestring => {
  const date = Moment(datestring);
  return date.weekday();
};

export const TimeWithFormat = (datestring, formattime) => {
  return Moment(datestring, 'YYYY-MM-DD HH:mm:ss').format(formattime);
};

export const TemperatureWithFormat = (value, format_temperature) => {
  let temperature = 0;
  switch (format_temperature) {
    case 'F':
      temperature = (parseFloat(value) * 9) / 5 + 32;
      break;
    case 'K':
      temperature = parseFloat(value) + 273.15;
      break;
    default:
      temperature = value;
      break;
  }
  return `${temperature} °${format_temperature}`;
};

export const NameWithFormat = (data, format_name) => {
  const formatName = format_name !== undefined ? format_name : 1;
  const {first_name, middle_name, last_name1, last_name2} = data;
  const fName = first_name != null ? first_name : '';
  const mName = middle_name != null ? middle_name : '';
  const lName = last_name1 != null ? last_name1 : '';
  const lName2 = last_name2 != null ? last_name2 : '';
  let name = '';
  switch (formatName) {
    case 0: //FnLn1
      name = `${fName} ${lName}`;
      break;
    case 1: //FnLn1Ln2
      name = `${fName} ${lName} ${lName2}`;
      break;
    case 2: //FnMnLn1Ln2
      name = `${fName} ${mName} ${lName} ${lName2}`;
      break;
    case 3: //FnMnLn1L
      name = `${fName} ${mName} ${lName}`;
      break;
    case 4: //Ln1Fn
      name = `${lName} ${fName} `;
      break;
    case 5: //Ln1Ln2Fn
      name = `${lName} ${lName2} ${fName}`;
      break;
    case 6: //Ln1Ln2FnMn
      name = `${lName} ${lName2} ${fName} ${mName}`;
      break;
    case 7: //Ln1FnMn
      name = `${lName} ${fName} ${mName}`;
      break;
  }
  return name;
};

export const errorHandler = (error, dispatch = null, model) => {
  if (error.response) {
    let codError = String(error.response.data.status);
    let Data = String(error.response.data.data);
    var Message = codError;
    switch (codError) {
      case '401':
        Message = i18n.t('Errors.userError');
        break;
      case 'et472':
        Message = i18n.t('Errors.disabledUser');
        break;
      case 'et473':
        Message = i18n.t('Errors.userBlocked');
        break;
      case 'et401':
        dispatch({
          type: USER_LOGOUT,
        });
        Message = i18n.t('Errors.tokenExpired');
        break;
      case '403':
        Message = i18n.t('PermissionError.403');
        break;
      case '490':
        Message = i18n.t('Errors.invalidPassword');
        break;
      case '110':
        Message = errorHandlingAttributeModel(
          error.response.data.message,
          model,
        );
        break;
      case '400':
        Message = '400';
        break;
      case '480':
        Message = i18n.t('Errors.ENTITY_NOT_FOUND');
        break;
      case '481':
        Message = i18n.t('Errors.ENTITY_DONT_HAVE_CONTRACT');
        break;
      case '482':
        Message = i18n.t('Errors.INVALID_DATE_FOR_PERIOD');
        break;
      case '483':
        Message = i18n.t('Errors.INVALID_DATE_IN');
        break;
      case '484':
        Message = i18n.t('Errors.INVALID_DATE_ENTITY_HAVE_PERMISSION');
        break;
      case '485':
        Message = i18n.t('Errors.INVALID_DATE_ENTITY_HAVE_SCHEDULE');
        break;
      case '493':
        Message = i18n.t('Errors.notDeletedEntity');
        break;
      case '747':
        Message = i18n.t('Errors.personExistPhoto');
        break;
      case '748':
        Message = i18n.t('Errors.personPhotoNotBelongTo');
        break;
      case '746':
        Message = i18n.t('Errors.personPhotoThereAreNoFaces');
        break;
      case '745':
        Message = i18n.t('Errors.personPhotoMoreThanOneElementExits');
        break;
      default:
        Message = 'Error: ' + codError;
        break;
    }
  } else if (error.request) {
    if (error.request.status === 0) {
      Message = i18n.t('Error.serverDown');
    } else {
      Message = 'The message';
    }
  } else {
    Message = 'error';
  }
  alertOK({
    title: i18n.t('Common.errorTitle'),
    message: Message,
  });
};

const errorHandlingAttributeModel = (messages, model) => {
  let msg = '';
  messages.map(error => {
    Object.keys(error).forEach(function (code) {
      const value = error[code];
      msg += `${i18n.t(`${model}.${code}`)}: ${i18n.t(
        `FormErrors.${value}`,
      )} \n`;
    });
  });
  return msg;
};

export const filterItemSync = (query, items) => {
  return items.filter(el => {
    return el.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
};
export const filterItemSyncValue = (query, items) => {
  return items.filter(el => {
    return el.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
};

export const alertOK = ({title, message, cancel = true}) => {
  Alert.alert(
    title,
    message,
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    {cancelable: cancel},
  );
};

export const setDateUTC = (config, date, eventTimezonePg) => {
  const {timeEvents, timeZones} = config;
  var dateUtc = Moment.tz(date, 'UTC');
  dateUtc.tz(timeEvents == 0 ? timeZones : eventTimezonePg);
  return dateUtc;
};

export const formatDateTime = (
  config,
  format = null,
  date = null,
  type = 'date',
  second = false,
) => {
  const typeFormat = `${type}Format`;
  if (format === null) {
    format = config[typeFormat];
  }
  if (type === 'time') {
    const formatTime = config.timeFormat;
    if (date === null) {
      return Moment().format(format);
    } else {
      if (date.length == 8) {
        return Moment(date, 'HH:mm:ss').format(formatTime);
      }
      if (date.length == 5) {
        return Moment(date, 'HH:mm').format(formatTime);
      }
      if (second && format == 'hh:mm a')
        return Moment(date, 'HH:mm:ss').format('hh:mm:ss a');
      else if (second && format == 'HH:mm')
        return Moment(date, 'HH:mm:ss').format('HH:mm:ss');

      return Moment(date, 'HH:mm:ss').format(format);
    }
  }
  return date === null ? Moment().format(format) : Moment(date).format(format);
};

export const setDateUTCUser = (config, date) => {
  const {timeZones} = config;
  var dateUtc = Moment.tz(date, 'UTC');
  dateUtc.tz(timeZones);
  return dateUtc;
};

export const isValidURL = url => {
  var RegExp =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  if (RegExp.test(url)) return true;
  else return false;
};

export const getItem = (data, index) => {
  return {
    poss: index,
    ...data[index],
  };
};

export const handleOpenLink = async url => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};
export const getDateNameMonth = (date, separator, orientation) => {
  // {
  //     years: 2015
  //     months: 6
  //     date: 26,
  //     hours: 1,
  //     minutes: 53,
  //     seconds: 14,
  //     milliseconds: 600
  // }
  const DateComplete = date.length > 10 ? date : date + ' 00:00:01';
  const d = Moment(DateComplete, 'YYYY-MM-DD HH:mm:ss').toObject();
  if (orientation == 'v')
    return `${d.date}\n${i18n.t('General.monthsAbv.' + d.months)}\n${d.years}`;
  else
    return `${d.date}${separator}${i18n.t(
      'General.monthsAbv.' + d.months,
    )}${separator}${d.years}`;
};
export const getDateDay = date => {
  const DateComplete = date.length > 10 ? date : date + ' 00:00:01';
  const d = Moment(DateComplete, 'YYYY-MM-DD HH:mm:ss');
  return `${d.format('D')}`;
};
export const getDateDayNameMonth = (date, separator, orientation) => {
  const DateComplete = date.length > 10 ? date : date + ' 00:00:01';
  const d = Moment(DateComplete, 'YYYY-MM-DD HH:mm:ss').toObject();
  if (orientation == 'v')
    return `${d.date}\n${i18n.t('General.monthsAbv.' + d.months)}`;
  else return `${d.date}${separator}${i18n.t('General.monthsAbv.' + d.months)}`;
};

export const calcdiffHours = (o, t) => {
  const f1 = Moment(o, 'YYYY-MM-DD HH:mm:ss');
  const f2 = Moment(t, 'YYYY-MM-DD HH:mm:ss');
  const diff = f2.diff(f1, 'hours', true);
  return diff;
};

export const setStatusPermission = status_id => {
  let sid = Number(status_id);
  switch (sid) {
    case 1:
      return 'level1';
    case 2:
      return 'level2';
    case 3:
      return 'level3';
    case 4:
      return 'level4';
    case 5:
      return 'level5';
    case 6:
      return 'level6';
    default:
      return 'NOTFOUND';
      break;
  }
};

export const typePermissionsItems = [
  {value: 1, label: i18n.t('Permission.type_parcial').toUpperCase()},
  {value: 2, label: i18n.t('Permission.type_daily').toUpperCase()},
];

export const requestReadStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'MyIntelli',
        message: 'Por favor, concede el permiso',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use READ_EXTERNAL_STORAGE');
    } else {
      console.log('location permission denied');
      alert('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const callCellPhone = phoneNumber => {
  Linking.openURL(`tel:${phoneNumber}`);
};
export const openMailTo = email => {
  Linking.openURL(`mailto:${email}`);
};
export const openCoordinates = (lat, lng) => {
  Linking.openURL(
    `https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${lng}`,
  );
};

const directoryIcons = '../assets/icons/';
const Icons = {
  faceid: require(directoryIcons + 'faceid.png'),
  faceid_active: require(directoryIcons + 'faceid_active.png'),
  faceid_check: require(directoryIcons + 'faceid_check.png'),
  co: require(directoryIcons + 'co.png'),
  ve: require(directoryIcons + 've.png'),
  us: require(directoryIcons + 'us.png'),
};
export const getIcons = e => Icons[e];

export const invalidDateIn = type => {
  switch (type) {
    case 1:
      return i18n.t('FormErrors.dateOutBeforeDateIn');
    case 2:
      return i18n.t('FormErrors.dateInBeforeNow');
    case 3:
      return i18n.t('FormErrors.dateVistBeforeNow');
    case 4:
      return i18n.t('FormErrors.hourVistBeforeNow');
    case 5:
      return i18n.t('FormErrors.datesOutOfInitialRange');
  }
};

export const Capitalize = (str, low) => {
  if (low == 'normal') return str;

  str = _.toLower(str);
  switch (low) {
    case 'ucfirst':
      return _.upperFirst(str);
    case 'lower':
      return str;
    case 'uppercase':
      return _.upperCase(str);
    case 'capitalize':
      return _.capitalize(str);
    default:
      return _.upperFirst(str);
  }
};

export const countrys = [
  {
    id: 1,
    icon: 'co',
    email: 'soporte@intelli-next.com',
    cellphone: '+57 (1) 695 6100',
    address: 'Carrera 11 # 94 - 02, Oficina 109, Bogotá 110221.',
    coordinates: {
      lat: 4.6768278,
      lng: -74.0462038,
    },
  },
  {
    id: 2,
    icon: 'us',
    email: 'soporte@intelli-next.com',
    cellphone: '+1 (305) 456 9220',
    address: '1550 Brickell Avenue # B213, Miami, Florida 33129.',
    coordinates: {
      lat: 25.757107,
      lng: -80.194764,
    },
  },
  {
    id: 3,
    icon: 've',
    email: 'soporte@intelli-next.com',
    cellphone: '+58 (243) 248 0373',
    address:
      'Av. 19 de Abril, Torre Cosmopolitan, Piso 12 Oficina 124, Maracay 2101.',
    coordinates: {
      lat: 10.2536158,
      lng: -67.5999487,
    },
  },
];

export const setNumberFormat = (numberFormat, value) => {
  if (!value) {
    return 0;
  }
  if (numberFormat == '999.99') {
    return value;
  } else {
    return value.toString().replace('.', ',');
  }
};

export const getBackground = (status) => {
  if(status > 4)
      return '#9B9B9B';
  switch (status) {
      case 1:
          return COLORS.IN;
      case 2:
          return COLORS.OUT;
      default:
          return COLORS.PRIMARY;
  }
}

export const capitalize =(word)  => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}