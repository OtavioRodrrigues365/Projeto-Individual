
var listaNomes = ``;
var idUsuario = sessionStorage.ID_USUARIO;

// Função de pegar ranking
fetch(`/quiz/ranking`, { cache: 'no-store' }).then(function (response) {
  if (response.ok) {
    response.json().then(function (resposta) {
      console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
      exibirNomes(resposta)
    });
  } else {
    console.error('Nenhum dado encontrado ou erro na API');
  }
})
  .catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ tabela de Ranking: ${error.message}`);
  });

//Função de pegar Indicadores de Melhor tempo, Quantidade de quiz realizados e pontos acumulados de todos os quiz
fetch(`/quiz/indicadores/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
  if (response.status === 204) {
    alert('Nenhuma tentativa encontrada. Faça um quiz!');
    return;
  }
  if (response.ok) {
    response.json().then(function (resposta) {
      console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

      exibirIndicadores(resposta)
    });
  } else {
    console.error('Nenhum dado encontrado ou erro na API');
  }
})
  .catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ indicadores: ${error.message}`);
  });


//Função de pegar as ultimas 5 tentativas
fetch(`/quiz/tentativas/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
  if (response.status === 204) {
    console.log('Nenhuma tentativa encontrada. Faça um quiz!');
    return;
  }
  if (response.ok) {
    response.json().then(function (resposta) {
      console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

      exibirTentativas(resposta);
    });
  } else {
    console.error('Nenhum dado encontrado ou erro na API');
  }
})
  .catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ indicadores: ${error.message}`);
  });

// Função de pegar os 10 ultimos melhores tempos do usuário.
fetch(`/quiz/melhorTempo/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
  if (response.status === 204) {
    alert('Nenhuma tempo encontrado. Faça um quiz e veja seu tempo!');
    return;
  }
  if (response.ok) {
    response.json().then(function (resposta) {
      console.log(`Dados recebidos melhor tempo: ${JSON.stringify(resposta)}`);
      exibirMelhorTempo(resposta)
    });
  } else {
    console.error('Nenhum dado encontrado ou erro na API');
  }
})
  .catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ indicadores: ${error.message}`);
  });



// KPI´S
function exibirIndicadores(lista_i) {
  var dtTentativa = lista_i[0].dtTentativa.split("T");
  var dtTentativaSeparada = dtTentativa[0].split("-");
  var dtTentativaFormatada = `${dtTentativaSeparada[2]}/${dtTentativaSeparada[1]}/${dtTentativaSeparada[0]}`
  dtMelhorTempo.innerHTML = `data da tentativa: ${dtTentativaFormatada}`;
  mTempo.innerHTML = `${lista_i[0].MelhorTempo}`;
  quantidadeTotal.innerHTML = `${lista_i[0].QuantidadeQuiz}`;
  pontosTotal.innerHTML = `${lista_i[0].PontosTotal}`
}

// RANKING
function exibirNomes(lista) {
  var dados = ``;
  dados = `<table><tbody>
    <tr>
    <th>Nome</th>
    <th>Pontos</th>
    <th>Tempo</th>
    </tr>`;
  for (var i = 0; i < 10; i++) {
    dados += `<tr>
      <th>${lista[i].Nome}</th>
      <th>${lista[i].Pontos}</th>
      <th>${lista[i].Tempo}</th>
      </tr>`;
  };
  dados += `</tbody></table>`
  dadosRanking.innerHTML = dados;
}



const lista_pontos = [];
const lista_tentativa = [];

//Função de exibir ultimas 5 tentativas
function exibirTentativas(dados) {
  // tratando os dados pra cada tipo de tamanho
  if (dados.length < 1) {
    alert('Realize o quiz para ter seus pontos');
  } else if (dados.length <= 5) {
    for (var i = dados.length - 1; i >= 0; i--) {
      lista_pontos.push(dados[i].pontos)
      lista_tentativa.push(`${i + 1}° Tentativa`);
    }
  } else {
    for (var i = dados.length - 1; i >= dados.length - 5; i--) {
      lista_pontos.push(dados[i].pontos)
      lista_tentativa.push(`${i + 1}° Tentativa`);
    }
  }


  console.log(lista_tentativa)

  const grafico1 = document.getElementById('grafico1');

  new Chart(grafico1, {
    type: 'line',
    data: {
      labels: lista_tentativa.reverse(),
      datasets: [{
        label: 'Pontos',
        data: lista_pontos,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

console.log(lista_pontos);

// graficos
const lista_tempo = [];
const lista_dtMelhorTempo = []

function exibirMelhorTempo(dados){
   if (dados.length < 1) {
    alert('Realize o quiz para ter seus pontos');
  } else if (dados.length <= 10) {
    for (var i = dados.length - 1; i >= 0; i--) {
      var tempoSeparado = dados[i].duracao.split(":");
      var total = (Number(tempoSeparado[1])*60)+Number(tempoSeparado[2]);

      lista_tempo.push(total);
      var dtFormatada =  dados[i].dtTentativa.split("T");
      dtFormatada = dtFormatada[0].split("-");
      dtFormatada = `${dtFormatada[2]}/${dtFormatada[1]}/${dtFormatada[0]}`
      lista_dtMelhorTempo.push(dtFormatada);
    }
  } else {
    for (var i = dados.length - 1; i >= dados.length - 10; i--) {
      var tempoSeparado = dados[i].duracao.split(":");
      var total = (Number(tempoSeparado[1])*60)+Number(tempoSeparado[2]);

      lista_tempo.push(total);
      var dtFormatada =  dados[i].dtTentativa.split("T");
      dtFormatada = dtFormatada[0].split("-");
      dtFormatada = `${dtFormatada[2]}/${dtFormatada[1]}/${dtFormatada[0]}`
      lista_dtMelhorTempo.push(dtFormatada);
    }
  }

  const grafico3 = document.getElementById('grafico3');

new Chart(grafico3, {
  type: 'bar',
  data: {
    labels: lista_dtMelhorTempo.reverse(),
    datasets: [{
      label: 'Tempo em Segundos',
      data: lista_tempo.reverse(),
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


  console.log(lista_tempo)
}
const grafico2 = document.getElementById('grafico2');

new Chart(grafico2, {
  type: 'doughnut',
  data: {
    labels: ['Acessórios', 'Armas', 'Animais'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


