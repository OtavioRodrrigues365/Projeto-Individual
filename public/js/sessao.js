// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var email2 = localStorage.EMAIL_USUARIO;
    var nome2 = localStorage.NOME_USUARIO;
    

    var b_usuario = document.getElementById("b_usuario");

    if ((email != null && nome != null) || (email2 != null && nome2 != null)) {
        console.log("sessão válida")
    } else {
        window.location = "../login.html";
    }
}



function limparSessao() {
    sessionStorage.clear();
    localStorage.clear();
    window.location = "../index.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

