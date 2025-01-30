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
        snowflake.classList.add("snowflake");

        // Posição inicial aleatória
        snowflake.style.left = Math.random() * 100 + "vw";
        snowflake.style.animationDuration = Math.random() * 3 + 2 + "s"; // Duração aleatória
        snowflake.style.opacity = Math.random();

        snowContainer.appendChild(snowflake);

        // Remove o floco após cair
        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }

    // Criar flocos a cada 300ms
    setInterval(createSnowflake, 300);
});
