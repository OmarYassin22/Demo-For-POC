// const responseJson = {
//     "ABDALRAHMA_AL_GHAMDI_rev02": {
//         "Results": [
//             {
//                 "Code": 500.3,
//                 "Description": "يجب ألا تقل المسافة بين الأعمدة الرئيسية عن 4 م و يجب ألا تزيد عن 6.5 م",
//                 "Place": "كامل المبنى",
//                 "Plans": "",
//                 "Status": false,
//                 "Message": "يتم فحصه يدويا حسب حاجة التصميم",
//                 "Result": "غير مطابق",
//                 "Mandatory": null,
//                 "FileName": null,
//                 "ErrorElementsIds": {
//                     "ABDALRAHMA_AL_GHAMDI_rev02": [
//                         {
//                             "IntegerValue": 650600
//                         },
//                         {
//                             "IntegerValue": 650601
//                         },
//                         {
//                             "IntegerValue": 650602
//                         },
//                         {
//                             "IntegerValue": 650626
//                         },
//                         {
//                             "IntegerValue": 660007
//                         }
//                     ]
//                 }
//             },

//             {
//                 "Code": 507.7,
//                 "Description": "يجب ألا تزيد المسافة الصافية بين الأعصاب في البلاطات الهوردي ثنائية الاتجاه عن 0.75 م.",
//                 "Place": "كامل المبنى",
//                 "Plans": "",
//                 "Status": true,
//                 "Message": "تم اختبار الشرط بنجاح",
//                 "Result": "مطابق",
//                 "Mandatory": null,
//                 "FileName": null,
//                 "ErrorElementsIds": {
//                     "ABDALRAHMA_AL_GHAMDI_rev02": []
//                 }
//             },
//             {
//                 "Code": 503.4,
//                 "Description": "يجب ألا يزيد طول البحر للعوارض و الكمرات المقاسة من المركز إلى المركز عن 6.5 م، كما يُسمح بالبحر البسيط في حالة البحر لا يتجاوز 5 م.",
//                 "Place": "كامل المبنى",
//                 "Plans": "",
//                 "Status": false,
//                 "Message": "يجب ألا يزيد طول البحر للعوارض و الكمرات، المقاسة من المركز إلى المركز عن 6.5 م، و في حالة البحر البسيط لا يتجاوز البحر عن 5 م",
//                 "Result": "غير مطابق",
//                 "Mandatory": null,
//                 "FileName": null,
//                 "ErrorElementsIds": {
//                     "ABDALRAHMA_AL_GHAMDI_rev02": [
//                         {
//                             "IntegerValue": 651878
//                         },
//                         {
//                             "IntegerValue": 652020
//                         },
//                         {
//                             "IntegerValue": 652191
//                         },
//                         {
//                             "IntegerValue": 652889
//                         }
//                     ]
//                 }
//             }
//         ]
//     }
// }

const responseJson = JSON.parse(localStorage.getItem("ComplianceResultData") || "{}");
console.log(responseJson);

const conditionsResults = responseJson[Object.keys(responseJson)[0]].Results;
const failedConditions = conditionsResults.filter(item => item.Status == false);

function getConditionResultByCode(code) {
    for (const cond of conditionsResults) {
        if (cond.Code === code) return cond;
    }
    return null;
}

function getErrorElementsIds(errorElementsIds) {
    const integerValues = [];
    for (const key in errorElementsIds) {
        if (Object.prototype.hasOwnProperty.call(errorElementsIds, key)) {
            const elements = errorElementsIds[key];
            for (const element of elements) {
                if (element.IntegerValue) {
                    integerValues.push(element.IntegerValue);
                }
            }
        }
    }
    return integerValues;
}