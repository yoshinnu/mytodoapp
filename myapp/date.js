const dateClass = require('./controllers/class/dataFormat');
const format = new dateClass();
require('date-utils');
const now = new Date();
let date = now.toFormat('YYMMDDHH24MI');
let f = '2020-11-26 12:00';
let res = new dateClass().formatDateToInt(f);
let current = new dateClass().current;
let result = new dateClass().formatDateToString(date);
let rest = date.match(/.{2}/g);
var date1 = new Date(2020, 1, 1);
var date2 = new Date(2020, 2, 5);
var termDay = (date2 - date1) / 86400000;
const date3 = '2020-11-30 12:20';
const a = format.updateLimitDate(date3, '3');
// console.log(termDay);
// console.log(now.toFormat('YYMMDDHH24MI'));
// console.log(now.toFormat('YY年M月D日 H時MI分SS秒'));
// console.log(now.toFormat('DDD MMM DD YYYY HH24:MI:SS'));
// console.log(rest);
console.log(date3);
console.log(a);