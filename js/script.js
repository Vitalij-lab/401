function result() {
   let now = new Date();
   let dayInput = document.getElementById('data').value;
   let days = new Date(dayInput);
   let weeks = Math.floor((now - days) / 86400000);
   let n = weeks % 10;
   let n2 = (weeks % 100);
   let n3 = Math.floor(weeks / 1000);
   let n4 =weeks - n3 * 1000; 

       if (n3 == 0) {
           n3 = "";
       }

       if (n3 > 0 && n4 < 10) {
           n4 = `00${n4}`;
       } else if (n3 > 0 && n4 < 100) {
           n4 = `0${n4}`;
       }

       if (n2 == 11) {
           document.getElementById('finishDay2').innerHTML = 'исполнилось';
           document.getElementById('finishDay').innerHTML = 'дней';
       } else if (n == 1) {
           document.getElementById('finishDay2').innerHTML = 'исполнился';
           document.getElementById('finishDay').innerHTML = 'день';
       } else if (n2 == 12 || n2 == 13 || n2 == 14) {
           document.getElementById('finishDay2').innerHTML = 'исполнилось';
           document.getElementById('finishDay').innerHTML = 'дней';
       } else if (n == 2 || n == 3 || n == 4) {
           document.getElementById('finishDay2').innerHTML = 'исполнилось';
           document.getElementById('finishDay').innerHTML = 'дня';
       } else {
           document.getElementById('finishDay2').innerHTML = 'исполнилось';
           document.getElementById('finishDay').innerHTML = 'дней';
       }

   function getWeekDay(date) {
       let days = ['ВОСКРЕСЕНЬЕ', 'ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДУ', 'ЧЕТВЕРГ', 'ПЯТНИЦУ', 'СУББОТУ'];
       return days[date.getDay()];
   }

   let nameDay = new Date(days);

       if (getWeekDay(nameDay) == 'ВТОРНИК') {
           document.getElementById('vo').innerHTML = 'во';
       } else {
           document.getElementById('vo').innerHTML = 'в';
       }
   document.getElementById('nameDay').innerHTML = getWeekDay(nameDay);
   document.getElementById('days').innerHTML = `${n3} ${n4}`;
   document.getElementById('result').style.display = 'block';
   document.getElementById('h1').style.color = 'red';
}