//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

// Animação play (sortear)
document.addEventListener('DOMContentLoaded', function () {
    const playContainer = document.getElementById('play-animation');

    lottie.loadAnimation({
        container: playContainer,  // Elemento onde será renderizado
        renderer: 'svg',
        loop: true,  // Animação contínua
        autoplay: true,
        path: 'assets/play-animated.json'  // Substitua pelo caminho correto do seu arquivo JSON
    });
});

// Seleciona o container onde a animação do presente será carregada
const container = document.getElementById('lottie-container');

// Carrega a animação Lottie
const animacao = lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: true,  // Agora a animação roda infinitamente
    autoplay: true, // A animação começa automaticamente
    path: 'assets/animacao.json'
});

// Carregar a animação Lottie no elemento da div
document.addEventListener('DOMContentLoaded', function () {
    const santaContainer = document.getElementById('santa');  // Seleciona o contêiner da animação

    lottie.loadAnimation({
        container: santaContainer,  // O contêiner onde a animação será inserida
        renderer: 'svg',            // Tipo de renderização
        loop: true,                 // Faz a animação repetir
        autoplay: true,             // A animação começa automaticamente
        path: 'assets/santa-animation.json'  // Caminho para o arquivo JSON da animação
    });
    
});


// Espera o DOM carregar antes de rodar o código
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão e associa o evento
    document.querySelector('.button-add').addEventListener('click', adicionarAmigo);
});

// Função que será chamada quando o botão for clicado
function adicionarAmigo() {
    // Aqui vai a lógica para adicionar o amigo
    console.log('Amigo adicionado!');
}

document.addEventListener('DOMContentLoaded', function () {
    const snowContainer = document.querySelector('.snow-container');

    function createSnowflake() {
        const snowflake = document.createElement('div');
        const isFast = Math.random() > 0.5; // Define aleatoriamente se o floco será rápido ou lento

        snowflake.classList.add("snowflake", isFast ? 'fast' : 'slow');

        // Define posição e duração aleatórias
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = (isFast ? (Math.random() * 2 + 3) : (Math.random() * 5 + 7)) + 's';

        snowContainer.appendChild(snowflake);

        // Remove o floco após cair
        setTimeout(() => {
            snowflake.remove();
        }, isFast ? 5000 : 8000); // Tempo maior para os flocos lentos
    }

    // Criar flocos de neve a cada 200ms
    setInterval(createSnowflake, 200);
});


// testando funcionalide do botão adicionar

const inputName = document.getElementById('amigo');
const buttonAdd = document.querySelector('.button-add');

// Adiciona classe ao clicar
buttonAdd.addEventListener('click', () => {
    if (inputName.value.trim() !== "") {
        buttonAdd.classList.add('valid');
        buttonAdd.classList.remove('invalid');
    } else {
        buttonAdd.classList.add('invalid');
        buttonAdd.classList.remove('valid');
    }
});

// Mantém a cor visível enquanto o mouse estiver sobre o botão
buttonAdd.addEventListener('mouseleave', () => {
    setTimeout(() => {
        buttonAdd.classList.remove('valid', 'invalid');
    }, 1000);
});

// Permite ativação via teclado (Espaço ou Enter)
document.addEventListener('keydown', (event) => {
    if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        buttonAdd.classList.add(inputName.value.trim() !== "" ? 'valid' : 'invalid');

        setTimeout(() => {
            buttonAdd.classList.remove('valid', 'invalid');
        }, 1000);
    }
});

// Remove a cor vermelha ou verde depois de 1 segundo
buttonAdd.addEventListener('mouseup', () => {
    setTimeout(() => {
        buttonAdd.classList.remove('valid', 'invalid');
    }, 1000); // Tempo para voltar à cor laranja
});
