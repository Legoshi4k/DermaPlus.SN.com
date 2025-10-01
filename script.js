// Lista de produtos
const produtos = [
  {
    nome: "Kit de Banho",
    descricao: "Transforme seu banho em um momento único com limpeza, hidratação e perfume duradouro.",
    preco: "R$ 89,90",
    imagem: "images/Kit de Banho.jpg.jpeg"
  },
  {
    nome: "Sabonete Íntimo",
    descricao: "Limpeza suave e fragrância leve de lavanda para cuidado íntimo diário.",
    preco: "R$ 59,90",
    imagem: "images/Sabonete Intimo.jpg.jpeg"
  },
  {
    nome: "Demaquilante",
    descricao: "Remove maquiagem de forma eficaz, deixando a pele fresca e hidratada.",
    preco: "R$ 49,99",
    imagem: "images/Demaquilante.jpg.jpeg",
  },
  {
    nome: "Esfoliante Corporal",
    descricao: "Pele mais macia e radiante com sensação de renovação a cada uso.",
    preco: "R$ 79,90",
    imagem: "images/Esfoliante Corporal.jpg.jpeg"
  },
  {
    nome: "Sabonete Facial Detox",
    descricao: "Com ingredientes naturais, limpa profundamente e hidrata sua pele.",
    preco: "R$ 35,00",
    imagem: "images/Sabonete facial detox.jpg.jpeg"
  },
  {
    nome: "Mascara facial",
    descricao: "Um momento de cuidado que renova e hidrata, revelando uma pele mais fresca e luminosa.",
    preco: "R$ 29,90",
    imagem: "images/Mascara facial detox.jpg.jpeg"
  },
  {
    nome: "Serum antirrugas",
    descricao: " Textura leve e de rápida absorção que suaviza linhas finas, hidrata profundamente e devolve à pele uma aparência firme e radiante.",
    preco: "R$ 95,50",
    imagem: "images/Serum antirrugas.jpg.jpeg",
  },
  {
    nome: "Skincare",
    descricao: "Um ritual de cuidado pensado para realçar a beleza natural da sua pele. Fórmulas leves, eficazes e com o toque delicado que ela merece, trazendo frescor, saúde e luminosidade ao seu dia a dia.",
    preco: "R$ 79,99",
    imagem: "images/Skincare.jpg.jpeg",
  },
  {
    nome: "Kit de skincare",
    descricao: "Um kit perfeito para seu corpo, que pode deixar hidratado e relaxado seu corpo botando seus problemas pra longe.",
    preco: "R$ 89,99",
    imagem: "images/Kit de skincare.jpg.jpeg",
  },
  {
    nome: "Óleo Corporal",
    descricao: "Toque leve e hidratante que transforma a pele, proporcionando conforto e maciez o dia todo.",
    preco: "R$ 25,00",
    imagem: "images/Óleo Corporal.jpg.jpeg",
  },
];

// Referência ao container
const container = document.getElementById("produtos-container");

// Renderizar produtos
produtos.forEach((produto, index) => {
  const div = document.createElement("div");
  div.className = "produto produto-" + index; // adiciona classe única
  div.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}">
    <h2>${produto.nome}</h2>
    <p>${produto.descricao}</p>
    <p class="preco">${produto.preco}</p>
  `;
  container.appendChild(div);
});