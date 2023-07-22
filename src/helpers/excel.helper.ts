// import * as XLSX from 'xlsx';

// // generateJsonFromExcel
// export const  generateJsonFromExcel = () => {
//     const filePath = './src/assets/csv/data/excel.xlsx';

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//     // Convert the JSON data to the desired format
//     const nestedJsonData = convertToNestedJson(jsonData);

//     return nestedJsonData;
//   }
// function convertToNestedJson(data) {
//     const result:any = [];
//     const headers = data[0];

//     for (let i = 1; i < data.length; i++) {
//       const row = data[i];
//       const item = {};

//       for (let j = 0; j < headers.length; j++) {
//         const header = headers[j];
//         const value = row[j];

//         if (header.includes('.')) {
//           const keys = header.split('.');
//           let nestedObj = item;

//           for (let k = 0; k < keys.length - 1; k++) {
//             const key = keys[k];
//             nestedObj[key] = nestedObj[key] || {};
//             nestedObj = nestedObj[key];
//           }

//           nestedObj[keys[keys.length - 1]] = value;
//         } else {
//           item[header] = value;
//         }
//       }

//       result.push(item);
//     }
//     return convertToNestedJsonDeeper(result)
//   }

// function convertToNestedJsonDeeper(data) {
//     const result:any = [];

//     for (let i = 0; i < data.length; i++) {
//       const item = {
//         question: data[i].question,
//         explain: data[i].explain,
//         note: data[i].note,
//         suggest: data[i].suggest,
//         metadata: data[i].metadata,
//         attachments: []
//       };

//       const answers:any = [];
//       let answerIndex = 0;

//       while (data[i][`answer_${answerIndex}_content`] !== undefined) {
//         const answer = {
//           content: data[i][`answer_${answerIndex}_content`],
//           correct: data[i][`answer_${answerIndex}_correct`],
//           metadata: data[i][`answer_${answerIndex}_metadata`]
//         };

//         answers.push(answer);
//         answerIndex++;
//       }

//       item["answers"] = answers;
//       result.push(item);
//     }

//     return result;
//   }
