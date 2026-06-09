// CADASTRO

// Admin
// Email: admin123@gmail.com
// Senha: admin
//
// Estoquista
// Email: estoquista123@gmail.com
// Senha: estoque


// cria armazenamento de usuários cadastrados

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let emailAdmin = "admin123@gmail.com"
let senhaAdmin = "admin"
let emailEstoquista = "estoquista123@gmail.com"
let senhaEstoquista = "estoque"

let formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
  formCadastro.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementsByClassName("email")[0].value.trim();
    let senha = document.getElementsByClassName("senha")[0].value.trim();
    let senhaConfirmacao = document.getElementsByClassName("senhaConfirmacao")[0].value.trim();

    if (!email || !senha || !senhaConfirmacao) {
      alert("Preencha todos os campos");
      return;
    }

    if (senha !== senhaConfirmacao) {
      alert("As senhas não correspondem");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

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

    let emailDigitado = document.getElementsByClassName("email")[0].value.trim();
    let senhaDigitada = document.getElementsByClassName("senha")[0].value.trim();

    if (!emailDigitado || !senhaDigitada) {
      alert("Preencha todos os campos");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (emailDigitado === emailAdmin && senhaDigitada === senhaAdmin) {
      alert("Login realizado como ADMIN");
      window.location.href = "telaAdmin.html";

    } else if (emailDigitado === emailEstoquista && senhaDigitada === senhaEstoquista) {
      alert("Login realizado como ESTOQUISTA");
      window.location.href = "telaEstoquista.html";

    } else if (usuarios.find(u => u.email === emailDigitado && u.senha === senhaDigitada)) {
      alert("Login realizado!");
      window.location.href = "index.html";
    } else {
      alert("Email ou senha incorretos.");
    }

    this.reset();
  });
}