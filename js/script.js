// Задание №33


document.querySelector(".task33-btn").onclick = function () {
   let str = document.getElementById("task33-input");
   str = str.value;  // Это вариант через JS
   let str2 = str;   // Это вариант через CSS

   str = str[0].toUpperCase() + str.substring(1);
   document.querySelector('.version1').innerHTML = `${str} - это вариант через JS`;
   document.querySelector('.version2').innerHTML = `${str2} - это вариант через CSS`;
}

// Задание № 34

let randomArr = [];
document.querySelector(".task34-btn").onclick = function () {
   randomArr = [];
   let longArr = document.getElementById("task34-input");
   let longArrValue = longArr.value;

   for (let i = 0; i < longArrValue; i++) {

      randomArr[i] = (Math.round(Math.random() * 10));
      check(longArrValue);
   }
   document.querySelector('.task34_1-p').innerHTML = `${randomArr}`;
}

function check(longArrValue) {
   let five = document.querySelector('.task34_2-p').innerHTML;
   for (let i = 0; i < longArrValue; i++) {

      if (randomArr[i] == 5) {
         five = `Число 5 есть`;
         break;
      }
      else {
         five = `Числа 5 нет`;
      }

   }
   document.querySelector('.task34_2-p').innerHTML = `${five}`;
}

// Задание № 35
let valueNumber1 = document.getElementById("task35_1-input");
let valueNumber2 = document.getElementById("task35_2-input");

document.querySelector(".task35-btn").onclick = function () {
   number1 = valueNumber1.value;
   number2 = valueNumber2.value;

   if (number1 === number2) {
      document.querySelector('.task35-p').innerHTML = `Числа равны`;
   }
   else {
      document.querySelector('.task35-p').innerHTML = `Числа не равны`;
   }
}
