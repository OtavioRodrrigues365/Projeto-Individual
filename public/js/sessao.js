// sessão
function validarSessao() {
var email2 = localStorage.EMAIL_USUARIO;
var nome2 = localStorage.NOME_USUARIO;
var email = sessionStorage.EMAIL_USUARIO;
var nome = sessionStorage.NOME_USUARIO;

if (email2 != null && nome2 != null || email != null && nome != null) {
        console.log("sessão válida")
        var nome = localStorage.NOME_USUARIO
        if(nome == null){
        var nome = sessionStorage.NOME_USUARIO
        }
        document.getElementById("sessao").style.display = 'none';
        document.getElementById("sessao1").style.display = 'none';
        document.getElementById("sessao2").style.display = 'none';
        var imagem = `./assets/imgs/home.png`;
        teste.innerHTML = `<li><div class="perfil"><div class="img-perfil"><img src="${imagem}"/></div><a href="dashboard/dashboard.html">${nome}</a></div></li>`;
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

