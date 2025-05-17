const navbar = document.getElementById('header');
  const pagina2 = document.getElementById('2');
  

  window.addEventListener('scroll', () => {
    const pagina2Top = pagina2.getBoundingClientRect().top;

    if (pagina2Top <= 55) {
      navbar.classList.add('fixed');
    } else {
      navbar.classList.remove('fixed');
    }
  });

    function enviar(botao){
      var valor = botao.value;
      sessionStorage.setItem("chave", valor);
      window.location.href = "itens.html";

    };