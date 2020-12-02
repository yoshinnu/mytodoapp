const db = require('../controllers/database/databaseController.js');
const dateClass = require('./class/dataFormat.js');
const format = new dateClass();
const { validationResult } = require('express-validator');
const log = require('./logs/logController.js');
//HOME画面へ
const getHomePage = async (req, res) => {
  //user情報取得
  const user = await db.getUserById(req.decoded.id)
    .catch((error) => {
      console.error(error);
    });
  if (Number(user.is_admin) === 1) {
    res.status(200).render('home.ejs', { title: 'Home', user });
  } else {
    const users = await db.getUserAll().catch((error) => {
      console.error(error);
    });
    res.status(200).render('adminhome.ejs', { title: '管理者Home', user, users });
  }
}
//todocreate画面へ
const getTodoCreatePage = (req, res) => {
  res.status(200).render('todocreate.ejs', { title: 'Todo' });
}

//todoedit画面へ
const getTodoEditPage = async (req, res) => {
  const todoData = await db.getTodoById(req.query.id);
  todoData.limit = format.formatDateToString(todoData.limit);
  res.status(200).render('todoedit.ejs', { title: 'Edit Todo', todoData });
};

//shop画面へ
const getShopPage = async (req, res) => {
  //user情報取得
  const user = await db.getUserById(req.decoded.id)
    .catch((error) => {
      console.error(error);
    });

  //prizename pointcost 取得
  const prizeAll = await db.getPrizeAll()
    .catch((error) => {
      console.error(error);
    });
  //userのprize取得情報取得
  const prizeMaster = await db.getPrizeIdByUserId(user.id).catch((error) => {
    console.error(error);
    res.status(400).send;
  });
  //userがprizeを持っていたら
  let prizeList;
  if (prizeMaster.length !== 0) {
    //prizeListにuserの持っているprize情報を格納
    prizeList = format.formatUserUnPrizeInfo(prizeAll, prizeMaster);
  } else {
    prizeList = prizeAll;
  }
  if (Number(user.is_admin) === 0) {
    return res.status(200).render('adminshop.ejs', { title: 'Admin Shop', user, prizeList: prizeAll });
  } else {
    return res.status(200).render('shop.ejs', { title: 'Shop', user, prizeList });
  }
}
/**関数　todoDATAをデータベースに挿入
 * 引数　req,res
 * 戻り値　home画面へ　title,user
 * TODO validation追加 
 */
const postCreateTodo = async (req, res) => {
  // formのerror確認
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    console.error(errors);
    return res.status(422).render('todocreate.ejs', { errors, title: 'Todo Create' });
  }
  //todoData作成  
  const todoData = {
    user_id: req.decoded.id,
    title: req.body.title,
    text: req.body.text,
    limit: req.body.limit,
    status: req.body.status
  }
  if (todoData.status === undefined) { todoData.status = 0 };
  await db.createTodoData(todoData).catch((error) => {
    console.error(error);
    return res.status(400);
  });
  return res.status(200).redirect('/home')
}
/**関数　todoの更新
 * 引数　req,res
 * 戻り値　home画面へ title,user
 */
const postEditTodo = async (req, res) => {

  // formのerror確認
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    console.error(errors);
    //元のdata取得
    const todoData = await db.getTodoById(req.body.id).catch((error) => {
      console.error(error);
    });
    return res.status(422).render('todoedit.ejs', { errors, title: 'Edit Todo', todoData });
  }
  //repeatのcheckがなかった時０を代入
  if (req.body.status === undefined) { req.body.status = 0 };
  //更新データ作成

  const todoData = {
    title: req.body.title,
    text: req.body.text,
    limit: req.body.limit,
    status: req.body.status
  }
  console.log(req.body.limit);
  todoData.limit = format.formatDateToInt(todoData.limit);
  await db.PutSelectTodo(todoData).catch((error) => {
    console.error(error);
  });
  return res.status(200).redirect('/home')
};

//todo削除処理
const postTodoDelete = async (req, res) => {
  await db.deleteTodoByid(req.body.id).catch((error) => {
    console.error(error);
  });
  return res.status(200).redirect('/home')
};

//todoを完了済みにする処理
const postTodocomplete = async (req, res) => {
  //user情報取得
  const user = await db.getUserById(req.decoded.id)
    .catch((error) => {
      console.error(error);
    });
  //更新データ定義
  const userPoint = {
    point: Number(req.body.point) + 100
  }
  //選択されたtodoを取得
  const todo = await db.getTodoById(req.body.id).catch((error) => {
    console.error(error);
  });
  //todoの繰り返し設定を確認
  if (todo.status != 0) {
    todo.limit = format.updateLimitDate(todo.limit, todo.status);
    const todoData = {
      user_id: req.decoded.id,
      title: todo.title,
      text: todo.text,
      limit: todo.limit,
      status: todo.status
    }
    await db.createTodoData(todoData).catch((error) => {
      console.error(error);
    });
  }
  //todostatus　更新
  await db.putStatusTodoById(req.body.id).catch((error) => {
    console.error(error);
  });
  //point 更新
  await db.putSelectUserPointById(req.decoded.id, userPoint).catch((error) => {
    console.error(error);
  });
  //log登録
  log.logTodoDone(user, todo.title);
  res.status(200).redirect('/home');
};

//prize購入処理
const postBuyPrize = async (req, res) => {
  //user情報取得
  const user = await db.getUserById(req.decoded.id)
    .catch((error) => {
      console.error(error);
    });
  //prize情報登録
  await db.createPrizeMaster(req.decoded.id, req.body.id).catch((error) => {
    console.error(error);
    res.status(400).redirect('/home');
  });
  console.log('start');
  //持ちpoint清算
  const resultPoint = Number(user.point) - req.body.point;
  console.log(user);
  console.log(req.body.point);
  const userPoint = {
    point: resultPoint
  }
  await db.putSelectUserPointById(req.decoded.id, userPoint).catch((error) => {
    console.error(error);
    res.status(400).redirect('/home');
  });
  res.status(200).redirect('/home/shop');
};

module.exports = {
  getHomePage,
  getTodoCreatePage,
  getTodoEditPage,
  postCreateTodo,
  postEditTodo,
  postTodoDelete,
  getShopPage,
  postTodocomplete,
  postBuyPrize,
}