import _ from "lodash";
import React, { useEffect } from 'react';
import { View, StyleSheet, BackHandler, Text, VirtualizedList } from 'react-native';
import { useTranslation } from "react-i18next";

import { BasePageChildren, IconMyIntelli, ItemText } from '../components';
import { COLORS } from '../../settings/theme';
import { Divider } from "react-native-paper";
import { formatDateTime, NameWithFormat, setDateUTC } from "../../settings/utils";
import { connect } from "react-redux";

const styles = {
    user: {
        borderWidth: 1, 
        borderStyle: 'solid', 
        marginVertical: 5,
        borderColor: '#88c965'
    }
    // borderWid
}


const notifications = [
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4401,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-15 23:52:32',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-15 23:52:32.436051',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ]
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4400,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-15 23:41:31',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-15 23:41:31.54017',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ]
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4396,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-15 20:13:42',
        timezone_pg: 'US/Mountain',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-15 20:13:42.388105',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4394,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-15 20:13:12',
        timezone_pg: 'Canada/Saskatchewan',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-15 20:13:12.40186',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4263,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 18:25:37',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 18:25:37.315413',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4262,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 18:25:07',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 18:25:07.377908',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4261,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 18:00:03',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 18:00:03.696747',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4259,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 06:37:34',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 06:37:34.639659',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4258,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 06:27:57',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 06:27:57.577553',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4257,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 06:03:46',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 06:03:46.063627',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4244,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-04 00:28:57',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-04 00:28:57.733664',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4243,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-03 22:29:25',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-03 22:29:25.184033',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4209,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-31 22:35:36',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-31 22:35:36.365801',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4207,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-31 20:10:52',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-31 20:10:52.662142',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4206,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-31 20:10:10',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-31 20:10:10.75752',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4205,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-31 20:07:48',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-31 20:07:48.879639',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4165,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-29 00:21:03',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-29 00:21:03.823523',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4099,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-24 22:19:06',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-24 22:19:06.629437',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4082,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-24 14:26:58',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-24 14:26:58.359778',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4064,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-21 20:58:18',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-21 20:58:18.436744',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4059,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-20 21:29:00',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-20 21:29:00.703139',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4058,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-20 21:08:33',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-20 21:08:33.644086',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4396,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-15 20:13:42',
        timezone_pg: 'US/Mountain',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-15 20:13:42.388105',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4394,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-15 20:13:12',
        timezone_pg: 'Canada/Saskatchewan',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-15 20:13:12.40186',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4263,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 18:25:37',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 18:25:37.315413',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4262,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 18:25:07',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 18:25:07.377908',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4261,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 18:00:03',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 18:00:03.696747',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4259,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 06:37:34',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 06:37:34.639659',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4258,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 06:27:57',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 06:27:57.577553',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4257,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-05 06:03:46',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-05 06:03:46.063627',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4244,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-04 00:28:57',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-04 00:28:57.733664',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4243,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-06-03 22:29:25',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-06-03 22:29:25.184033',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4209,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-31 22:35:36',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-31 22:35:36.365801',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4207,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-31 20:10:52',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-31 20:10:52.662142',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4206,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-31 20:10:10',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-31 20:10:10.75752',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4205,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-31 20:07:48',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-31 20:07:48.879639',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4165,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-29 00:21:03',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-29 00:21:03.823523',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4099,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-24 22:19:06',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-24 22:19:06.629437',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4082,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-24 14:26:58',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-24 14:26:58.359778',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4064,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-21 20:58:18',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-21 20:58:18.436744',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4059,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-20 21:29:00',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-20 21:29:00.703139',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      },
      {
        id_event_type: 18,
        id_user: 8,
        id_event_task: 13,
        id_event_alert: 4058,
        id_structure: null,
        id_device: null,
        triggered_at: '2021-05-20 21:08:33',
        timezone_pg: 'America/Bogota',
        payload: {
          ips: {
            ip_external: '190.84.117.196'
          },
          event: 'EDIT USER',
          id_user: 8,
          metaData: {
            settings_user: ''
          },
          operation: 3,
          user_name: 'WILBER'
        },
        access_type_timelog: null,
        id_verification_mode: null,
        at_created: '2021-05-20 21:08:33.644086',
        id_vehicle: null,
        verification_result_timelog: null,
        temperature: '0.00',
        device_name: null,
        structure: null,
        structure_father: null,
        id_entity_type: null,
        id_entity: null,
        id_person: null,
        dui_person: null,
        first_name: null,
        middle_name: null,
        last_name1: null,
        last_name2: null,
        photo: null,
        gender: null,
        id_document_type: null,
        is_blacklist: null,
        settings_person: null,
        vehicle_plate: null,
        serial: null,
        brand: null,
        model: null,
        color: null,
        id_vehicle_type: null,
        details: null,
        user_generator: 'WILBER',
        event_type: 'CREATE_UPDATE_USER',
        blacklist: [],
        actions: [
          {
            id_event_task_action: 15,
            id_event_task: 13,
            id_event_action: 11,
            id_report_template: null,
            id_execute_type: null,
            repetitions: null,
            recurrence: null,
            hour_action: '00:00:00',
            settings_action: {
              notificationType: 1,
              meta_action_event: '',
              id_action_event_type: 1,
              sub_meta_action_event: ''
            },
            dow: [],
            entities: [],
            parameters: [],
            status: 1,
            id_module: null,
            phones: [],
            emails: [],
            time_delay: null,
            vehicles: [],
            vehicle_type: null,
            plate: null,
            users: [],
            access_scheduled: [],
            access_roles: [],
            work_stations: [],
            devices: [],
            structures: [],
            execute_hour: null,
            time_hour: null,
            content_text: null,
            module: 'NOTIFICATIONS',
            entities_groups: [],
            devices_groups: [],
            vehicles_groups: [],
            based_on_event: 0,
            id_text_template: -1
          }
        ],
        event_task: {
          id_event_task: 13,
          event_name: 'MONITORING USER 8'
        }
      }
];

const getItem = (data, index) => {
    return {
        ...data[index]
    };
};


const Notifications = ({ navigation, auth, config, eventsTypes }) => {

    const { t } = useTranslation();

    const newNotifications = _.uniqBy(notifications, "id_event_alert");

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

    const Back = () => {
        navigation.goBack();
    }

    const DateComponent = ({ dateTime, timeZone }) => {
        const datetime = setDateUTC(
            config,
            dateTime,
            timeZone
        );
        return `${formatDateTime(config, null, datetime)} ${formatDateTime(config, null, datetime, "time")}`;
    };

    const ChildNotifications = ({icon, title, style, user, DateTime, otherData}) => {

        return(
            <View style={{...style, flexDirection: 'row', padding: 8 }}>
                <View style={{justifyContent: 'center'}}>
                    <IconMyIntelli
                        icon={icon}
                        size={40}
                        color={style.borderColor}
                    />
                </View>
                <View style={{ marginLeft: 8}}>
                    <ItemText
                      title={`${t(`Notifications.type`)}:`}
                      description={title}
                      />
                    <ItemText
                      title={`${t(`Notifications.NAproval`)}:`}
                      description={title}
                      />
                    <ItemText
                      title={`${t(`General.date`)}:`}
                      description={<DateTime dateTime={otherData.triggered_at}  timeZone={otherData.timezone_pg} />}
                      />
                    {(user) && (
                      <ItemText
                        title={`User:`}
                        description={user}
                        />
                    )}
                </View>
            </View>
        )
    }

    const ItemNotifications = ({notification}) => {

        const {
            triggered_at,
            timezone_pg,
            id_event_type,
            id_entity_type,
            payload,
            first_name,
            middle_name,
            last_name1,
            last_name2,
            id_person,
            id_vehicle,
            vehicle_plate,
            structure,
            device_name,
            id_event_alert,
            verification_result_timelog,
        } = notification;
        
        const eventTypes = eventsTypes.data.results.find(
            (i) => i.id_event_type == id_event_type
        );
        if (eventTypes === undefined) return null;
        let ope = 2;
        let meta = [];
        let title = "";
        let label = "";
        if (id_person == null && id_vehicle && id_event_type == 2) {
            title = t("Vehicle.vehicle_plate");
            label = vehicle_plate;
        } else if (id_person != null && id_event_type == 2) {
            const data = { first_name, middle_name, last_name1, last_name2 };
            title = t("User.name");
            label = NameWithFormat(data, config.nameFormat);
        } else if (id_event_type == 18) {
            const { operation, metaData } = payload;
            meta = metaData;
            ope = operation;
            title = t(`EventTask.createOrUpdateUser.${ope}`);
            // label = operation== 2? metaData :
        }

        

        let state = "";
        let event = "access";
        let eventType = eventTypes.event_type;
        switch (eventType) {
            case "TIMELOG_TA_NOT_VERIFIED":
            case "TIMELOG_AC_NOT_VERIFIED":
            case "TIMELOG_AC_ACCEPTED":
            case "TIMELOG_TA_ACCEPTED":
              const result = verification_result_timelog;
              state =
                result === 1 ? "verified" : result === 0 ? "notVerified" : "disabled";
              event = "access";
              break;
            case "CREATE_UPDATE_USER":
              state = "user";
              event = "access";
              break;
        
            default:
              break;
        }

        switch (eventTypes.event_type) {
            case "TIMELOG_TA_NOT_VERIFIED":
            case "TIMELOG_AC_NOT_VERIFIED":
                return (
                    <Text>TIMELOG_AC_NOT_VERIFIED</Text>
                    // <div
                    //     key={id_event_alert}
                    //     className={"alerts alerts_timelog_notVerified"}
                    //     onClick={() => onClick()}
                    //     >
                    //     <div className="alerts_icon">
                    //         <i className={`intelli_${"access"} fa-2x`} />
                    //     </div>
                
                    //     <div className="alerts_data">
                    //         <GetEventNameTraduced eventTypes={eventTypes} />
                    //         <div className="alerts_data_info">{notification.device_name}</div>
                    //         <DateComponent auth={auth} />
                    //     </div>
                    // </div>
                );
        
            case "USER_LOGIN":
                return (
                    <Text>USER_LOGIN</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_user"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">
                    //     {notification.payload.user_name}
                    //     </div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "ACTION_SCHEDULED":
                return (
                    <Text>ACTION_SCHEDULED</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_scheduled"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info"></div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "REMOVE_FROM_BLACKLIST":
                return (
                    <Text>REMOVE_FROM_BLACKLIST</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_from_blacklist"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">{getName(notification)}</div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "ADD_TO_BLACKLIST":
                return (
                    <Text>ADD_TO_BLACKLIST</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_add_blacklist"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">{getName(notification)}</div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "TIMELOG_TA_ACCEPTED":
            case "TIMELOG_AC_ACCEPTED":
                return (
                    <Text>TIMELOG_AC_ACCEPTED</Text>
                    // <div
                    // onClick={() => onClick()}
                    // className={`alerts alerts_timelog_${state}`}
                    // key={id_event_alert}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={`intelli_${event} fa-2x`} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     {/* {verification_result_timelog != 0 ? (
                    //                     <div className='alerts_data_info'>
                                            
                    //                         <div> {title}: </div>
                    //                         <div className='intelliTruncate_notification'> {label} </div>
                    //                     </div>
                    //                 ) : null}
                    //                 {device_name != null ? (
                    //                     <div className='alerts_data_info'>
                    //                         {' '}
                    //                         <div> {t('EventTask.device')}:</div>{' '}
                    //                         <div className='intelliTruncate_notification'> {device_name} </div>{' '}
                    //                     </div>
                    //                 ) : null}
                    //                 {structure != null ? (
                    //                     <div className='alerts_data_info'>
                    //                         {' '}
                    //                         <div>{t('Device.location')}:</div>{' '}
                    //                         <div className='intelliTruncate_notification'> {structure} </div>{' '}
                    //                     </div>
                    //                 ) : null} */}
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">{getName(notification)}</div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "CREATE_UPDATE_USER":
                return (
                    // <Text>CREATE_UPDATE_USER</Text>
                    <ChildNotifications 
                        title={title} 
                        icon={`user-${ope == 2 ? "plus" : "edit"}`} 
                        style={styles[state]} 
                        user={ope == 2 && notification.payload.metaData.user}
                        DateTime={DateComponent}
                        otherData={notification}
                        />
                    // <div
                    // onClick={() => onClick()}
                    // className={`alerts alerts_${state.toLowerCase()}`}
                    // key={id_event_alert}
                    // >
                    // <div className="alerts_icon">
                    //     <i
                    //     className={`fas fa-user-${ope == 2 ? "plus" : "edit"} fa-2x`}
                    //     ></i>
                    // </div>
            
                    // <div className="alerts_data">
                    //     {<div className="alerts_data_event"> {title} </div>}
                    //     {ope == 2 ? (
                    //     <div>{notification.payload.metaData.user}</div>
                    //     ) : (
                    //     <div className="alerts_data_info">
                    //         <div> {t("Events.changes")}:</div>
                    //         <div className="intelliTruncate_default">
                    //         {Object.keys(meta).length}
                    //         </div>
                    //     </div>
                    //     )}
                    //     {/* { <div className='alerts_data_info' > <div>{t('Events.userEjecutor')}:</div> <div className='intelliTruncate' >  {item.user_generator} </div> </div> }  */}
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "PASSWORD_CHANGE":
                return (
                    <Text>PASSWORD_CHANGE</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_password_change"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">
                    //     {notification.payload.user_name}
                    //     </div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "VISIT_NEW_SCHEDULED":
                return (
                    <Text>VISIT_NEW_SCHEDULED</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_visit_scheduled"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">{getName(notification)}</div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "VISIT_CLOSED":
                return (
                    <Text>VISIT_CLOSED</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_visit_closed"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">{getName(notification)}</div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "ACCESS_SCHEDULED":
                return (
                    <Text>ACCESS_SCHEDULED</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_access_scheduled"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">
                    //     {notification.payload.access_scheduled}
                    //     </div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "VISIT_NEW":
                return (
                    <Text>VISIT_NEW</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_visit_new"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">
                    //     {getName(notification.payload.visitant)}
                    //     </div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "VISIT_CHANGE_STATUS_SCHEDULED":
                return (
                    <Text>VISIT_CHANGE_STATUS_SCHEDULED</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_visit_new"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">{getName(notification)}</div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "BATTERY_STATUS_CHANGE":
                // let batteryIcon =
                //     notification.payload.battery_state === "OK"
                //     ? "fas fa-battery-full"
                //     : notification.payload.battery_state === "LOW"
                //     ? "fas fa-battery-quarter"
                //     : notification.payload.battery_state === "FLAT"
                //     ? "fas fa-battery-empty"
                //     : "";
                // let batteryTitle =
                //     notification.payload.battery_state === "OK"
                //     ? t("Events.batteryOk")
                //     : notification.payload.battery_state === "LOW"
                //     ? t("Events.batteryLow")
                //     : notification.payload.battery_state === "FLAT"
                //     ? t("Events.batteryFlat")
                //     : "";
                return (
                    <Text>BATTERY_STATUS_CHANGE</Text>
                    // <div
                    // key={id_event_alert}
                    // className={`alerts alerts_battery_change_${notification.payload.battery_state.toLowerCase()}`}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={batteryIcon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">
                    //     {batteryTitle.toUpperCase() + " " + notification.device_name}
                    //     </div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "USER_BLOCKED":
                return (
                    <Text>USER_BLOCKED</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_user_blocked"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">
                    //     {notification.payload.user_name}
                    //     </div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "USER_CREATION":
                return (
                    <Text>USER_CREATION</Text>
                    // <div
                    // key={id_event_alert}
                    // className={"alerts alerts_user_blocked"}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">
                    //     {notification.payload.user_name}
                    //     </div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            case "CONNECTION_CHANGE":
                return (
                    <Text>CONNECTION_CHANGE</Text>
                    // <div
                    // key={id_event_alert}
                    // className={`alerts alerts_connection_change_${
                    //     notification.payload.online === 1 ? "online" : "offline"
                    // }`}
                    // onClick={() => onClick()}
                    // >
                    // <div className="alerts_icon">
                    //     <i className={eventTypes.icon + " fa-2x"} />
                    // </div>
            
                    // <div className="alerts_data">
                    //     <GetEventNameTraduced eventTypes={eventTypes} />
                    //     <div className="alerts_data_info">
                    //     {notification.payload.online === 1
                    //         ? t("Events.connectionChange.online").toUpperCase()
                    //         : t("Events.connectionChange.offline").toUpperCase()}{" "}
                    //     {" " + notification.device_name}
                    //     </div>
                    //     <DateComponent auth={auth} />
                    // </div>
                    // </div>
                );
        
            default:
              return <Text>CONNECTION_CHANGE</Text>;
        }
            
        
    }

    return (
        <BasePageChildren
            title={t(`Common.notifications`)}
            navigation={navigation}
            >
            <VirtualizedList
                data={newNotifications}
                initialNumToRender={4}
                renderItem={({item}) => (
                    <ItemNotifications notification={item} config/>
                )}
                getItemCount={() => newNotifications.length}
                keyExtractor={item => item.id_event_alert}
                getItem={getItem}
                ItemSeparatorComponent={() => <Divider />}
            />
        </BasePageChildren>
    )
}


const mapStateToProps = ({ auth, config, eventsTypes }) => {
    return {
        auth,
        config,
        eventsTypes
    };
};

export default connect(mapStateToProps)(Notifications);
