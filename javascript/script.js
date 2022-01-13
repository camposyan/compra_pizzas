//Arrow functions para substituir document.querySelector por algo menor
const doc = (el) => document.querySelector(el);
const docs = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
  //Clonando o HTML das divs
  let pizzaItem = doc(".models .pizza-item").cloneNode(true);

  //Atribuindo as imagens as img
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;

  //Atribuindo informações das pizzas as divs
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

  //Preencher as informações de pizzaItem para
  doc(".pizza-area").append(pizzaItem);

  //Abrir modal de compra de pizzas
  pizzaItem.querySelector('a').addEventListener('click',(e) =>{
     e.preventDefault();

     doc('.pizzaWindowArea').style.opacity = 0;
     doc('.pizzaWindowArea').style.display = 'flex';
     
     //Efeito de abrir o modal
     setTimeout(() =>{
        doc('.pizzaWindowArea').style.opacity = 1;
     }, 200)
  })
});
