/* eslint-disable no-unused-expressions */

String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

export function translateEnglishToPersianNumbers(num){
    let dict = {
        "0":"۰",
        "1":"۱",
        "2":"۲",
        "3":"۳",
        "4":"۴",
        "5":"۵",
        "6":"۶",
        "7":"۷",
        "8":"۸",
        "9":"۹",
    }
    num = String(num)
    return num.allReplace(dict)
}

export function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function isNumeric(value) {
    return /^\d+$/.test(value);
}

export function isReal(value) {
    return /^(-)?[0-9]+(\.[0-9]+)?$/.test(value)
}

export function isExpired(id_token) {
    if (id_token === null)
        return true
    let jwt = require('jsonwebtoken')
    let decoded = jwt.decode(id_token, {complete: true})
    let currentDate = new Date()
    return decoded.exp < currentDate.getTime()
}