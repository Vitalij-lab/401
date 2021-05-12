let arrMines = []; // ID случайных клеток для установки мин (изначально 8)
let mines = document.getElementById('input'); //Количество установленных мин, предустановлено 8
let arrID = []; //Массив ID (64 шт.)
let random; //Случайное число
let current; // Время 
let t = 0; // счёт времени
let t2; // Минуты 
let t3; // Секунды 
let stopTime = 0; // флажок для остановки времени
for (let i = 0; i < 64; i++) { // занесение ID в массив
  arrID[i] = i + 1;
}

for (let i = 0; i < mines.value; i++) { //выборка случайных клеток для установки мин
  random = Math.floor(Math.random() * (arrID.length));
  arrMines[i] = arrID[random];
  document.getElementById(arrMines[i]).classList.add("mina"); // устанавливаем мины
  arrID.splice(random, 1);  //удаляем уже использованный ID
}

let squares = document.querySelectorAll(".square"); 

squares.forEach(square => {    // Обозначает предполагаемое расположение мины правой кнопкой
  square.addEventListener("contextmenu", (e) => {
    this.oncontextmenu = function () { return false };
    e.target.classList.toggle("danger");
  })
})

squares.forEach(square => {   // Открытие клеток левой кнопкой
  square.addEventListener("click", (e) => {

    let attr = e.target.getAttribute("id");

    if (e.target.classList.contains("mina")) { // Если подорвались
      for (let i = 0; i < mines.value; i++) { // мины взорвались 
        document.getElementById(arrMines[i]).classList.add("minaBang"); 
        
      }
      e.target.innerHTML = "!!!!";
      stopTime = 1;
      document.getElementById('time').innerHTML = "Игра окончена! Вы проиграли. Затрачено времени:  " + t2 + " мин. " + t3 + " сек."
      let field = document.querySelector(".field");  // делает не кликабельными клеточки
      field.classList.add("cursor");
    } else {
      e.target.classList.add("noMina")  // открывает клетку где мин нет
      e.target.innerHTML = quantityMines(attr);
    }
    let noMina = document.querySelectorAll(".noMina"); 
    if (noMina.length == 64 - mines.value){
      stopTime = 1;
      document.getElementById('time').innerHTML = "Игра окончена! ВЫ ВЫГРАЛИ! Затрачено времени:  " + t2 + " мин. " + t3 + " сек."
      for (let i = 0; i < mines.value; i++) { // мины взорвались 
        document.getElementById(arrMines[i]).classList.add("minaBang"); 
        
      }
    }
  })
})

function quantityMines(n) { // Считает сколько рядом мин

  let nearbyMines = 0;

  if ((+n > 8 && +n % 8 != 1) && document.getElementById(`${+n - 9}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if (+n > 8 && document.getElementById(`${+n - 8}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if ((+n > 8 && +n % 8 != 0) && document.getElementById(`${+n - 7}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if ((n != 1 && +n % 8 != 1) && document.getElementById(`${+n - 1}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if (+n % 8 != 0 && document.getElementById(`${+n + 1}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if ((+n < 57 && +n % 8 != 1) && document.getElementById(`${+n + 7}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if (+n < 57 && document.getElementById(`${+n + 8}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if ((+n < 57 && +n % 8 != 0) && document.getElementById(`${+n + 9}`).classList.contains("mina")) {
    nearbyMines += 1;
  }

  return nearbyMines;
}
a(); // Счётчик времени
function a() {
  if (stopTime != 1) {
      t2 = Math.trunc(t / 60);
      t3 = t - t2 * 60;
      if (t3 < 10) {
          t3 = ' 0' + t3;
          document.getElementById('time').innerHTML = 'Время:  ' + t2 + ':' + t3;
          t++;
      }
      else {
          document.getElementById('time').innerHTML = 'Время:  ' + t2 + ': ' + t3;
          t++;
      }
      setTimeout(a, 1000);
  }
}











