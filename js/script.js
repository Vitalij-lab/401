// ЗАДАЧА № 2
let a = +prompt("Введите длину первого основания");
if (a.toString() !== "NaN") {
   let b = +prompt("Введите длину второго основания");
   if (b.toString() !== "NaN") {
      let h = +prompt("Введите высоту");
      if (h.toString() !== "NaN") {
         let summ = a + b;
         alert('Площадь трапеции будет равна ' + summ / 2 * h);
      }
      else {
         alert("Вы ввели не корректные данные! Переходим к следующей задаче!");
      }
   }
   else {
      alert("Вы ввели не корректные данные! Переходим к следующей задаче!");
   }
}
else {
   alert("Вы ввели не корректные данные! Переходим к следующей задаче!");
}



//  ЗАДАЧА № 3
let summ = +prompt("Введите сумму вклада");
let interest = +prompt("Введите проценты");
let year = +prompt("Введите количество лет");
let contribution = summ;
let interestYear;
for (let i = 1; i <= year; i++) {
   interestYear = contribution / 100 * interest;
   contribution = contribution + interestYear;

   alert('Через ' + i + ' лет Ваш вклад будет ' + contribution.toFixed(2) + ' рублей');

}
alert('Следущая задача');
// ЗАДАЧА № 4

let p = +prompt("Введите число");
if (p == 10) {
   alert("Верно!");
}
else {
   alert("Неверно!");
}
