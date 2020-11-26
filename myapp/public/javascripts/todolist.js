let todoLists;
let user;
const todobox = document.getElementById('todobox');
window.addEventListener('load', async function () {
  //todolist取得
  const res = await fetch('/client/tododata');
  const body = await res.json();
  console.log(body);
  todoLists = body.todoList;
  user = body.user;
  console.log(todoLists);
  todoLists.forEach(todo => {
    if (todo.status >= 0) {
      todoCardCreate(todo);
    }
  })
})

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
  const hiddenUpdate = document.createElement('input');
  const hiddenDelete = document.createElement('input');
  const updateInput = document.createElement('input');
  const deleteInput = document.createElement('input');
  const updateForm = document.createElement('form');
  const deleteForm = document.createElement('form');
  const small = document.createElement('small');

  //todocard作成
  card.className = 'col-md-4';
  todobox.appendChild(card);
  cardShadow.className = 'card mb-4 shadow-sm';
  cardShadow.style.borderRadius = '10px';
  card.appendChild(cardShadow);
  cardBody.className = 'card-body';
  cardBody.style.borderRadius = '10px';
  cardShadow.appendChild(cardBody);
  listbox.className = 'list-unstyled';
  cardBody.appendChild(listbox);
  listbox.appendChild(list1);
  listbox.appendChild(list2);
  listbox.appendChild(list3);
  title.textContent = todo.title;
  list1.appendChild(title);
  text.textContent = todo.text;
  list2.appendChild(text);
  limit.textContent = todo.limit;
  list3.appendChild(limit);
  btnBox.className = 'd-flex justify-content-between align-items-center';
  cardBody.appendChild(btnBox);
  btnGroup.className = 'btn-group';
  btnBox.appendChild(btnGroup);
  //更新、削除フォーム作成
  updateForm.action = '/home/edit';
  updateForm.method = 'GET';
  btnGroup.appendChild(updateForm);
  hiddenUpdate.type = 'hidden';
  hiddenUpdate.name = 'id';
  hiddenUpdate.value = todo.id;
  updateInput.type = 'submit';
  updateInput.className = 'btn btn-sm btn-outline-secondary';
  updateInput.value = 'edit';
  updateForm.appendChild(hiddenUpdate);
  updateForm.appendChild(updateInput);
  deleteForm.action = 'home/delete';
  deleteForm.method = 'POST';
  btnGroup.appendChild(deleteForm);
  hiddenDelete.type = 'hidden';
  hiddenDelete.name = 'id';
  hiddenDelete.value = todo.id;
  deleteInput.type = 'submit';
  deleteInput.className = 'btn btn-sm btn-outline-secondary';
  deleteInput.value = 'delete';
  deleteForm.appendChild(hiddenDelete);
  deleteForm.appendChild(deleteInput);
  small.className = 'text-muted';
  small.textContent = todo.status;
  btnBox.appendChild(small);
}