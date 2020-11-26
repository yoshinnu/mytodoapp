const dateClass = require('./controllers/class/dataFormat');
require('date-utils');
const now = new Date();
let date = now.toFormat('YYMMDDHH24MI');
let f = '2020-11-26 12:00';
let res = new dateClass().formatLimitDate(f);
let current = new dateClass().current;
let result = new dateClass().formatDateToString(date);

console.log(now.toFormat('YYMMDDHH24MI'));
console.log(now.toFormat('YY年M月D日 H時MI分SS秒'));
console.log(now.toFormat('DDD MMM DD YYYY HH24:MI:SS'));
console.log(date);
console.log(result);