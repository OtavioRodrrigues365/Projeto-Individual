const videos = [
    {
        Titulo: "Como construir uma Base no DayZ 2025",
        link: "./assets/tutorial/comoConstruir.mp4",
        minutos: 12,
        segundos: 21
    },
    {
        Titulo: "Como caçar animais e estratégias de caça",
        link: "./assets/tutorial/comoCaçar.mp4",
        minutos: 12,
        segundos: 5
    }
];

function rodar(){
    document.getElementById("video1").style.display = `flex`;
}

function exibirVideos(){
var checkpoint = ``
for(let i = 0; i < videos.length; i++){
    checkpoint += `<div data-value="${i+1}" onclick="rodar(this)" class="checkpoint1" id="check1">
      <span>${i+1}</span>
    </div>`
}

    trilha.innerHTML = checkpoint;

var tutorialM = ``
for(let j = 0; j < videos.length; j++){
    tutorialM = `<div class="video">
    <img data-value="${j + 1}" onclick="fechar(this)" src="./assets/close.svg" alt="">
    <video id="meuVideo" width="600" controls>
    <source src="./assets/tutorial/comoConstruir.mp4" type="video/mp4">
    </video>
    </div>`;
    }

    video1.innerHTML = tutorialM;
};


function fechar(valor){
    let fkTutorialVar = valor.dataset.value;

    const video = document.getElementById('meuVideo');
    document.getElementById("video1").style.display = `none`;
    console.log("Tempo Total video: ", video.duration, "segundos");
    let progressoVar =  progresso(video);
    video.pause();
    let fkUsuarioVar = Number(sessionStorage.ID_USUARIO);
    console.log(progressoVar, fkTutorialVar,fkUsuarioVar);

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
          alert("Deu certo")
          setTimeout(() => {
            window.location = "tutoriais.html";
          }, "2000");

        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
}


function progresso(video){    
    let progresso = video.currentTime / video.duration * 100;
    console.log(`${parseInt(progresso)}%`);
    return parseInt(progresso);
}



const barra = document.querySelector(".barra");
function desabilitarProgresso(){
    progresso.setAttribute("role","barra");
    progresso.setAttribute("aria-valuenow",0);
    progresso.setAttribute("aria-live","polite");
};

// function habilitarProgresso(){};


