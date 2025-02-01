// Música de fundo
document.addEventListener('click', function () {
    const audio = document.getElementById("background-music");

    // Começa o áudio
    audio.play();

    // Define o volume para um valor baixo logo após iniciar
    audio.volume = 0.03; // Ajuste para o volume desejado
});

// Animação do botão "Sortear"
document.addEventListener('DOMContentLoaded', function () {
    const animacaoPlay = lottie.loadAnimation({
        container: document.getElementById("play-animation"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "assets/play-animation.json",
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet' // Mantém proporção
        }
    });
});

// Bloquear o scroll nos campos de input e botão "Sortear"
document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector(".input-name");
    const buttonDraw = document.querySelector(".button-draw");

    function bloquearScroll(event) {
        event.preventDefault();
    }

    input.addEventListener("wheel", bloquearScroll);
    buttonDraw.addEventListener("wheel", bloquearScroll);
});

// Carregar animação do presente
const container = document.getElementById('lottie-container');
const animacao = lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: true,  // A animação roda infinitamente
    autoplay: true, // A animação começa automaticamente
    path: 'assets/animacao.json'
});

// Carregar animação do Papai Noel
document.addEventListener('DOMContentLoaded', function () {
    const santaContainer = document.getElementById('santa');
    lottie.loadAnimation({
        container: santaContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/santa-animation.json'
    });
});

// Função chamada quando o botão "Adicionar" for clicado
const inputName = document.getElementById('amigo');
const buttonAdd = document.querySelector('.button-add');
const originalPlaceholder = inputName.placeholder;  // O placeholder original


document.addEventListener('DOMContentLoaded', () => {

    buttonAdd.addEventListener('click', () => {
        console.log("Campo de entrada:", inputName.value);  // Verifique o valor atual do input

        if (inputName.value.trim() === "") {
            inputName.value = '';  // Limpa o valor do input
            inputName.placeholder = 'Por favor, preencha o campo corretamente!';  // Exibe a mensagem de erro no placeholder
            inputName.classList.add('invalid');   // Altera a classe do input para erro
            buttonAdd.classList.add('invalid');   // Altera a classe do botão para erro
            buttonAdd.classList.remove('valid');  // Remove a classe de sucesso
            errorMessage.style.display = 'block'; // Exibe a mensagem de erro
        } else {
            inputName.placeholder = originalPlaceholder;  // Restaura o placeholder original
            errorMessage.style.display = 'none';  // Esconde a mensagem de erro
            inputName.classList.remove('invalid');  // Remove a classe 'invalid'
            buttonAdd.classList.remove('invalid');  // Remove a classe 'invalid' do botão
            buttonAdd.classList.add('valid');  // Altera a classe do botão para sucesso

            // Adicionar o nome à lista
            const nomeAmigo = inputName.value.trim();
            const listaAmigos = document.getElementById("listaAmigos");
            const listaItem = document.createElement("li");  // Cria um novo item de lista
            listaItem.textContent = nomeAmigo;  // Coloca o nome no item de lista
            listaAmigos.appendChild(listaItem);  // Adiciona o item na lista

            // Limpa o campo de input
            inputName.value = "";
        }
    });
});


// Quando o input é focado, restaura o placeholder original e esconde a mensagem de erro
inputName.addEventListener('focus', () => {
    inputName.placeholder = originalPlaceholder;  // Restaura o texto original do placeholder
    inputName.classList.remove('invalid');  // Remove a classe de erro
    buttonAdd.classList.remove('invalid');  // Remove a classe de erro do botão
});


// Função para criar flocos de neve
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

// Função para testar a cor do botão ao clicar
buttonAdd.addEventListener('click', () => {
    if (inputName.value.trim() !== "") {
        buttonAdd.classList.add('valid');
        buttonAdd.classList.remove('invalid');
    } else {
        buttonAdd.classList.add('invalid');
        buttonAdd.classList.remove('valid');
    }
});

// Previne o scroll nas seções
document.querySelector('.input-section').addEventListener('wheel', function (event) {
    event.preventDefault();
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
