module.exports =
  class formatData {
    constructor() {
      require('date-utils');
      const now = new Date();
      this.current = now;
    }
    /*loginBonus check
    * 引数　　loginDate
    * 戻り値　ログインから日付が変わっていたらtrue
    */
    lowerThanDateOnly(loginDate) {
      const year1 = loginDate.getFullYear();
      const month1 = loginDate.getMonth() + 1;
      const day1 = loginDate.getDate();

      const year2 = this.current.getFullYear();
      const month2 = this.current.getMonth() + 1;
      const day2 = this.current.getDate();

      if (year1 == year2) {
        if (month1 == month2) {
          return day1 < day2;
        }
        else {
          return month1 < month2;
        }
      } else {
        return year1 < year2;
      }
    };

    //todo limit 日付成形メソッド string　→　integer
    formatDateToInt(date) {
      const cutDate = date.substring(2);
      const result = cutDate.replace(/[^0-9]/g, '');
      return result;
    };
    //todo limit 日付成形メソッド integer　→ string
    formatDateToString(limit) {
      console.log(limit);
      const cutDate = limit.split(' ');
      console.log(cutDate);
      const result = cutDate[0] + '/' + cutDate[1];
      return result;
    };
    formatTodoData(todoList) {
      todoList.forEach(todo => {
        const limit = String(todo.limit);
        const cutDate = limit.match(/.{2}/g);
        const result = cutDate[0] + cutDate[1] + '/' + cutDate[2] + '/' + cutDate[3] + ' ' + cutDate[4] + ':' + cutDate[5];
        todo.limit = result;
      })
      return todoList;
    };
    //limitdateの期限更新
    updateLimitDate(limit, days) {
      const cutDate = limit.split(' ');
      let date = cutDate[0].split('-');
      const limitDate = new Date(date[0], date[1] - 1, date[2]);
      limitDate.setDate(limitDate.getDate() + Number(days));
      date = limitDate.toFormat('YYYY/MM/DD');
      date = date.split('/');
      const result = date[0] + '-' + date[1] + '-' + date[2] + ' ' + cutDate[1];
      console.log('kousingo' + '  ' + result);
      return result;
    }
    //userのprize情報整理
    formatUserUnPrizeInfo(prizeAll, prizeMaster) {
      const list = [];
      prizeMaster.forEach(master => {
        const result = prizeAll.filter(prize => prize.id !== master.prize_id);
        list.push(result);
      })
      return list[0];
    };

    //userのprize情報整理
    formatUserPrizeInfo(prizeAll, prizeMaster) {
      const list = [];
      prizeMaster.forEach(master => {
        const result = prizeAll.filter(prize => prize.id !== master.prize_id);
        list.push(result);
      })
      return list[0];
    };

  }