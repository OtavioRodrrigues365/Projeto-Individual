const videos = [
  {
    titulo: "Como começar do zero no mapa chernarus",
    link: "./assets/tutorial/comoComeçar.mp4",
    capa: "./assets/capaTutorial/video1.jpg",
    minutos: 16,
    segundos: 36
  },
  {
    titulo: "11 Dicas para iniciantes",
    link: "https://OtavioRodrigues.b-cdn.net/11Dicas.mp4",
    capa: "./assets/capaTutorial/video2.jpg",
    minutos: 11,
    segundos: 29
  },
  {
    titulo: "40+ Dicas para iniciantes",
    link: "https://OtavioRodrigues.b-cdn.net/40Dicas.mp4",
    capa: "./assets/capaTutorial/video3.jpg",
    minutos: 7,
    segundos: 35
  },
  {
    titulo: "Como fazer fogueira e cozinhar de todas as formas",
    link: "https://OtavioRodrigues.b-cdn.net/comoCozinhar.mp4",
    capa: "./assets/capaTutorial/video4.jpg",
    minutos: 9,
    segundos: 29
  },
  {
    titulo: "Pra que serve os remédios",
    link: "https://OtavioRodrigues.b-cdn.net/rem%C3%A9dios.mp4",
    capa: "./assets/capaTutorial/video5.jpg",
    minutos: 9,
    segundos: 58
  },
  {
    titulo: "Como caçar animais e estratégias de caça",
    link: "https://OtavioRodrigues.b-cdn.net/comoCa%C3%A7ar.mp4",
    capa: "./assets/capaTutorial/video6.jpg",
    minutos: 12,
    segundos: 5
  },
  {
    titulo: "Melhores lugares pra fazer base",
    link: "https://OtavioRodrigues.b-cdn.net/melhoresLugares.mp4",
    capa: "./assets/capaTutorial/video7.jpg",
    minutos: 21,
    segundos: 49
  },
  {
    titulo: "Como construir uma Base no DayZ 2025",
    link: "./assets/tutorial/comoConstruir.mp4",
    capa: "./assets/capaTutorial/video8.jpg",
    minutos: 12,
    segundos: 21
  },
  {
    titulo: "Rota muito boa de loot militar",
    link: "https://OtavioRodrigues.b-cdn.net/comoLootear.mp4",
    capa: "./assets/capaTutorial/video9.jpg",
    minutos: 9,
    segundos: 39
  },
  {
    titulo: "Como Guardar seus itens!",
    link: "https://OtavioRodrigues.b-cdn.net/comoGuardar1.mp4",
    capa: "./assets/capaTutorial/video10.jpg",
    minutos: 13,
    segundos: 52
  }
  
];

let idUsuario = sessionStorage.ID_USUARIO;

//Fetch para buscar o progresso do usuário no quiz
  fetch(`/tutorial/buscarProgresso/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
    if (response.status === 204) {
      console.log('Nenhum progresso encontrado. Assista um video!');
      exibirCheck()
      return;
    }
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        guardarProgresso(resposta);
        exibirCheck();
       
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ progresso dos videos: ${error.message}`);
    });
  


const lista_progresso = [];

function guardarProgresso(dados){
  for(var i = 0; i < dados.length; i++){
    progressoAtual = dados[i].progresso;
    lista_progresso.push(progressoAtual);
  }
  console.log(lista_progresso);
  return lista_progresso;
}

//função de rodar videos de acordo com o botão clicado
function rodar(valor) {
  exibirVideos(Number(valor.dataset.value));
  const video = document.getElementById('meuVideo');
  let progressoSegundos = 0;

  video.addEventListener('loadedmetadata', () => {
  progressoSegundos = (lista_progresso[Number(valor.dataset.value)] / 100) * video.duration;
  video.currentTime = progressoSegundos;
  });
  document.getElementById("video1").style.display = `flex`;
}


// função de exibir botões dos videos
function exibirCheck() {
  var checkpoint = ``
  for (let i = 0; i < videos.length; i++) {
    checkpoint += `<div data-value="${i}" onclick="rodar(this)" class="checkpoint1" id="check${i + 1}">
    <div class="capa">
    <img src="${videos[i].capa}" /></div>`
    if(lista_progresso[i] == undefined){
      checkpoint +=`
        <span>${videos[i].titulo}</span>
        <span class="texto-progresso">0%</span>
        <div class="barra"><div class="progresso" id="progresso${i}"></div></div>
      </div>`
    }else{
      console.log(lista_progresso[0]);
      checkpoint +=`
        <span>${videos[i].titulo}</span>
        <span class="texto-progresso">${lista_progresso[i]}%</span>
        <div class="barra"><div class="progresso" id="progresso${i}"></div></div>
      </div>`
    }
    
  }
  trilha.innerHTML = checkpoint;
  for(let j = 0; j < lista_progresso.length; j ++){
    document.getElementById(`progresso${j}`).style.width = `${lista_progresso[j]}%`
  }
}

function exibirVideos(valor) {
  var tutorialM = ``
  for (let j = 0; j < videos.length; j++) {
    if (valor == j) {
      tutorialM = `<div class="video">
    <img data-value="${j + 1}" onclick="fechar(this)" src="./assets/close.svg" alt="">
    <video id="meuVideo" controls>
    <source src="${videos[j].link}" type="video/mp4">
    </video>
    </div>`;
    }
  }

  video1.innerHTML = tutorialM;
};


// função de fechar video
function fechar(valor) {
  let fkTutorialVar = Number(valor.dataset.value);

  const video = document.getElementById('meuVideo');
  document.getElementById("video1").style.display = `none`;
  console.log("Tempo Total video: ", video.duration, "segundos");
  let progressoVar = progresso(video);
  video.pause();
  let fkUsuarioVar = Number(sessionStorage.ID_USUARIO);
  console.log(progressoVar, fkTutorialVar, fkUsuarioVar);

  fetch("/tutorial/cadastrarProgresso", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkUsuarioServer: fkUsuarioVar,
      fkTutorialServer: fkTutorialVar,
      progressoServer: progressoVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        setTimeout(() => {
          location.reload();
        }, "200");

      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

// Porcentagem assistida
function progresso(video) {
  let progresso = video.currentTime / video.duration * 100;
  console.log(`${parseInt(progresso)}%`);
  return parseInt(progresso);
}
