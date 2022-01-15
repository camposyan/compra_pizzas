let modalQuant;
let cart = [];
let modalKey = 0;

//Arrow functions para substituir document.querySelector por algo menor
const doc = (el) => document.querySelector(el);
const docs = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
  let pizzaItem = doc(".models .pizza-item").cloneNode(true);//Clonando o HTML das divs
  
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;//Atribuindo as imagens as img

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

    let key = e.target.closest(".pizza-item").getAttribute("data-key"); //Procura o elemento mais próximo que tenha essa classe
    modalQuant = "1"; //Reseta a quantidade de pizzas no modal
    modalKey = key;

    //Atribuindo informações da pizza selecionada no modal
    doc(".pizzaBig img").src = pizzaJson[key].img; //Imagem
    doc(".pizzaInfo h1").innerHTML = pizzaJson[key].name; //Nome
    doc(".pizzaInfo--desc").innerHTML = pizzaJson[key].description; //Descrição
    doc(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`; //Preço
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
    setTimeout(() => {doc(".pizzaWindowArea").style.opacity = 1;}, 200);
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
docs(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach(
  (item) => {
    item.addEventListener("click", closeModal);
  }
);

//Adiciona evento no botão de +
doc(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQuant > 1) {
    modalQuant--;
    doc(".pizzaInfo--qt").innerHTML = modalQuant;
  }
});

//Adiciona evento no botão de -
doc(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQuant++;
  doc(".pizzaInfo--qt").innerHTML = modalQuant;
});

//Adiciona evento nos botões de tamanho
docs(".pizzaInfo--size").forEach((size, sizeIndex) => {
  size.addEventListener("click", () => {
    doc(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});

//Adiciona evento no botão de adicionar ao carrinho
doc(".pizzaInfo--addButton").addEventListener("click", () => {
  let size = parseInt(
    doc(".pizzaInfo--size.selected").getAttribute("data-key")
  );

  let identifier = pizzaJson[modalKey].id + "@" + size; //Cria um identificador para saber qual pizza foi selecionada e de qual tamanho

  let key = cart.findIndex((item) => item.identifier == identifier);

  if (key > -1) {
    cart[key].quant += parseInt(modalQuant); //Se já houver um tipo selecionado, apenas aumenta a quantidade
  } else {
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size,
      quant: modalQuant,
    });
  }

  updateCart();
  closeModal();
});

//Abre o carrinho de compras no mobile
doc('.menu-openner').addEventListener('click', () => {
  if (cart.length > 0) {
  doc('aside').style.left = 0;
  }
});

//Fecha o carrinho de compras no mobile
doc('.menu-closer').addEventListener('click', () => {
  doc('aside').style.left = '100vw';
});

function updateCart() {
  doc('.menu-openner span').innerHTML = cart.length;

  if (cart.length > 0) {
    doc("aside").classList.add("show");
    doc(".cart").innerHTML = "";

    let subtotal = 0;
    let desconto = 0;
    let total = 0;

    for (let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);

      subtotal += pizzaItem.price * cart[i].quant;

      let cartItem = doc(".models .cart--item").cloneNode(true);

      let pizzaSizeName;
      switch (cart[i].size) {
        case 0:
          pizzaSizeName = "P";
          break;
        case 1:
          pizzaSizeName = "M";
          break;
        case 2:
          pizzaSizeName = "G";
          break;
      }

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector("img").src = pizzaItem.img;
      cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
      cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].quant;
      cartItem.querySelector(".cart--item-qtmais").addEventListener("click", () => {
        cart[i].quant++;
        updateCart();
        });
      cartItem.querySelector(".cart--item-qtmenos").addEventListener("click", () => {
          if (cart[i].quant > 1) {
            cart[i].quant--;
          } else {
            cart.splice(i, 1);
          }
          
          updateCart();
        });

      doc(".cart").append(cartItem);
    }

    desconto = subtotal * 0.1;
    total = subtotal - desconto;
  
    doc('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
    doc('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
    doc('.total span:last-child').innerHTML = ` R$ ${total.toFixed(2)}`;
  } else {
    doc("aside").classList.remove("show");
    doc("aside").style.left = '100vw';
  }
}
