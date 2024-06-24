document.addEventListener("DOMContentLoaded", () => {
  class Usuario {
    constructor(username, email, password, passwordConfirmation) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.passwordConfirmation = passwordConfirmation;
    }
  }

  const form = document.querySelector(".form");
  const limparBtn = document.querySelector("#limparBtn");
  const resultDiv = document.querySelector("#result");
  const storedDataDiv = document.querySelector("#storedData");
  const password = document.querySelector("#password");
  const passwordConfirmation = document.querySelector("#password-confimation");

  // Função para salvar dados no localStorage
  function saveToLocalStorage(usuario) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  // Função para carregar e exibir dados do localStorage
  /*function loadFromLocalStorage() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.length > 0) {
      storedDataDiv.innerHTML = "<h3>Dados Armazenados:</h3>";
      usuarios.forEach((usuario) => {
        storedDataDiv.innerHTML += `
                  <p><strong>Nome:</strong> ${usuario.nome}</p>
                  <p><strong>Email:</strong> ${usuario.email}</p>
                  <p><strong>Idade:</strong> ${usuario.senha}</p>
                  <hr>
              `;
      });
    }*/
  }
  // Função para salvar dados no servidor usando Fetch API
  async function saveToServer(usuario) {
    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar dados no servidor");
      }

      const data = await response.json();
      console.log("Dados salvos no servidor:", data);
      alert("Dados salvos com sucesso no servidor!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao salvar dados no servidor");
    }
  }

  // Carregar dados do localStorage ao carregar a página
  loadFromLocalStorage();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const passwordConfirmation = document.querySelector(
      "#password-confirmation"
    ).value;

    if (username == "") {
      return erro;
    }
    if (email == "") {
      return erro;
    }
    if (password == "") {
      return erro;
    }
    if (passwordConfirmation !== password) {
      return erro;
    }

    const usuario = new Usuario(username, email, password);
    /*
    // Exibir os dados capturados
    resultDiv.innerHTML = `
          <h3>Dados Capturados:</h3>
          <p><strong>Nome:</strong> ${usuario.username}</p>
          <p><strong>Email:</strong> ${usuario.email}</p>
          <p><strong>Password:</strong> ${usuario.password}</p>
      `;*/

    // Salvar os dados no localStorage
    saveToLocalStorage(usuario);

    // Salvar os dados no servidor
    await saveToServer(usuario);

    // Atualizar a exibição dos dados armazenados
    loadFromLocalStorage();
  });

  limparBtn.addEventListener("click", () => {
    const inputs = document.querySelectorAll("#form input");
    inputs.forEach((input) => (input.value = ""));
  });
});
