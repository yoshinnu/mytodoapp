const jwt = require('jsonwebtoken');
//jwttoken create
const createToken =
  function (res, user) {
    const options = { expiresIn: process.env.JWT_EXP };
    //tokenにuseridをセット
    const payload = {
      id: user.id
    };
    // token 作成
    const token = jwt.sign(payload, process.env.SECRET_KEY, options);
    //cookieにtokenを格納
    return res.cookie('jwt', token, { httpOnly: true });
  };

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    // tokenを認証
    await jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (!error) {
        //decodeしたidをセット
        req.decoded = decoded;
        //次の処理へ
        next();
      } else {
        return res.status(401).render('login.ejs', { message: 'ログインしてください。', title: 'Login' });
      }
    });
  } else {
    return res.status(401).render('login.ejs', { message: 'ログインしてください。', title: 'Login' });
  }
};
module.exports = {
  createToken,
  verifyToken
}; 