document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  checkInputs(email, password);
});

async function checkInputs(email, password) {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "A senha é obrigatória.");
  } else {
    setSuccessFor(password);
  }

  const formControls = document.querySelectorAll(".formControl");
  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "formControl success";
  });

  if (formIsValid) {
    const usuarioValido = await verificarUsuario(emailValue, passwordValue);
    if (usuarioValido) {
      window.location.href = "pagina_destino.html";
    } else {
      alert("Email ou senha inválidos");
    }
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "formControl error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "formControl success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
