let fieldSize; // размер поля
let fieldSizeMines;  //  количество мин

let arrNumbers = []; // Временный массив для для создания не повторяющихся цифр
let arrMines = []; // Массив клеточек где будут стоять мины
let squares = [];  //  Коллекция клеточек
let levels = document.querySelectorAll('input[name="level"]');  //  Коллекция полей выбора уровней
let current = 0; // Счёт ходов 
let t = 0; // счёт времени
let t2; // Минуты 
let t3; // Секунды 
let stopTime = 0; // флажок для остановки времени
let help = 0;  //  флажок состояния кнопок показа "нулевых" и не "нулевых" клеточек
document.querySelector(".tablo").style.display = "none";
field.classList.add("cursor"); // Блокирует клики 


document.querySelector(".newGame").onclick = function () { // обновление страницы для новой игры
  location.reload();
}
document.querySelector(".game").onclick = function () { // обновление страницы для новой игры
  document.querySelector(".newGame").classList.toggle("hidden");
  document.querySelector(".game").classList.toggle("hidden");
  document.querySelector(".levels").classList.toggle("hidden");
  document.querySelector(".btn-test").classList.remove("hidden");
  document.querySelector(".btn-test2").classList.remove("hidden");
  document.querySelector(".btn-test3").classList.remove("hidden");
  field.classList.remove("cursor"); // разблокирует клики 
      time(); // Счётчик времени
     
}
document.querySelector(".btn-test").onclick = function () { // тестовая кнопка для отображения мин
  if(document.querySelector(".btn-test").innerHTML == "Показать мины"){
    document.querySelector(".btn-test").innerHTML = "Скрыть мины";
  }
  else {
    document.querySelector(".btn-test").innerHTML = "Показать мины"
  }
  for (let i = 0; i < fieldSizeMines; i++) { // Подсказывает где мины
    arrMines[i].classList.toggle("minShow");
  }
  field.classList.toggle("cursor"); // Блокирует клики 
}
document.querySelector(".btn-test2").onclick = function () { // показывает не нулевые клетки
 for(i = 1; i <= squares.length; i++) {
  if(quantityMines(i) != 0 && !document.getElementById(i).classList.contains("mina")) {
    document.getElementById(i).classList.add("noMina");
    document.getElementById(i).classList.add("cursor");
    document.getElementById(i).innerHTML = quantityMines(i);
  }
 }
 help++;
 if(help == 2) {
        field.classList.add("cursor"); // Блокирует клики 
        document.getElementById('time').innerHTML = `Теперь вы всё знате!`;
        stopTime = 1;
        document.querySelector("#restMines").style.display = "none";
        document.querySelector("#restMines2").style.display = "none";
        document.querySelector(".span3").style.display = "none";
        document.querySelector(".btn-test").classList.add("hidden");
      }
}
document.querySelector(".btn-test3").onclick = function () { // показывает нулевые клетки
 for(i = 1; i <= squares.length; i++) {
  if(quantityMines(i) == 0 && !document.getElementById(i).classList.contains("mina")) {
    document.getElementById(i).classList.add("noMina");
    document.getElementById(i).classList.add("cursor");
    document.getElementById(i).innerHTML = 0;
  }
 }
 help++;
 if(help == 2) {
        field.classList.add("cursor"); // Блокирует клики 
        document.getElementById('time').innerHTML = `Теперь вы всё знате!`;
        stopTime = 1;
        document.querySelector("#restMines").style.display = "none";
        document.querySelector("#restMines2").style.display = "none";
        document.querySelector(".span3").style.display = "none";
        document.querySelector(".btn-test").classList.add("hidden");
      }
}

fieldSize = 25; //  предустановка никого уровня
start("squareLow", "fieldLow", "243px");
rightMouseButton();
leftMouseButton();
t = 60;

levels.forEach(level => { // Игрок выбирает уровень
  
  level.addEventListener("click", (e) => {
    document.querySelector(".field").classList.remove("fieldMiddle");
    document.querySelector(".field").classList.remove("fieldHigh");
    document.querySelector(".count").style.height = 0;
    arrNumbers = [];

    for (i = 0; i < squares.length; i++) {  //  удаляет предустановленный низкий уровень
      squares[i].remove();
    }
    let attr = e.target.getAttribute("value");
    computeLevels(attr);
  })
})

function computeLevels(attr) { // В зависимости от выбранного уровня создаётся поле

  if (attr == `low`) {
    fieldSize = 25;
    start("squareLow", "fieldLow", "243px");
    rightMouseButton();
    leftMouseButton();
    document.getElementById('time').innerHTML = "<span> 1:00</span>";
    t = 60;
  }
  if (attr == `middle`) {
    fieldSize = 100;
    start("squareMiddle", "fieldMiddle", "398px");
    rightMouseButton();
    leftMouseButton();
    document.getElementById('time').innerHTML = "<span> 2:00</span>";
    t =120;
  }
  if (attr == `high`) {
    fieldSize = 225;
    start("squareHigh", "fieldHigh", "447px");
    rightMouseButton();
    leftMouseButton();
    document.getElementById('time').innerHTML = "<span> 3:00</span>";
    t = 180;
  }
}
function start(n, n2, n3) {  //  начало игры
  fieldSizeMines = Math.ceil(fieldSize * 0.11);  //  расчитывает количество мин
  createSquare(n);
  document.querySelector(".field").classList.add(n2);
  collectSquare();
  settingMines();
  document.querySelector(".tablo").style.display = "block";
  document.querySelector("#restMines2").innerHTML = ` ${fieldSizeMines}`;
  document.querySelector(".test").style.display = "block";
  document.querySelector(".count").style.height = n3;

}
function createSquare(n) { // создание квадратов
  for (let i = 0; i < fieldSize; i++) {
    let div = document.createElement('div');
    div.className = n + " square";
    div.id = i + 1;
    field.append(div);
  }
}
function collectSquare() {
  squares = document.querySelectorAll(".square");  // Собирает все клеточки
}

function settingMines() { // устанавливает мины
  for (let i = 0; i < fieldSize; i++)
    arrNumbers[i] = i;

  for (let i = 0; i < fieldSizeMines; i++) { //выборка случайных клеток для установки мин
    random = Math.floor(Math.random() * (arrNumbers.length));
    squares[arrNumbers[random]].classList.add("mina");
    arrMines[i] = squares[arrNumbers[random]];
    arrNumbers.splice(random, 1);  //удаляем уже использованную клетку
  }
}


function rightMouseButton() {
  squares.forEach(square => {    // Обозначает предполагаемое расположение мины правой кнопкой
    square.addEventListener("contextmenu", (e) => {
      this.oncontextmenu = function () { return false };  //  запрещает меню при клике правой кнопки
      e.target.classList.toggle("danger");
      // countMines();
      if (fieldSizeMines - document.querySelectorAll('.danger').length < 0) {
        document.querySelector("#restMines").innerHTML = `Обозначено лишних: `;
        document.querySelector("#restMines2").innerHTML = `${fieldSizeMines - document.querySelectorAll('.danger').length}`;

      } else {
        document.querySelector("#restMines").innerHTML = `Не обозначенных мин:  `;
      }
      document.querySelector("#restMines2").innerHTML = `${Math.abs(fieldSizeMines - document.querySelectorAll('.danger').length)}`;
    })
  })
}

function leftMouseButton() {
  squares.forEach(square => {   // Открытие клеток левой кнопкой
    square.addEventListener("click", (e) => {
      
      current++;  //  Считает ходы
      document.querySelector(".levels").style.display = "none"; // прячется поле выбора уровня
      let attr = e.target.getAttribute("id");
      e.target.classList.remove("danger");
      countMines();
      // if (fieldSizeMines - document.querySelectorAll('.danger').length < 0) {
      //   document.querySelector("#restMines").innerHTML = `Обозначено лишних: `;
      //   document.querySelector("#restMines2").innerHTML = `${fieldSizeMines - document.querySelectorAll('.danger').length}`;

      // } else {
      //   document.querySelector("#restMines").innerHTML = `Не обозначенных мин:  `;
      // }
      // document.querySelector("#restMines2").innerHTML = `${Math.abs(fieldSizeMines - document.querySelectorAll('.danger').length)}`;
      if (e.target.classList.contains("mina")) { // Если подорвались
        for (let i = 0; i < fieldSizeMines; i++) { // мины взорвались 
          arrMines[i].classList.add("minaBang");
        }
        document.querySelector("body").classList.add("grad2");
        e.target.innerHTML = "!!!!";
        stopTime = 1;
        document.getElementById('time').innerHTML = "Вы проиграли.<br>Осталось времени:<br>" + t2 + " мин. " + t3 + " сек."
        document.querySelector(".btn-test").classList.add("hidden");
        document.querySelector(".span3").classList.add("hidden");
        document.querySelector("#restMines").style.display = "none";
        document.querySelector("#restMines2").style.display = "none";
        document.querySelector("#play3").play();
        field.classList.add("cursor"); // Блокирует клики 
        document.querySelector(".container").style.display = "none";
        setTimeout(showLose, 2000);
      }
      else {
        e.target.classList.add("noMina")  // открывает клетку где мин нет
        e.target.innerHTML = quantityMines(attr);
        createRecord(attr);
        e.target.classList.add("cursor"); // Блокирует клики 
        document.querySelector(".count").style.visibility = "visible"; // показывается поле записи ходов
      }
      let noMina = document.querySelectorAll(".noMina");
      if (noMina.length == fieldSize - fieldSizeMines) {  //  блок проверки на победу
        
        document.querySelector("body").classList.add("grad1");
        document.querySelector(".container").style.display = "none";
        document.querySelector("#restMines").style.display = "none";
        document.querySelector("#restMines2").style.display = "none";
        setTimeout(showWin, 3500);
        document.querySelector("#play2").play();
        stopTime = 1;
        field.classList.add("cursor"); // Блокирует клики 
        document.querySelector(".btn-test").classList.add("hidden"); 
        document.getElementById('time').innerHTML = "ВЫ ВЫГРАЛИ!<br>Осталось  времени:<br>" + t2 + " мин. " + t3 + " сек."
        document.querySelector(".span3").classList.add("hidden");
        for (let i = 0; i < fieldSizeMines; i++) { // мины взорвались 
          arrMines[i].classList.add("minaBang");

        }
      }
    })
  })
  function countMines() {
    if (fieldSizeMines - document.querySelectorAll('.danger').length < 0) {
      document.querySelector("#restMines").innerHTML = `Обозначено лишних: `;
      document.querySelector("#restMines2").innerHTML = `${fieldSizeMines - document.querySelectorAll('.danger').length}`;

    } else {
      document.querySelector("#restMines").innerHTML = `Не обозначенных мин:  `;
    }
    document.querySelector("#restMines2").innerHTML = `${Math.abs(fieldSizeMines - document.querySelectorAll('.danger').length)}`;
  }
  function showWin() {  // устанавливает цвет страницы после взрыва
    document.querySelector("body").classList.add("grad3");
    document.querySelector(".container").style.display = "block";
  }
  function showLose() {  // устанавливает цвет страницы после взрыва
    document.querySelector(".container").style.display = "block";
    document.querySelector("body").classList.remove("grad2");
    document.querySelector("body").classList.add("grad4");
  }
}

function quantityMines(n) { // Считает сколько рядом мин
  let side = Math.sqrt(fieldSize); // длина стороны игрового поля в клеточках
  let nearbyMines = 0; //  счётчик мин

  if ((+n > side && +n % side != 1) && document.getElementById(`${+n - side - 1}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if (+n > side && document.getElementById(`${+n - side}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if ((+n > side && +n % side != 0) && document.getElementById(`${+n - side + 1}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if ((n != 1 && +n % side != 1) && document.getElementById(`${+n - 1}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if (+n % side != 0 && document.getElementById(`${+n + 1}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if ((+n < fieldSize - side + 1 && +n % side != 1) && document.getElementById(`${+n + side - 1}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if (+n < fieldSize - side + 1 && document.getElementById(`${+n + side}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  if ((+n < fieldSize - side + 1 && +n % side != 0) && document.getElementById(`${+n + side + 1}`).classList.contains("mina")) {
    nearbyMines += 1;
  }
  return nearbyMines;
}

function time() {
  if(t == 0){
    stopTime = 1;
    document.getElementById('time').innerHTML = "Игра окончена!<br>Вам не хватило времени!"
    document.querySelector(".btn-test").classList.add("hidden");
    document.querySelector(".span3").classList.add("hidden");
    document.querySelector("#restMines").style.display = "none";
    document.querySelector("#restMines2").style.display = "none";
    field.classList.add("cursor"); // Блокирует клики 
    document.querySelector("#play1").play();
  }
  if (stopTime != 1) {
    t2 = Math.trunc(t / 60);
    t3 = t - t2 * 60;
    if (t3 < 10) {
      t3 = '0' + t3;
      document.getElementById('time').innerHTML = t2 + ':' + t3;
      t--;
    }
    else {
      document.getElementById('time').innerHTML = t2 + ':' + t3;
      t--;
    }
    setTimeout(time, 1000);
  }
}
function createRecord(n) { //делает запись ходов
  let p = document.createElement('p');
  if (+n < 10) {
    p.innerHTML = `<span class = "span1">Ход ${current}:</span> в клетке <span class = "span2">&nbsp&nbsp${n}</span> мин нет!`;
    count.append(p);
  }
  else {
    p.innerHTML = `<span class = "span1">Ход ${current}:</span> в клетке  <span class = "span2">${n}</span> мин нет!`;
    count.append(p);
  }
}

