// import {
//   swaggerSchemaArr,
//   swaggerSchemaExample,
// } from '../../../src/common/utils/swagger.util';

export const USER_CONST = {
  MODEL_NAME: 'user',
  MODEL_PROVIDER: 'USER_MODEL',
};

export const ADMIN_DEFAULT = [];

export const USER_DEFAULT_PROFILE_IMG = {
  URL: '/public/images/avatar-default.jpg',
};

export const EXCEPTION_USER = {
  USER_NOT_FOUND: {
    message: 'USER NOT FOUND',
    code: 'user001',
  },
  USER_EXISTED: {
    message: 'USER EXISTED',
    code: 'user002',
  },
  EMAIL_EXISTED: {
    message: 'EMAIL EXISTED',
    code: 'user003',
  },
  UID_EXISTED: {
    message: 'UID EXISTED',
    code: 'user004',
  },
  PASSWORD_DOES_NOT_MATCH: {
    message: 'PASSWORD DOES NOT MATCH',
    code: 'user005',
  },
  NEW_PASSWORD_AND_OLD_PASSWORD_ARE_THE_SAME: {
    message: 'NEW PASSWORD AND OLD PASSWORD ARE THE SAME',
    code: 'user006',
  },
  NEW_USERNAME_AND_OLD_USERNAME_ARE_THE_SAME: {
    message: 'NEW USERNAME AND OLD USERNAME ARE THE SAME',
    code: 'user007',
  },
  USERNAME_EXISTED: {
    message: 'USERNAME EXISTED',
    code: 'user008',
  },
};

// export const USER_SWAGGER_RESPONSE = {
//   CREATE_SUCCESS: swaggerSchemaExample({
//     example: {
//       createdByUserId: '1',
//       lastModifiedByUserId: '1',
//       uid: 's03',
//       email: 'user02@gmail.com',
//       password: '$2a$10$8Zgcdj13OJplkUt7Nwzyk.gfHvP5Ib13vZo2whzThO2ab3w.D9aeG',
//       type: 'customer',
//       firstName: 'Nguyen',
//       lastName: 'vananh',
//       phoneNumber: '+84123456',
//       address: '391 Đ. Trường Chinh, Ngã Tư Sở, Đống Đa, Hà Nội',
//       deleted_at: null,
//       profile_img: '/public/images/avatar-default.jpg',
//       id: 3,
//       created_at: '2023-03-19T11:57:14.324Z',
//       updated_at: '2023-03-19T11:57:14.324Z',
//       isSuperAdmin: false,
//       isActive: true,
//     },
//     description: 'Create success',
//   }),
//   UPDATE_SUCCESS: swaggerSchemaExample({
//     example: {
//       success: true,
//     },
//     description: 'Update success',
//   }),
//   CREATE_MULTIPLE_SUCCESS: swaggerSchemaExample({
//     example: {
//       totalSuccess: 1,
//       totalError: 0,
//     },
//     description: 'Create success',
//   }),
//   GET_USER_SUCCESS: swaggerSchemaExample({
//     example: {
//       id: 2,
//       created_at: '2023-03-18T12:10:56.356Z',
//       updated_at: '2023-03-18T12:10:56.356Z',
//       deleted_at: null,
//       createdByUserId: '1',
//       lastModifiedByUserId: '1',
//       uid: 's02',
//       email: 'user01@gmail.com',
//       type: 'customer',
//       firstName: 'Nguyen',
//       lastName: 'vananh',
//       phoneNumber: '+84123456',
//       address: '391 Đ. Trường Chinh, Ngã Tư Sở, Đống Đa, Hà Nội',
//       profile_img: '/public/images/avatar-default.jpg',
//       isSuperAdmin: false,
//       isActive: true,
//       roles: [
//         {
//           id: 3,
//           created_at: '2023-03-18T11:33:04.609Z',
//           updated_at: '2023-03-18T11:33:04.609Z',
//           deleted_at: null,
//           createdByUserId: '1',
//           lastModifiedByUserId: '1',
//           name: 'Sub_Admin',
//           code: 'code123',
//           permissions: [
//             {
//               id: 31,
//               created_at: '2023-03-19T04:24:35.355Z',
//               updated_at: '2023-03-19T04:24:35.355Z',
//               deleted_at: null,
//               createdByUserId: null,
//               lastModifiedByUserId: null,
//               name: 'READ_USER',
//               code: '812748c4-0d20-4ddb-8271-50021a3c6155',
//             },
//             {
//               id: 32,
//               created_at: '2023-03-19T04:24:35.356Z',
//               updated_at: '2023-03-19T04:24:35.356Z',
//               deleted_at: null,
//               createdByUserId: null,
//               lastModifiedByUserId: null,
//               name: 'UPDATE_PERMISSION',
//               code: 'c5b365bb-2de6-4b3b-a180-2c35425bedf2',
//             },
//             {
//               id: 33,
//               created_at: '2023-03-19T04:24:35.357Z',
//               updated_at: '2023-03-19T04:24:35.357Z',
//               deleted_at: null,
//               createdByUserId: null,
//               lastModifiedByUserId: null,
//               name: 'DELETE_PERMISSION',
//               code: 'b3105e5b-640a-4cf1-9570-8a9781989f17',
//             },
//             {
//               id: 38,
//               created_at: '2023-03-19T04:24:35.369Z',
//               updated_at: '2023-03-19T04:24:35.369Z',
//               deleted_at: null,
//               createdByUserId: null,
//               lastModifiedByUserId: null,
//               name: 'CREATE_PRODUCT',
//               code: 'added6f4-a324-481f-9ee7-cfd23b07d19f',
//             },
//             {
//               id: 46,
//               created_at: '2023-03-19T04:24:35.422Z',
//               updated_at: '2023-03-19T04:24:35.422Z',
//               deleted_at: null,
//               createdByUserId: null,
//               lastModifiedByUserId: null,
//               name: 'UPDATE_VOUCHER',
//               code: '85c8494e-e3da-4f05-ae80-93debd816fb8',
//             },
//             {
//               id: 47,
//               created_at: '2023-03-19T04:24:35.424Z',
//               updated_at: '2023-03-19T04:24:35.424Z',
//               deleted_at: null,
//               createdByUserId: null,
//               lastModifiedByUserId: null,
//               name: 'READ_PERMISSION',
//               code: 'f42df1c3-cf73-497b-89d4-e307c1da54e4',
//             },
//             {
//               id: 48,
//               created_at: '2023-03-19T04:24:35.437Z',
//               updated_at: '2023-03-19T04:24:35.437Z',
//               deleted_at: null,
//               createdByUserId: null,
//               lastModifiedByUserId: null,
//               name: 'DELETE_VOUCHER',
//               code: '0838255d-3369-4b6f-914f-c95227d18548',
//             },
//             {
//               id: 49,
//               created_at: '2023-03-19T04:24:35.446Z',
//               updated_at: '2023-03-19T04:24:35.446Z',
//               deleted_at: null,
//               createdByUserId: null,
//               lastModifiedByUserId: null,
//               name: 'READ_CATEGORY',
//               code: '0f704fa2-7dde-4d0d-8dc7-adb2e9a840e7',
//             },
//           ],
//         },
//       ],
//     },
//     description: 'get user success',
//   }),
//   NOT_FOUND_EXCEPTION: swaggerSchemaExample({
//     example: {
//       message: 'not found exception',
//       code: 'us00001',
//       statusCode: 404,
//     },
//     description: 'not found exception',
//   }),
//   BAD_REQUEST_CONFIRM_PASSWORD: swaggerSchemaExample({
//     example: {
//       message: 'Confirm password is not match new password ',
//       code: 'us00006',
//       statusCode: 400,
//     },
//     description: 'bad request',
//   }),
//   BAD_REQUEST_WRONG_PASSWORD: swaggerSchemaExample({
//     example: {
//       message: 'Password does not match',
//       code: 'us00005',
//       statusCode: 400,
//     },
//     description: 'bad request',
//   }),
//   BAD_REQUEST_USER_EXISTED: swaggerSchemaExample({
//     example: {
//       message: 'User existed',
//       code: 'us00004',
//       statusCode: 400,
//     },
//     description: 'bad request',
//   }),
//   DELETE_SUCCESS: swaggerSchemaExample({
//     example: {
//       data: {
//         success: true,
//       },
//     },
//     description: 'Delete success',
//   }),
//   GET_LIST_SUCCESS: swaggerSchemaArr({
//     swaggerSchemaExample: [
//       {
//         id: 1,
//         created_at: '2023-03-18T06:48:32.126Z',
//         updated_at: '2023-03-18T06:48:32.126Z',
//         deleted_at: null,
//         createdByUserId: null,
//         lastModifiedByUserId: null,
//         uid: 's01',
//         email: 'admin@gmail.com',
//         type: 'admin',
//         firstName: null,
//         lastName: null,
//         phoneNumber: '',
//         address: '',
//         profile_img: '/public/images/avatar-default.jpg',
//         isSuperAdmin: true,
//         isActive: true,
//       },
//       {
//         id: 2,
//         created_at: '2023-03-18T12:10:56.356Z',
//         updated_at: '2023-03-18T12:10:56.356Z',
//         deleted_at: null,
//         createdByUserId: '1',
//         lastModifiedByUserId: '1',
//         uid: 's02',
//         email: 'user01@gmail.com',
//         type: 'customer',
//         firstName: 'Nguyen',
//         lastName: 'vananh',
//         phoneNumber: '+84123456',
//         address: '391 Đ. Trường Chinh, Ngã Tư Sở, Đống Đa, Hà Nội',
//         profile_img: '/public/images/avatar-default.jpg',
//         isSuperAdmin: false,
//         isActive: true,
//       },
//     ],
//     page: 1,
//     pageSize: 20,
//     totalPage: 1,
//     totalItem: 2,
//   }),
//   BAD_REQUEST_EXCEPTION: swaggerSchemaExample({
//     example: {
//       message: 'bad exception',
//       code: 'sys00001',
//       statusCode: 400,
//     },
//     description: 'bad request exception',
//   }),
// };
