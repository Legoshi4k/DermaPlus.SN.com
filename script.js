// Lista completa de produtos
const produtos = [
  { nome: "Kit de Banho", descricao: "Transforme seu banho em um momento único com limpeza, hidratação e perfume duradouro.", preco: "R$ 89,90", imagem: "images/Kit de Banho.jpg.jpeg", estoque: 12 },
  { nome: "Sabonete Íntimo", descricao: "Limpeza suave e fragrância leve de lavanda para cuidado íntimo diário.", preco: "R$ 59,90", imagem: "images/Sabonete Intimo.jpg.jpeg", estoque: 8 },
  { nome: "Demaquilante", descricao: "Remove maquiagem de forma eficaz, deixando a pele fresca e hidratada.", preco: "R$ 49,99", imagem: "images/Demaquilante.jpg.jpeg", estoque: 15 },
  { nome: "Esfoliante Corporal", descricao: "Pele mais macia e radiante com sensação de renovação a cada uso.", preco: "R$ 79,90", imagem: "images/Esfoliante Corporal.jpg.jpeg", estoque: 6 },
  { nome: "Sabonete Facial Detox", descricao: "Com ingredientes naturais, limpa profundamente e hidrata sua pele.", preco: "R$ 35,00", imagem: "images/Sabonete facial detox.jpg.jpeg", estoque: 20 },
  { nome: "Mascara facial", descricao: "Um momento de cuidado que renova e hidrata, revelando uma pele mais fresca e luminosa.", preco: "R$ 29,90", imagem: "images/Mascara facial detox.jpg.jpeg", estoque: 10 },
  { nome: "Serum antirrugas", descricao: "Textura leve e de rápida absorção que suaviza linhas finas, hidrata profundamente e devolve à pele uma aparência firme e radiante.", preco: "R$ 95,50", imagem: "images/Serum antirrugas.jpg.jpeg", estoque: 5 },
  { nome: "Skincare", descricao: "Um ritual de cuidado pensado para realçar a beleza natural da sua pele. Fórmulas leves, eficazes e com o toque delicado que ela merece, trazendo frescor, saúde e luminosidade ao seu dia a dia.", preco: "R$ 79,99", imagem: "images/Skincare.jpg.jpeg", estoque: 7 },
  { nome: "Kit de skincare", descricao: "Um kit perfeito para seu corpo, que pode deixar hidratado e relaxado seu corpo botando seus problemas pra longe.", preco: "R$ 89,99", imagem: "images/Kit de skincare.jpg.jpeg", estoque: 3 },
  { nome: "Óleo Corporal", descricao: "Toque leve e hidratante que transforma a pele, proporcionando conforto e maciez o dia todo.", preco: "R$ 25,00", imagem: "images/Óleo Corporal.jpg.jpeg", estoque: 4 }
];

// Containers
const container = document.getElementById("produtos-container");
const btnCarrinho = document.getElementById("btn-carrinho");
const carrinhoContainer = document.getElementById("carrinho-container");
const listaCarrinho = document.getElementById("lista-carrinho");
const contadorCarrinho = document.getElementById("contador-carrinho");
const containerNotificacoes = document.getElementById("notificacoes");

// Carrinho
let carrinho = [];

// Função de notificação
function notificar(mensagem, tipo = "normal") {
  const div = document.createElement("div");
  div.className = "notificacao" + (tipo === "baixo" ? " baixo" : "");
  div.textContent = mensagem;
  containerNotificacoes.appendChild(div);
  setTimeout(() => div.classList.add("show"), 100);
  setTimeout(() => {
    div.classList.remove("show");
    setTimeout(() => div.remove(), 500);
  }, 4000);
}

// Atualizar carrinho visual
function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let totalItens = 0;
  carrinho.forEach(item => {
    totalItens += item.quantidade;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.produto.nome} (x${item.quantidade})
      <button class="remover" data-nome="${item.produto.nome}">Remover</button>
    `;
    listaCarrinho.appendChild(li);
  });
  contadorCarrinho.textContent = totalItens;
}

// Mostrar / ocultar carrinho ao clicar
btnCarrinho.addEventListener("click", () => {
  if (carrinhoContainer.style.display === "block") {
    carrinhoContainer.style.display = "none";
  } else {
    carrinhoContainer.style.display = "block";
  }
});

// Renderizar produtos
produtos.forEach((produto, index) => {
  const div = document.createElement("div");
  div.className = "produto produto-" + index;
  div.setAttribute("data-nome", produto.nome);

  const estoqueTexto = produto.estoque > 5
    ? `<p class="estoque">Estoque: ${produto.estoque}</p>`
    : produto.estoque > 0
      ? `<p class="estoque baixo">⚠️ Estoque baixo: ${produto.estoque}</p>`
      : `<p class="estoque esgotado">❌ Produto esgotado</p>`;

  div.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}">
    <h2>${produto.nome}</h2>
    <p>${produto.descricao}</p>
    <p class="preco">${produto.preco}</p>
    <div class="estoque-container">${estoqueTexto}</div>
    <button class="btn-comprar" ${produto.estoque === 0 ? "disabled" : ""}>Comprar</button>
  `;

  const btn = div.querySelector(".btn-comprar");
  const estoqueElContainer = div.querySelector(".estoque-container");

  btn.addEventListener("click", () => {
    if (produto.estoque > 0) {
      produto.estoque -= 1;

      // Atualiza visual do estoque
      if (produto.estoque === 0) {
        estoqueElContainer.innerHTML = `<p class="estoque esgotado">❌ Produto esgotado</p>`;
        btn.disabled = true;
        btn.textContent = "Esgotado";
      } else if (produto.estoque <= 5) {
        estoqueElContainer.innerHTML = `<p class="estoque baixo">⚠️ Estoque baixo: ${produto.estoque}</p>`;
      } else {
        estoqueElContainer.innerHTML = `<p class="estoque">Estoque: ${produto.estoque}</p>`;
      }

      // Adiciona ao carrinho
      const itemCarrinho = carrinho.find(item => item.produto.nome === produto.nome);
      if (itemCarrinho) {
        itemCarrinho.quantidade += 1;
      } else {
        carrinho.push({ produto: produto, quantidade: 1 });
      }

      atualizarCarrinho();
      notificar(`${produto.nome} adicionado ao carrinho!`);

      // Se estoque baixo alerta
      if (produto.estoque > 0 && produto.estoque <= 5) {
        notificar(`⚠️ Estoque baixo de ${produto.nome}: ${produto.estoque} restantes`, "baixo");
      }
    }
  });

  container.appendChild(div);
});

// Remover item do carrinho
listaCarrinho.addEventListener("click", e => {
  if (e.target.classList.contains("remover")) {
    const nome = e.target.getAttribute("data-nome");
    const index = carrinho.findIndex(item => item.produto.nome === nome);
    if (index > -1) {
      const produto = carrinho[index].produto;
      produto.estoque += carrinho[index].quantidade;

      // Atualiza card do produto visualmente
      const card = document.querySelector(`.produto[data-nome="${nome}"]`);
      const estoqueElContainer = card.querySelector(".estoque-container");
      const btn = card.querySelector(".btn-comprar");

      if (produto.estoque === 0) {
        estoqueElContainer.innerHTML = `<p class="estoque esgotado">❌ Produto esgotado</p>`;
        btn.disabled = true;
      } else if (produto.estoque <= 5) {
        estoqueElContainer.innerHTML = `<p class="estoque baixo">⚠️ Estoque baixo: ${produto.estoque}</p>`;
        btn.disabled = false;
        btn.textContent = "Comprar";
      } else {
        estoqueElContainer.innerHTML = `<p class="estoque">Estoque: ${produto.estoque}</p>`;
        btn.disabled = false;
        btn.textContent = "Comprar";
      }

      carrinho.splice(index, 1);
      atualizarCarrinho();
    }
  }
});
