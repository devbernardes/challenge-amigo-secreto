//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

// Seleciona o container onde a animação será carregada
const container = document.getElementById("lottie-container");

// Carrega a animação Lottie
const animacao = lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: true,  // Agora a animação roda infinitamente
    autoplay: true, // A animação começa automaticamente
    path: "assets/animacao.json"
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

document.addEventListener("DOMContentLoaded", function () {
    const snowContainer = document.querySelector(".snow-container");

    function createSnowflake() {
        const snowflake = document.createElement("div");
        const isFast = Math.random() > 0.5; // Define aleatoriamente se o floco será rápido ou lento

        snowflake.classList.add("snowflake", isFast ? "fast" : "slow");

        // Define posição e duração aleatórias
        snowflake.style.left = Math.random() * 100 + "vw";
        snowflake.style.animationDuration = (isFast ? (Math.random() * 2 + 3) : (Math.random() * 5 + 7)) + "s";

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

/// 1. Selecionar os elementos necessários
const inputName = document.getElementById('amigo'); // Campo de entrada
const buttonAdd = document.querySelector('.button-add'); // Botão de adicionar

// 2. Função para alterar a cor do botão com base no conteúdo
function handleButtonState() {
    // 3. Verificar se o campo não está vazio
    if (inputName.value.trim() !== "") {
        // 4. Se o campo não estiver vazio, o botão vai ficar verde imediatamente
        buttonAdd.classList.add('valid'); // Botão verde
        buttonAdd.classList.remove('invalid'); // Remove o estado vermelho

        // 5. Depois de 1 segundo, o botão volta ao estado cinza
        setTimeout(() => {
            buttonAdd.classList.remove('valid'); // Volta ao estado cinza
        }, 1000); // Tempo de 1 segundo
    } else {
        // 6. Se o campo estiver vazio, o botão ficará vermelho
        buttonAdd.classList.add('invalid'); // Botão vermelho

        // 7. Após 1 segundo, o botão volta ao estado cinza
        setTimeout(() => {
            buttonAdd.classList.remove('invalid'); // Volta ao estado cinza
        }, 1000); // Tempo de 1 segundo
    }
}

// 8. Adicionar evento de clique no botão "Adicionar"
buttonAdd.addEventListener('click', handleButtonState);

// 9. Adicionar evento de pressionamento da tecla Enter
inputName.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        // 10. Impedir o comportamento padrão (evitar form submit, por exemplo)
        event.preventDefault();

        // 11. Verificar se o campo está vazio ou não, e validar
        handleButtonState(); // Chama a função de validar o botão
    }
});