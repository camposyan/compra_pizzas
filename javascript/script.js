//Arrow functions para substituir document.querySelector por algo menor
const doc = (el) => document.querySelector(el);
const docs = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
  //Clonando o HTML das divs
  let pizzaItem = doc(".models .pizza-item").cloneNode(true);

  //Atribuindo as imagens as img
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;

  //Atribuindo informações das pizzas as divs
  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

  //Abrir modal de compra de pizzas
  pizzaItem.querySelector('a').addEventListener('click',(e) =>{
     e.preventDefault();

     //Procura o elemento mais próximo que tenha essa classe
     let key = e.target.closest('.pizza-item').getAttribute('data-key');

     //Atribuindo informações da pizza selecionada no modal
     doc('.pizzaBig img').src = pizzaJson[key].img;
     doc('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
     doc('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
     doc('.pizzaInfo--sizearea').innerHTML = pizzaJson[key].sizes;
     doc('.pizzaInfo h1').innerHTML = pizzaJson[key].name;

     doc('.pizzaWindowArea').style.opacity = 0;
     doc('.pizzaWindowArea').style.display = 'flex'; //Altera o display (none => flex)
     
     //Efeito de abrir o modal
     setTimeout(() =>{
        doc('.pizzaWindowArea').style.opacity = 1;
     }, 200)
  })
  
  //Preencher as informações de pizzaItem para
  doc(".pizza-area").append(pizzaItem);
});
