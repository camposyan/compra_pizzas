let modalQuant;
let cart = [];
let modalKey = 0;

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
  pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();

    //Procura o elemento mais próximo que tenha essa classe
    let key = e.target.closest(".pizza-item").getAttribute("data-key");
    modalQuant = "1"; //Reseta a quantidade de pizzas no modal
    modalKey = key;

    //Atribuindo informações da pizza selecionada no modal
    doc(".pizzaBig img").src = pizzaJson[key].img; //Imagem
    doc(".pizzaInfo h1").innerHTML = pizzaJson[key].name; //Nome
    doc(".pizzaInfo--desc").innerHTML = pizzaJson[key].description; //Descrição
    doc(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[
      key
    ].price.toFixed(2)}`; //Preço
    doc(".pizzaInfo--size.selected").classList.remove("selected"); //Reseta o modal retirando a classe de selecionado

    docs(".pizzaInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add("selected"); //Força o tamanho grande como selecionado
      }
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex]; //Tamanhos
    });

    doc(".pizzaInfo--qt").innerHTML = modalQuant;

    doc(".pizzaWindowArea").style.opacity = 0;
    doc(".pizzaWindowArea").style.display = "flex"; //Altera o display (none => flex)

    //Efeito de abrir/fechar o modal
    setTimeout(() => {
      doc(".pizzaWindowArea").style.opacity = 1;
    }, 200);
  });

  //Preencher as informações de pizzaItem para
  doc(".pizza-area").append(pizzaItem);
});

//Função para fechar o modal
function closeModal() {
  doc(".pizzaWindowArea").style.opacity = 0;
  doc(".pizzaWindowArea").style.display = "none"; //Altera o display (flex => none)

  //Efeito de abrir/fechar o modal
  setTimeout(() => {
    doc(".pizzaWindowArea").style.opacity = 1;
  }, 500);
}

//Adiciona evento de fechar aos botões
docs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
  item.addEventListener('click', closeModal);
});

//Adiciona evento no botão de +
doc('.pizzaInfo--qtmenos').addEventListener('click', () => {
  if(modalQuant > 1){
    modalQuant--;
    doc(".pizzaInfo--qt").innerHTML = modalQuant;
  }
});

//Adiciona evento no botão de -
doc('.pizzaInfo--qtmais').addEventListener('click', () => {
  modalQuant++;
  doc(".pizzaInfo--qt").innerHTML = modalQuant;
});

 //Adiciona evento nos botões de tamanho
docs(".pizzaInfo--size").forEach((size, sizeIndex) => {
  size.addEventListener('click', () => {
    doc(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  })
});

//Adiciona evento no botão de adicionar ao carrinho
doc(".pizzaInfo--addButton").addEventListener("click", () =>{
  let size =  parseInt(doc(".pizzaInfo--size.selected").getAttribute('data-key'));

  cart.push({
    id: pizzaJson[modalKey].id,
    size,
    quant: modalQuant
  });

  closeModal();
});