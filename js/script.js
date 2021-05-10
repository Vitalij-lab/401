let arrMines = []; // ID случайных клеток для установки мин (изначально 8)
let mines = document.getElementById('input'); //количество установленных мин, предустановлено 8
let arrID = []; //массив ID (64 шт.)
let random; //случайное число
for (let i = 0; i < 64; i++) { // занесение ID в массив
  arrID[i] = i + 1;
}

for (let i = 0; i < mines.value; i++) { //выборка случайных клеток для установки мин (изначально 8)
  random = Math.floor(Math.random() * (arrID.length));
  arrMines[i] = arrID[random];
  document.getElementById(arrMines[i]).classList.add("mina"); // устанавливаем мины
  arrID.splice(random, 1);  //удаляем уже использованный ID
}

let squares = document.querySelectorAll(".square"); // Обозначает предполагаемое расположение мины правой кнопкой

squares.forEach(square => {
  square.addEventListener("contextmenu", (e) => {
    this.oncontextmenu = function () { return false };
    e.target.classList.toggle("danger");
  })
})

squares.forEach(square => {
  square.addEventListener("click", (e) => {

    let attr = e.target.getAttribute("id");

    if (e.target.classList.contains("mina")) {
      alert(`Вы проиграли`)
    } else {
      e.target.classList.add("noMina")
    }

    e.target.innerHTML = quantityMines(attr);
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












