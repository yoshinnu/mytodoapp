const model = require('./models');
const dateClass = require('./controllers/class/dataFormat');
const format = new dateClass();
const date = format.current;
const user = {
  username: 'yoshitaka',
  email: '123@1',
  password: '0123456',
  point: 100,
  achivement_id: 12,
  is_admin: '0',
  login_date: date,
  twwitter_id: '1dfjklsfd'
}
// model.users.create(user);
// model.users.findOne({ where: { id: 1 } })
//   .then(user => console.log(user));

// let prize = {
//   pointcost: 4000,
//   name: 'text-white tanjiro'
// }
// model.prizes.create(prize);

// prize = {
//   pointcost: 2000,
//   name: 'text-white  giyu'
// }
// model.prizes.create(prize);
// prize = {
//   pointcost: 2000,
//   name: 'zenitsu'
// }
// model.prizes.create(prize);
async function test() {
  const a = await model.prizes.findAll({
    include: {
      model: model.users,
      required: true,
      where: { id: 1 }
    }
  });
  console.log(a[0].users[0].username);
}
test();