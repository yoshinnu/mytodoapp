require('date-utils');
const now = new Date();
let date = now.toFormat('YYYYMMDDHH24');
date -= 2020112300;
console.log(now.toFormat('YYYYMMDDHH24'));
console.log(now.toFormat('YY年M月D日 H時MI分SS秒'));
console.log(now.toFormat('DDD MMM DD YYYY HH24:MI:SS'));
console.log(date);
