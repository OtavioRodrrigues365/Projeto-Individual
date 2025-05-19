var chave = sessionStorage.getItem("chave")


// Exibir Carrossel Simples
function exibirCarrossel() {
  var itensCarrossel = ``;
  itensCarrossel = `<span class="titulo-3">${chave}</span>
<swiper-container class="mySwiper" id="mySwiper">
`;
  for (var i = 0; i < lista.length; i++) {
    var objetoAtual = lista[i];
    if (objetoAtual.categoria == chave) {
      itensCarrossel += `
    <swiper-slide>
    <span>${objetoAtual.categoria}</span>
      <img src="${objetoAtual.imagem}" />
          <p class="nome-itens">${objetoAtual.nome}</p>
      </swiper-slide>`;


      // var descricaoSeparada = lista[i].drops.split(".")
      // console.log(descricaoSeparada);
    } else {

    }
  }

  carrossel.innerHTML += `${itensCarrossel}</swiper-container>`;
};


// Exibir Carrossel Composto
function exibirCarrosselComposto() {
  var chaveSeparada = chave.split(".")
  var itensCarrossel = ``;
  itensCarrossel = `<span class="titulo-3">${chaveSeparada[0]} e ${chaveSeparada[1]}</span>
  <swiper-container class="mySwiper" id="mySwiper">
  `;
  for (var i = 0; i < lista.length; i++) {
    var objetoAtual = lista[i];
    if (objetoAtual.categoria == chaveSeparada[0] || objetoAtual.categoria == chaveSeparada[1]) {
      itensCarrossel += `
      <swiper-slide>
      <span>${objetoAtual.categoria}</span>
        <img src="${objetoAtual.imagem}" />
            <p class="nome-itens">${objetoAtual.nome}</p>
        </swiper-slide>`;


      // var descricaoSeparada = lista[i].drops.split(".")
      // console.log(descricaoSeparada);
    } else {

    }
  }

  carrossel.innerHTML += `${itensCarrossel}</swiper-container>`;
}


if (chave == `Animais`) {
  exibirCarrossel();
  exibirDrops();
} else if (chave == `Acessórios`) {
  exibirCarrossel();
  exibirUsos();
} else if (chave == `Facas`) {
  exibirCarrossel();
  exibirUsos();
} else if (chave == `Explosivos`) {
  exibirCarrossel();
  exibirSub();
} else if (chave.includes(`Fuzis de Assalto`)) {
  exibirCarrosselComposto();
  console.log(chave);
} else if (chave.includes(`Rifles de ferrolho`)) {
  exibirCarrosselComposto();
} else if (chave.includes(`Espingardas`)) {
  exibirCarrosselComposto();
}else if (chave.includes(`Pistolas`)) {
  exibirCarrosselComposto();
}




//Funções

// Com Drops e Localização
function exibirDrops() {
  var itensCards = ``;
  for (var i = 0; i < lista.length; i++) {
    var itemAtual = lista[i];
    if (itemAtual.categoria == chave) {

      var dropsSeparadas = lista[i].drops.split(".")
      var localizacaoSeparada = lista[i].localizacao.split(",");
      console.log(localizacaoSeparada[0]);
      itensCards += `<div class="item">
      <div class="nome-img">
        <img src="${itemAtual.imagem}" alt="Imagem item">
        <span>${itemAtual.nome}</span>
        <div class="drops">
          <span>Drops</span>
          <table>
            <tbody>
              <tr>
                <th>${dropsSeparadas[0]}</th>
                <th>${dropsSeparadas[1]}</th>
              </tr>
              <tr>
                <th>${dropsSeparadas[2]}</th>
                <th>${dropsSeparadas[3]}</th>
              </tr>
              <tr>
                <th>${dropsSeparadas[4]}</th>
                <th>${dropsSeparadas[5]}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="descricao">
        <h1>Descrição</h1>
        <p>${itemAtual.descricao}</p>
        <p></p>
        <h1>Características</h1>
        <h4>Localização</h4>
        <ol>`;
      for (var j = 0; j < localizacaoSeparada.length; j++) {
        itensCards += `
          <li>${localizacaoSeparada[j]}</li>
          `};
      itensCards += `</ol>
        <h4>Raridade</h4>
        <ul>
          <li>${itemAtual.raridade}</li>
        </ul>
        <h4>Variantes</h4>
        <ul>
          <li>${itemAtual.variante}</li>
        </ul>
      </div>
    </div>`;
    }
  };
  cards.innerHTML += `${itensCards}`;
};


//Utilizados e Localização
function exibirUsos() {
  var itensCards = ``;
  for (var i = 0; i < lista.length; i++) {
    var itemAtual = lista[i];
    if (itemAtual.categoria == chave) {

      var UsosSeparadas = lista[i].usos.split(".")
      var localizacaoSeparada = lista[i].localizacao.split(",");
      console.log(UsosSeparadas);
      itensCards += `<div class="item">
      <div class="nome-img">
        <img src="${itemAtual.imagem}" alt="Imagem item">
        <span>${itemAtual.nome}</span>
        <div class="utilizado">
          <table>
            <tbody>
              <tr>
                <th>Ação</th>
                <th>Detalhes</th>
              </tr>`;
      for (var j = 2; j < UsosSeparadas.length; j++) {

        if (j % 2 == 0) {
          itensCards += `<tr>
                <th>${UsosSeparadas[j]}</th>`
        } else {
          itensCards += `
                <th>${UsosSeparadas[j]}</th>
              </tr>
              `}
      };
      itensCards
        += `
            </tbody>
          </table>
        </div>
      </div>
      <div class="descricao">
        <h1>Descrição</h1>
        <p>${itemAtual.descricao}</p>
        <p></p>
        <h1>Características</h1>
        <h4>Localização</h4>
        <ol>`;
      for (var y = 0; y < localizacaoSeparada.length; y++) {
        itensCards += `
            <li>${localizacaoSeparada[y]}</li>
            `};
      itensCards += `</ol>
        <h4>Raridade</h4>
        <ul>
          <li>${itemAtual.raridade}</li>
        </ul>
        <h4>Variantes</h4>
        <ol>
          <li>${itemAtual.variante}</li>
        </ol>
      </div>
    </div>`;
    }
  };
  cards.innerHTML += `${itensCards}`;
};


// Armadilhas e Granadas
function exibirSub() {
  var itensCards = ``;
  for (var i = 0; i < lista.length; i++) {
    var itemAtual = lista[i];
    if (itemAtual.categoria == chave) {

      var varianteSeparada = lista[i].variante.split(",");
      var localizacaoSeparada = lista[i].localizacao.split(",");
      itensCards += `<div class="item">
      <div class="nome-img">
        <div class="subcategoria">
          <span class="sub">Subcategoria:</span>
          <p>${itemAtual.subcategoria}</p>
        </div>
        <img src="${itemAtual.imagem}" alt="Imagem item">
        <span>${itemAtual.nome}</span>
      </div>
      <div class="descricao">
        <h1>Descrição</h1>
        <p>${itemAtual.descricao}</p>
        <p></p>
        <h1>Características</h1>
        <h4>Tipo</h4>
        <ul>
          <li>${itemAtual.tipo}</li>
        </ul>
        <h4>Localização</h4>
        <ol>`; for (var j = 0; j < localizacaoSeparada.length; j++) {
        itensCards += `
            <li>${localizacaoSeparada[j]}</li>
            `};
      itensCards += `</ol>
        <h4>Raridade</h4>
        <ul>
          <li>${itemAtual.raridade}</li>
        </ul>
        <h4>Variantes</h4>
        <ol>`; for (var y = 0; y < varianteSeparada.length; y++) {
        itensCards += `
            <li>${varianteSeparada[y]}</li>
            `};
      itensCards += `</ol>
      </div>
    </div>`;
    }
  };
  cards.innerHTML += `${itensCards}`;
};





//Configuração Carrossel
const swiper = document.getElementById('mySwiper');

Object.assign(swiper, {

  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 6,
  navigation: 'true',
  loop: true,
  initialSlide: 4,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }
});