// Решение квадратного уровнения

let a = +prompt("Введите коэффициент 'а'\nОн не должен = 0!");

if (a > 0 || a < 0){

   let b = +prompt("Введите коэффициент 'b'");
   
      if (b > 0 || b < 0 || b == 0) {

         let c = +prompt("Введите коэффициент 'c'");
      
            if (c > 0 || c < 0 || c == 0) {
               
               let discriminant;
               discriminant = (b*b - 4*a*c);
               alert("Дискриминант = " +discriminant);
               
                  if (discriminant < 0) {
                     alert("Уровнение решения не имеет.");
                  }

                  else if (discriminant == 0) {
                     let root;
                     root = ((-b + Math.sqrt(discriminant))/(2*a));
                     alert(`Уровнение имеет одно решение: ${root}`);

                  }
                  
                  else {
                     let root1;
                     root1 = ((-b + Math.sqrt(discriminant))/(2*a));
                     let root2;
                     root2 = ((-b - Math.sqrt(discriminant))/(2*a));
                     alert(`Уровнение имеет два решения: ${root1} и ${root2}`);
                  }
            }

         else {
         alert("Ошибка!");
        }

      }
   else {
       alert("Ошибка!");
    }
}

 else {
       alert("Ошибка!");
    }


