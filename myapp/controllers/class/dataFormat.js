module.exports =
  class formatData {
    constructor() {
      require('date-utils');
      const now = new Date();
      this.current = now.toFormat('YYMMDDHH24MI');
    }

    //todo limit 日付成形メソッド string　→　integer
    formatDateToInt(date) {
      const cutDate = date.substring(2);
      const result = cutDate.replace(/[^0-9]/g, '');
      return result;
    };
    //todo limit 日付成形メソッド integer　→ string
    formatDateToString(date) {
      const cutDate = date.split('');
      const result = '20' + cutDate[0] + cutDate[1] + '/' + cutDate[2] + cutDate[3] +
        '/' + cutDate[4] + cutDate[5] + ' ' + cutDate[6] + cutDate[7] + ':' + cutDate[8] + cutDate[9];
      return result;
    };
    // fotmatTodoData(todoLists) {
    //   todoLists.forEach(todo => {

    //   })
    // }
  }