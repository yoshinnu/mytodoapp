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

    //todo limit 日付成形メソッド
    formatDateToString(limit) {
      const cutDate = limit.split(' ');
      const result = cutDate[0] + '/' + cutDate[1];
      return result;
    };
    formatTodoListLimitData(todoList) {
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
      return result;
    }
    //limitdateの期限確認
    checkLimitDate(limit) {
      const cutDate = limit.split(' ');
      let date = cutDate[0].split('-');
      const limitDate = new Date(date[0], date[1] - 1, date[2]);
      const limitBeforeOne = new Date(limitDate.getFullYear(), limitDate.getMonth(), limitDate.getDate() - 1);

      const year1 = limitBeforeOne.getFullYear();
      const month1 = limitBeforeOne.getMonth() + 1;
      const day1 = limitBeforeOne.getDate();
      const year2 = this.current.getFullYear();
      const month2 = this.current.getMonth() + 1;
      const day2 = this.current.getDate();
      if (year1 == year2 && month1 === month2 && day1 === day2) {
        return true;
      } else {
        return false;
      }
    };
    checkLimitOverDate(limit) {
      const cutDate = limit.split(' ');
      let date = cutDate[0].split('-');
      const limitDate = new Date(date[0], date[1] - 1, date[2]);

      const year1 = limitDate.getFullYear();
      const month1 = limitDate.getMonth() + 1;
      const day1 = limitDate.getDate();
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
        const result = prizeAll.filter(prize => prize.id === master.prize_id);
        list.push(result);
      })
      return list[0];
    };
    //logDataのformat
    formatLogsData(logs, likes, user) {
      const formatLogs = [];
      logs.forEach(log => {
        const userLike = likes.find(like => like.log_id === log.id && like.user_id === user.id) ? true : false;
        const count = likes.filter(like => like.log_id === log.id);
        const logData = {
          id: log.id,
          text: log.text,
          user_id: log.user_id,
          likeCount: count.length,
          userLike
        }
        formatLogs.push(logData);
      })
      return formatLogs;
    }
  }