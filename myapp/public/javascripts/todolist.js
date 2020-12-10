
let todoLists;
let user;
let logs;
const todobox = document.getElementById('todobox');
const userName = document.getElementById('username');
const doingBtn = document.getElementById('doingBtn');
const compliteBtn = document.getElementById('compliteBtn');
const checkBtn = 'btn btn-primary my-2';
const uncheckBtn = 'btn btn-secondary my-2';

//EVENT
//初期画面作成
window.addEventListener('load', getHomeDisplay);
//完了済みtodo表示イベント
compliteBtn.addEventListener('click', compeleteTodolist);

//Function

/**Todo list 取得関数
 * fetchで/client/tododataから取得
 * 戻り値　なし
 */
async function getHomeDisplay() {
  //todolist取得
  const res = await fetch('/client/tododata');
  const body = await res.json();
  todoLists = body.todoList;
  user = body.user;
  logs = body.logs;
  const loginflg = body.loginflg;
  userName.textContent = user.username;
  //login check
  if (loginflg) {
    user.point = loginBonus(user.point);
    await postUserPoint(user.point);
  }
  //logs
  postLogData(logs);
  //todolist 
  todoLists.forEach(todo => {
    if (todo.status >= 0) {
      todoCardCreate(todo);
    }
  })
}
//未完了のtodolistを表示させる
function todoCardCreate(todo) {
  //要素を定義
  const card = document.createElement('div');
  const cardShadow = document.createElement('div');
  const cardBody = document.createElement('div');
  const listbox = document.createElement('ul');
  const list1 = document.createElement('li');
  const list2 = document.createElement('li');
  const list3 = document.createElement('li');
  const title = document.createElement('h4');
  const text = document.createElement('p');
  const limit = document.createElement('p');
  const btnBox = document.createElement('div');
  const btnGroup = document.createElement('div');
  const hiddenDoneId = document.createElement('input');
  const hiddenDonePoint = document.createElement('input');
  const hiddenUpdate = document.createElement('input');
  const hiddenDelete = document.createElement('input');
  const doneInput = document.createElement('input');
  const updateInput = document.createElement('input');
  const deleteInput = document.createElement('input');
  const doneForm = document.createElement('form');
  const updateForm = document.createElement('form');
  const deleteForm = document.createElement('form');
  const small = document.createElement('small');
  const cardSkin = user.select_style;
  //todocard作成
  card.className = 'col-md-3';
  todobox.appendChild(card);
  cardShadow.className = 'card mb-3 shadow-sm';
  cardShadow.style.borderRadius = '10px';
  card.appendChild(cardShadow);
  cardBody.className = 'card-body todocard font-weight-bold ' + cardSkin;
  // cardBody.style.backgroundImage = "url('/public/images/expectrum-1191724_1280.png')"
  cardBody.style.borderRadius = '10px';
  cardShadow.appendChild(cardBody);
  listbox.className = 'list-unstyled';
  cardBody.appendChild(listbox);
  list2.style.minHeight = '100px';
  list2.style.maxHeight = '100px';
  listbox.appendChild(list1);
  listbox.appendChild(list2);
  listbox.appendChild(list3);
  title.textContent = todo.title;
  list1.appendChild(title);
  text.style.whiteSpace = 'pre';
  text.className = 'text-left';
  text.textContent = todo.text;
  list2.appendChild(text);
  limit.textContent = '予定日: ' + todo.limit;
  list3.appendChild(limit);
  btnBox.className = 'd-flex justify-content-between align-items-center';
  cardBody.appendChild(btnBox);
  btnGroup.className = 'btn-group';
  btnBox.appendChild(btnGroup);
  //更新、削除フォーム作成
  doneForm.action = 'home/done/post';
  doneForm.method = 'POST';
  doneForm.addEventListener('submit', doneCheck);
  btnGroup.appendChild(doneForm);
  hiddenDoneId.type = 'hidden';
  hiddenDoneId.name = 'id';
  hiddenDoneId.value = todo.id;
  hiddenDonePoint.type = 'hidden';
  hiddenDonePoint.name = 'point';
  hiddenDonePoint.value = user.point;
  doneInput.type = 'submit';
  doneInput.className = 'btn btn-sm btn-outline-info';
  doneInput.value = 'done';
  doneForm.appendChild(hiddenDonePoint);
  doneForm.appendChild(hiddenDoneId);
  doneForm.appendChild(doneInput);
  updateForm.action = '/home/edit';
  updateForm.method = 'GET';
  btnGroup.appendChild(updateForm);
  hiddenUpdate.type = 'hidden';
  hiddenUpdate.name = 'id';
  hiddenUpdate.value = todo.id;
  updateInput.type = 'submit';
  updateInput.className = 'btn btn-sm btn-outline-info';
  updateInput.value = 'edit';
  updateForm.appendChild(hiddenUpdate);
  updateForm.appendChild(updateInput);
  deleteForm.action = 'home/delete/post';
  deleteForm.method = 'POST';
  deleteForm.addEventListener('submit', deleteCheck);
  btnGroup.appendChild(deleteForm);
  hiddenDelete.type = 'hidden';
  hiddenDelete.name = 'id';
  hiddenDelete.value = todo.id;
  deleteInput.type = 'submit';
  deleteInput.className = 'btn btn-sm btn-outline-danger';
  deleteInput.value = 'delete';
  deleteForm.appendChild(hiddenDelete);
  deleteForm.appendChild(deleteInput);
  small.className = 'text-muted';
  if (todo.status === 0) {
    small.textContent = '1 time'
  } else {
    small.textContent = todo.status + 'days repeat';
  }
  btnBox.appendChild(small);
};

//完了済みのtodolistを表示させる
function compeleteTodolist() {
  compliteBtn.removeEventListener('click', compeleteTodolist);
  //todolistを一度削除
  const compTodobox = todobox.cloneNode(false); //ガワだけ複製して…
  todobox.parentNode.replaceChild(compTodobox, todobox); //すげ替え
  //Btnのclass変更
  doingBtn.className = uncheckBtn;
  compliteBtn.className = checkBtn;
  console.log(todoLists);
  todoLists.forEach(todo => {
    if (todo.status === -1) {
      //要素を定義
      const card = document.createElement('div');
      const cardShadow = document.createElement('div');
      const cardBody = document.createElement('div');
      const listbox = document.createElement('ul');
      const list1 = document.createElement('li');
      const list2 = document.createElement('li');
      const title = document.createElement('h4');
      const text = document.createElement('p');
      const cardSkin = user.select_style;
      //todocard作成
      card.className = 'col-md-3 ';
      compTodobox.appendChild(card);
      cardShadow.className = 'card mb-3 shadow-sm';
      cardShadow.style.borderRadius = '10px';
      card.appendChild(cardShadow);
      cardBody.className = 'card-body todocard font-weight-bold ' + cardSkin;
      cardBody.style.borderRadius = '10px';
      cardShadow.appendChild(cardBody);
      listbox.className = 'list-unstyled';
      cardBody.appendChild(listbox);
      list2.style.minHeight = '100px';
      list2.style.maxHeight = '100px';
      listbox.appendChild(list1);
      listbox.appendChild(list2);
      title.textContent = todo.title;
      list1.appendChild(title);
      text.style.whiteSpace = 'pre';
      text.textContent = todo.text;
      list2.appendChild(text);
    }
  })
};

/**logを表示させる処理
 * 引数　logs
 * 戻り値　なし 
 */
function postLogData(logs) {
  const logbox = document.getElementById('logbox');
  const emptyHeart = 'far fa-heart';
  const checkedHeart = 'fas fa-heart';
  let i = 0;
  logs.forEach(log => {
    const text = document.createElement('li');
    const like = document.createElement('a');
    const likeCount = document.createElement('a');
    const heart = document.createElement('i');

    text.textContent = log.text;
    logbox.appendChild(text);
    if (log.userLike) {
      heart.className = checkedHeart;
      like.addEventListener('click', likeCheckDelete);
    } else {
      heart.className = emptyHeart;
      like.addEventListener('click', likeCheck);
    }
    heart.id = 'heart' + i;
    like.value = i;
    like.href = '#';
    like.id = 'like' + i;
    like.style.textDecoration = 'none';
    likeCount.id = 'count' + i;
    likeCount.textContent = log.likeCount;
    like.appendChild(heart);
    text.appendChild(like);
    text.appendChild(likeCount);
    i++;
  });
  //いいねした時の処理
  function likeCheck() {
    const num = this.value;
    const heart = document.getElementById('heart' + num);
    const logId = logs[num].id;
    const count = document.getElementById('count' + num);
    const logIdObj = { logId };
    const method = 'POST';
    const body = Object.keys(logIdObj).map((key) => key + '=' + encodeURIComponent(logIdObj[key])).join('&');
    this.removeEventListener('click', likeCheck);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    };
    heart.className = checkedHeart;
    count.textContent++;
    fetch("/client/like/create", { method, headers, body })
      .then(res => {
        this.addEventListener('click', likeCheckDelete);
      }).catch(console.error);
  }
  function likeCheckDelete() {
    const num = this.value;
    const heart = document.getElementById('heart' + num);
    const logId = logs[num].id;
    const count = document.getElementById('count' + num);
    const logIdObj = { logId };
    const method = 'POST';
    const body = Object.keys(logIdObj).map((key) => key + '=' + encodeURIComponent(logIdObj[key])).join('&');
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    };
    heart.className = emptyHeart;
    this.removeEventListener('click', likeCheckDelete);
    count.textContent--;
    fetch('/client/like/delete', { method, headers, body })
      .then(res => {
        this.addEventListener('click', likeCheck);
      }).catch(console.error);
  }
}
/**loginbounusがあった場合の処理
 * popup作成
 * 引数　user.point
 * 戻り値　user.point+ loginpoint
 */
function loginBonus(userPoint) {
  //要素を定義
  const layer = document.createElement('div');
  const popup = document.createElement('div');
  const popupTitle = document.createElement('h2');
  const popupText = document.createElement('h4');
  const popupCloseBtn = document.createElement('input');
  const html = document.getElementById('html');
  //point select
  const selectPoint = shuffle([100, 50, 200]);
  const bonusPoint = selectPoint[0];
  const result = Number(userPoint) + bonusPoint;
  //popup 作成
  layer.id = 'login-layer';
  layer.className = 'login-layer';
  popup.id = 'login-popup';
  popup.className = 'login-popup py-3';
  popupTitle.textContent = 'ログインボーナスGet!';
  popupTitle.className = 'py-4';
  popupText.className = `py-2`;
  popupText.textContent = `${bonusPoint} point`;
  popupCloseBtn.type = 'button';
  popupCloseBtn.id = 'close';
  popupCloseBtn.value = 'OK';
  popupCloseBtn.className = 'btn btn-info';
  popupCloseBtn.addEventListener('click', popupClose);
  html.appendChild(layer);
  html.appendChild(popup);
  popup.appendChild(popupTitle);
  popup.appendChild(popupText);
  popup.appendChild(popupCloseBtn);
  return result;
};
//userpoint 更新処理
function postUserPoint(point) {
  console.log(point);
  const postObj = { point };
  const method = 'POST';
  const body = Object.keys(postObj).map((key) => key + '=' + encodeURIComponent(postObj[key])).join('&');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  };
  fetch('/client/user/update', { method, headers, body })
    .then(res => {
      console.log('succece');
    }).catch(console.error);
}
//closeButtun 処理
function popupClose() {
  const layer = document.getElementById('login-layer');
  const popup = document.getElementById('login-popup');
  layer.style.display = 'none';
  popup.style.display = 'none';
}

//form送信確認
function deleteCheck() {
  if (window.confirm('削除してよろしいですか？')) { // 確認ダイアログを表示
    return true; // 「OK」時は送信を実行
  }
  else { // 「キャンセル」時の処理
    window.alert('キャンセルされました'); // 警告ダイアログを表示
    return location.href = '/home'; // 送信を中止

  }
};
//form送信確認
function doneCheck() {
  if (window.confirm('タスク完了しましたか？')) { // 確認ダイアログを表示
    return true; // 「OK」時は送信を実行
  }
  else { // 「キャンセル」時の処理
    window.alert('キャンセルされました'); // 警告ダイアログを表示
    return location.href = '/home'; // 送信を中止
  }
}
//配列をシャッフル
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}