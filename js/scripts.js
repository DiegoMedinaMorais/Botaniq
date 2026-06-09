// limpar tudo salvo do site para testes
// localStorage.clear();

// CADASTRO

// admin
// email: admin123@gmail.com
// senha: admin

// estoquista
// email: estoquista123@gmail.com
// senha: estoque

// cria armazenamento de usuários cadastrados

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let emailAdmin = "admin123@gmail.com";
let senhaAdmin = "admin";
let emailEstoquista = "estoquista123@gmail.com";
let senhaEstoquista = "estoque";

let formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
  formCadastro.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementsByClassName("email")[0].value.trim();
    let senha = document.getElementsByClassName("senha")[0].value.trim();
    let senhaConfirmacao = document
      .getElementsByClassName("senhaConfirmacao")[0]
      .value.trim();

    if (!email || !senha || !senhaConfirmacao) {
      alert("Preencha todos os campos");
      return;
    }

    if (senha !== senhaConfirmacao) {
      alert("As senhas não correspondem");
      return;
    }

    let usuarioExiste = usuarios.find((u) => u.email === email);

    if (usuarioExiste) {
      alert("Este email já está cadastrado.");
      return;
    }

    usuarios.push({ email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado! Agora faça o login.");
    this.reset();
  });
}

// LOGIN

let formLogin = document.getElementById("formLogin");

if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    let emailDigitado = document
      .getElementsByClassName("email")[0]
      .value.trim();
    let senhaDigitada = document
      .getElementsByClassName("senha")[0]
      .value.trim();

    if (!emailDigitado || !senhaDigitada) {
      alert("Preencha todos os campos");
      return;
    }

    if (emailDigitado === emailAdmin && senhaDigitada === senhaAdmin) {
      alert("Login realizado como ADMIN");
      window.location.href = "telaAdmin.html";
    } else if (
      emailDigitado === emailEstoquista &&
      senhaDigitada === senhaEstoquista
    ) {
      alert("Login realizado como ESTOQUISTA");
      window.location.href = "telaEstoquista.html";
    } else if (
      usuarios.find(
        (u) => u.email === emailDigitado && u.senha === senhaDigitada,
      )
    ) {
      alert("Login realizado!");
      window.location.href = "index.html";
    } else {
      alert("Email ou senha incorretos.");
    }

    this.reset();
  });
}

// AVALIAÇÕES

let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];

let formAvaliacoes = document.getElementById("formAvaliacoes");

// carrega avaliações ao entrar na página

let container = document.getElementById("avaliacoesCards");
if (container) {
  container.innerHTML = "";

  avaliacoes.forEach((av) => {
    container.innerHTML += `
      <div class="cardC">
        <p class="nomeCliente">${av.email}</p>
        <p class="notaC">${av.nota}/5</p>
        <p class="mensagemC">${av.mensagem}</p>
      </div>
    `;
  });
}
if (formAvaliacoes) {
  formAvaliacoes.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementsByClassName("email")[0].value.trim();
    let nota = document.getElementsByClassName("nota")[0].value.trim();
    let mensagem = document.getElementsByClassName("mensagem")[0].value.trim();

    if (!email || !nota || !mensagem) {
      alert("Preencha todos os campos");
      return;
    }

    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];

    avaliacoes.push({ email, nota, mensagem });
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

    alert("Avaliação recebida!");
    this.reset();

    container.innerHTML = "";

    avaliacoes.forEach((av) => {
      container.innerHTML += `
      <div class="cardC">
        <p class="nomeCliente">${av.email}</p>
        <p class="notaC">${av.nota}/5</p>
        <p class="mensagemC">${av.mensagem}</p>
      </div>
    `;
    });
  });
}

// ESTOQUE E COMPRA

let plantas = [
  { nome: "Philodendron Pink Princess", estoque: 10 },
  { nome: "Blue Vanda", estoque: 6 },
  { nome: "Espada-de-São-Jorge", estoque: 2 },
  { nome: "Girassóis", estoque: 8 },
  { nome: "Costela-de-Adão", estoque: 5 },
  { nome: "Lírio-da-Paz", estoque: 3 },
  { nome: "Mini Planta Suculenta", estoque: 5 },
  { nome: "Planta Carnívora", estoque: 9 },
  { nome: "Alocasia Dragon Scale", estoque: 1 },
  { nome: "Lavanda", estoque: 4 },
  { nome: "Orquídeas", estoque: 7 },
  { nome: "Maranta-Pena-de-Pavão", estoque: 8 },
  { nome: "Begonia Maculata", estoque: 9 },
  { nome: "Calathea Triostar", estoque: 6 },
];

localStorage.setItem("plantas", JSON.stringify(plantas));

function getEstoque(nome) {
  let plantas = JSON.parse(localStorage.getItem("plantas")) || [];

  for (let i = 0; i < plantas.length; i++) {
    if (plantas[i].nome === nome) {
      return plantas[i].estoque;
    }
  }

  return 0;
}

// carregar estoque atual

let cards = document.querySelectorAll(".card");
if (cards) {
  cards.forEach((card) => {
    let nome = card.querySelector(".nomeTexto").innerText;
    let estoque = getEstoque(nome);

    card.querySelector(".estoqueTexto").innerText = "Estoque: " + estoque;
  });
}
function diminuirEstoque(nome) {
  let plantas = JSON.parse(localStorage.getItem("plantas")) || [];

  for (let i = 0; i < plantas.length; i++) {
    if (plantas[i].nome === nome) {
      plantas[i].estoque -= 1;

      if (plantas[i].estoque < 0) {
        plantas[i].estoque = 0;
      }

      break;
    }
  }

  localStorage.setItem("plantas", JSON.stringify(plantas));
}
function aumentarEstoque(nome) {
  let plantas = JSON.parse(localStorage.getItem("plantas")) || [];

  for (let i = 0; i < plantas.length; i++) {
    if (plantas[i].nome === nome) {
      plantas[i].estoque += 1;

      if (plantas[i].estoque > 10) {
        plantas[i].estoque = 10;
      }

      break;
    }
  }

  localStorage.setItem("plantas", JSON.stringify(plantas));
}
