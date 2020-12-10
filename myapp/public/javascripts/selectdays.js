
const repeatCheck = document.getElementById('statusCheck');
const statusList = document.getElementById('statusSelect');
window.addEventListener('load', function () {
  if (repeatCheck.checked) {
    statusList.style.display = 'inline';
  }
});
repeatCheck.addEventListener('change', selectChange);
function selectChange() {
  if (repeatCheck.checked) {
    statusList.style.display = 'inline';
  } else {
    statusList.style.display = 'none';
  }

};