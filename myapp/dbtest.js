const model = require('./models');
require('date-utils');
const now = new Date();
let date = now.toFormat('YYYYMMDDHH24');
console.log(now.toFormat('YYYYMMDDHH24'));
const user = {
  username: 'yagami',
  email: '123@145f',
  password: '0123456',
  point: 100,
  achivement_id: 12,
  is_admin: '1',
  login_date: date,
  twwitter_id: '1dfjklsfd'
}
model.users.create(user);