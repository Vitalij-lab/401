let arrMines = []; // ID случайных клеток для установки мин (изначально 8)
let mines = document.getElementById('input'); //Количество установленных мин, предустановлено 8
let arrID = []; //Массив ID (64 шт.)
let random; //Случайное число
let current = 0; // Счёт ходов 
let t = 0; // счёт времени
let t2; // Минуты 
let t3; // Секунды 
let stopTime = 0; // флажок для остановки времени
let chbox = document.getElementById('one'); // вкл/откл звука

for (let i = 0; i < 64; i++) { // занесение ID в массив
  arrID[i] = i + 1;
}
let field = document.querySelector(".field");  // делает не кликабельными клеточки

document.querySelector(".btn").onclick = function () {
  location.reload();
}
function settingMines() {
  for (let i = 0; i < mines.value; i++) { //выборка случайных клеток для установки мин
    random = Math.floor(Math.random() * (arrID.length));
    arrMines[i] = arrID[random];
    document.getElementById(arrMines[i]).classList.add("mina"); // устанавливаем мины
    arrID.splice(random, 1);  //удаляем уже использованный ID
  }
}
for (let i = 0; i < mines.value; i++) { //выборка случайных клеток для установки мин
  random = Math.floor(Math.random() * (arrID.length));
  arrMines[i] = arrID[random];
  document.getElementById(arrMines[i]).classList.add("mina"); // устанавливаем мины
  arrID.splice(random, 1);  //удаляем уже использованный ID
}

let squares = document.querySelectorAll(".square");  // Собирае все клеточки

squares.forEach(square => {    // Обозначает предполагаемое расположение мины правой кнопкой
  square.addEventListener("contextmenu", (e) => {
    this.oncontextmenu = function () { return false };
    e.target.classList.toggle("danger");
  })
})

squares.forEach(square => {   // Открытие клеток левой кнопкой
  square.addEventListener("click", (e) => {
    current++;
    if (current == 1) {
      aTime(); // Счётчик времени
    }

    let attr = e.target.getAttribute("id");

    if (e.target.classList.contains("mina")) { // Если подорвались
      for (let i = 0; i < mines.value; i++) { // мины взорвались 
        document.getElementById(arrMines[i]).classList.add("minaBang");
      }
      document.querySelector("body").classList.add("grad2");
      e.target.innerHTML = "!!!!";
      stopTime = 1;
      document.getElementById('time').innerHTML = "Игра окончена! Вы проиграли. Затрачено времени:  " + t2 + " мин. " + t3 + " сек."

        document.querySelector("#play").pause();
        document.querySelector("#play3").play();
      field.classList.add("cursor"); // Блокирует клики 
      document.querySelector(".container").style.display = "none";
      document.querySelector(".btn").style.display = "block";
      setTimeout(showLose, 1000);
    }
    else {
      e.target.classList.add("noMina")  // открывает клетку где мин нет
      e.target.innerHTML = quantityMines(attr);
      createRecord(attr);
      e.target.classList.add("cursor"); // Блокирует клики 
    }
    let noMina = document.querySelectorAll(".noMina");
    if (noMina.length == 64 - mines.value) {
      document.querySelector(".btn").style.display = "block";
      document.querySelector("canvas").style.display = "block";
      document.querySelector(".container").style.display = "none";
      setTimeout(showWin, 2000);
      document.querySelector("#play").pause();
      document.querySelector("#play2").play();
      stopTime = 1;
      field.classList.add("cursor"); // Блокирует клики  
      document.getElementById('time').innerHTML = "Игра окончена! ВЫ ВЫГРАЛИ! Затрачено времени:  " + t2 + " мин. " + t3 + " сек."
      for (let i = 0; i < mines.value; i++) { // мины взорвались 
        document.getElementById(arrMines[i]).classList.add("minaBang");

      }
    }
  })
})
function showWin() {  // устанавливает цвет страницы после взрыва
  document.querySelector(".container").style.display = "block";
  document.querySelector("body").classList.add("grad3");
  document.querySelector("canvas").style.display = "none";
}
function showLose() {  // устанавливает цвет страницы после взрыва
  document.querySelector(".container").style.display = "block";
  document.querySelector("body").classList.remove("grad2");
  document.querySelector("body").classList.add("grad1");
}

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
function aTime() {
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
    setTimeout(aTime, 1000);
  }
}

function createRecord(n) { //делает запись ходов
  let p = document.createElement('p');
  if (+n < 10) {
    p.innerHTML = `Ход ${current}: в клетке &nbsp&nbsp${n} мин нет!`;
    count.append(p);
  }
  else {
    p.innerHTML = `Ход ${current}: в клетке  ${n} мин нет!`;
    count.append(p);
  }
}
// Салют начало 

const rndColor = () => {
  const base = Math.random() * 360 | 0;
  const color = (275 * (base / 200 | 0)) + base % 200;
  return fac => `hsl(${color}, ${(fac || 1) * 100}%, ${(fac || 1) * 60}%)`;
};

class Battery {
  constructor(fireworks) {
    this.fireworks = fireworks;
    this.salve = [];
    this.x = Math.random();
    this.t = 0;
    this.tmod = 20 + Math.random() * 20 | 0;
    this.tmax = 500 + Math.random() * 1000;

    this._shot = salve => {
      if (salve.y < salve.ym) {
        salve.cb = this._prepareExplosion;
      }

      salve.x += salve.mx;
      salve.y -= 0.01;

      const r = Math.atan2(-0.01, salve.mx);

      this.fireworks.engine.strokeStyle = salve.c(.7);
      this.fireworks.engine.beginPath();

      this.fireworks.engine.moveTo(
        (this.x + salve.x) * this.fireworks.width + Math.cos(r) * 4,
        salve.y * this.fireworks.height + Math.sin(r) * 4
      );

      this.fireworks.engine.lineTo(
        (this.x + salve.x) * this.fireworks.width + Math.cos(r + Math.PI) * 4,
        salve.y * this.fireworks.height + Math.sin(r + Math.PI) * 4
      );

      this.fireworks.engine.lineWidth = 3;
      this.fireworks.engine.stroke();

    };

    this._prepareExplosion = salve => {
      salve.explosion = [];

      for (let i = 0, max = 32; i < max; i++) {
        salve.explosion.push({
          r: 2 * i / Math.PI,
          s: 0.5 + Math.random() * 0.5,
          d: 0,
          y: 0
        });
      }

      salve.cb = this._explode;
    };

    this._explode = salve => {

      this.fireworks.engine.fillStyle = salve.c();

      salve.explosion.forEach(explo => {

        explo.d += explo.s;
        explo.s *= 0.99;
        explo.y += 0.5;

        const alpha = explo.s * 2.5;
        this.fireworks.engine.globalAlpha = alpha;

        if (alpha < 0.05) {
          salve.cb = null;
        }

        this.fireworks.engine.fillRect(
          Math.cos(explo.r) * explo.d + (this.x + salve.x) * this.fireworks.width,
          Math.sin(explo.r) * explo.d + explo.y + salve.y * this.fireworks.height,
          3,
          3
        );
      });

      this.fireworks.engine.globalAlpha = 1;
    }
  }

  pushSalve() {
    this.salve.push({
      x: 0,
      mx: -0.02 * Math.random() * 0.04,
      y: 1,
      ym: 0.05 + Math.random() * 0.5,
      c: rndColor(),
      cb: this._shot
    });
  };

  render() {

    this.t++;

    if (this.t < this.tmax && (this.t % this.tmod) === 0) {
      this.pushSalve();
    }

    let rendered = false;

    this.salve.forEach(salve => {

      if (salve.cb) {
        rendered = true;
        salve.cb(salve);
      }

    });

    if (this.t > this.tmax) {
      return rendered;
    }

    return true;
  }
}

class Fireworks {
  constructor() {
    this.canvas = window.document.querySelector('canvas');
    this.engine = this.canvas.getContext('2d');
    this.stacks = new Map();

    this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
  }

  clear() {
    this.engine.clearRect(0, 0, this.width, this.height);
    this.engine.fillStyle = '#222';
    this.engine.fillRect(0, 0, this.width, this.height);
  }

  addBattery() {
    const bat = new Battery(this);
    this.stacks.set(Date.now(), bat);
  }

  render() {

    if (Math.random() < 0.05) {
      this.addBattery();
    }

    this.clear();

    this.stacks.forEach((scene, key) => {

      const rendered = scene.render();

      if (!rendered) {
        this.stacks.delete(key);
      }
    });

    requestAnimationFrame(this.render.bind(this));
  }

  run() {
    for (let i = 0; i < 5; i++) {
      this.addBattery();
    }
    window.addEventListener('resize', this.resize.bind(this));
    this.render();
  }
}

a = new Fireworks();
a.run();

// Салют конец 

function fun1() { // управление музыкой лейбом 
  if (chbox.checked) {
    document.querySelector("#play").play();
    document.querySelector(".speaker").style.display = "none";
    document.querySelector(".muteOff").style.display = "block";
  }
  else {
    document.querySelector("#play").pause();
    document.querySelector(".speaker").style.display = "block";
    document.querySelector(".muteOff").style.display = "none";
  }
}
