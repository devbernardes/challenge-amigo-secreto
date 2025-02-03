// 🎭 Animação do botão "Sortear"
document.addEventListener('DOMContentLoaded', function () {
    lottie.loadAnimation({
        container: document.getElementById("play-animation"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "assets/play-animation.json",
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
    });
});

// 🎁 Animação do presente
const presentAnimation = lottie.loadAnimation({
    container: document.getElementById('lottie-container'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'assets/animacao.json'
});

// 🎅 Animação do Papai Noel
document.addEventListener('DOMContentLoaded', function () {
    lottie.loadAnimation({
        container: document.getElementById('santa'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/santa-animation.json'
    });
});

// ❄️ Efeito de neve
document.addEventListener('DOMContentLoaded', function () {
    setInterval(() => {
        const snowflake = document.createElement('div');
        const isFast = Math.random() > 0.5;
        snowflake.classList.add("snowflake", isFast ? 'fast' : 'slow');
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = (isFast ? (Math.random() * 2 + 3) : (Math.random() * 5 + 7)) + 's';
        document.querySelector('.snow-container').appendChild(snowflake);
        setTimeout(() => snowflake.remove(), isFast ? 5000 : 8000);
    }, 200);
});

// 📌 Referências dos elementos
const inputName = document.getElementById('amigo');
const buttonAdd = document.querySelector('.button-add');
const originalPlaceholder = inputName.placeholder;
let listaDeAmigos = []; // Lista dinâmica de participantes
let sorteados = []; // Lista para armazenar o resultado do sorteio

// 🎁 Som do presente
const presentSound = new Audio('assets/som-presente.mp3');

// som do clique adicionar
const clickSound = new Audio('assets/clique-adicionar.mp3');
clickSound.volume = 0.2; // Volume mais baixo que o som do presente

// som do erro botão adicionar
const errorSound = new Audio('assets/som-erro.mp3');

// ✅ Evento de clique no botão "Adicionar"
buttonAdd.addEventListener('click', () => {
    const inputValue = inputName.value.trim();

    // Se o input for inválido
    if (inputValue === "") {
        handleInvalidInput();
        errorSound.play().catch(() => { }); // Toca som de erro
    } else {
        // Se o input for válido
        handleValidInput(inputValue);
        inputName.value = "";

        // Aqui, o som de clique é tocado apenas quando o input é válido
        clickSound.currentTime = 0; // Reinicia o som de clique
        setTimeout(() => clickSound.play(), 50); // Toca som de clique
    }
});

// ✅ Restaura o estado original quando o input recebe foco
inputName.addEventListener('focus', resetInputState);

// 🚫 Input inválido: feedback visual
function handleInvalidInput() {
    errorSound.play().catch(() => { }); // Toca som de erro
    inputName.value = '';
    inputName.placeholder = 'Por favor, preencha o campo corretamente!';
    inputName.classList.add('invalid');
    buttonAdd.classList.add('invalid');
    buttonAdd.classList.remove('valid');
}

// ✅ Input válido: adiciona à lista e faz a animação
function handleValidInput(name) {
    inputName.placeholder = originalPlaceholder;
    inputName.classList.remove('invalid');
    buttonAdd.classList.remove('invalid');
    buttonAdd.classList.add('valid');

    listaDeAmigos.push(name);
    animateTextEntry(name);
}

// 🔄 Restaura estado do input ao focar
function resetInputState() {
    inputName.placeholder = originalPlaceholder;
    inputName.classList.remove('invalid');
    buttonAdd.classList.remove('invalid');
}

// ✅ Captura evento "Enter" no teclado
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter" && document.activeElement === inputName) {
        event.preventDefault();
        buttonAdd.click();
    }
    setTimeout(() => {
        buttonAdd.classList.remove('valid', 'invalid');
    }, 1150);
});

// 🏆 Animação do texto + presente com som
function animateTextEntry(name) {
    const inputBox = inputName.getBoundingClientRect();
    const inputTextX = inputBox.left + inputBox.width / 2;
    const inputTextY = inputBox.top + inputBox.height / 2;

    let tempText = document.createElement('span');
    tempText.innerText = name;
    tempText.classList.add('moving-text');

    tempText.style.position = 'absolute';
    tempText.style.left = `${inputTextX}px`;
    tempText.style.top = `${inputTextY}px`;
    tempText.style.fontSize = '20px';
    tempText.style.fontWeight = 'bold';
    tempText.style.color = 'black';

    document.body.appendChild(tempText);

    // Animação do texto
    tempText.animate([
        { transform: 'translate(-50%, 0)', opacity: 1 },
        { transform: `translate(-50%, -200px) scale(1.5)`, opacity: 1, offset: 0.7 },
        { transform: `translate(-50%, -220px) scale(0)`, opacity: 0 }
    ], {
        duration: 2500,
        easing: 'ease-out'
    });

    // Controle do som e animação do presente
    setTimeout(() => {
        presentSound.currentTime = 0;
        presentSound.volume = 0.3;
        presentSound.play().catch(error => console.log('Autoplay bloqueado'));
        presentAnimation.goToAndPlay(0, true);
    }, 1800);

    setTimeout(() => {
        tempText.remove();
        presentAnimation.stop();
    }, 2500);
}

// 🌟 Efeito de clique do botão "Adicionar"
buttonAdd.addEventListener('mouseup', () => {
    setTimeout(() => {
        buttonAdd.classList.remove('valid', 'invalid');
    }, 1000);
});

// 🗑️ Funcionalidades da lista
document.getElementById('mostrarLista').addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.getElementById('listaModal');
    modal.style.display = 'block';
    modal.focus();  // Garantindo o foco no modal quando ele abrir
    atualizarListaModal();
    // Fechar o modal ao pressionar a tecla Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
});

window.addEventListener('click', (e) => {
    if (e.target.id === 'listaModal') {
        document.getElementById('listaModal').style.display = 'none';
    }
});

function atualizarListaModal() {
    const lista = document.getElementById('listaNomes');
    lista.innerHTML = '';

    if (listaDeAmigos.length === 0) {
        lista.innerHTML = '<li style="text-align:center; color:#666">Nenhum nome adicionado ainda</li>';
        return;
    }

    const ordenados = [...listaDeAmigos].sort((a, b) => a.localeCompare(b));

    ordenados.forEach(nome => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${nome}</span>
            <span class="lixeira" onclick="removerNome('${nome}')">🗑️</span>
        `;
        lista.appendChild(li);
    });
}

function removerNome(nome) {
    const index = listaDeAmigos.indexOf(nome);

    if (index !== -1) {
        listaDeAmigos.splice(index, 1);

        // Atualiza ambas as listas
        atualizarListaModal();
        const listaPrincipal = document.getElementById('listaAmigos');

        if (listaPrincipal) {
            const items = listaPrincipal.querySelectorAll('li');
            if (items[index]) {
                items[index].remove();
            }
        }
    }
}

// 🎲 Função de Sorteio de Amigos Secretos (atualizada)
function sortearAmigos() {
    if (listaDeAmigos.length < 2) {
        alert("❄️ Precisa de pelo menos 2 participantes para o sorteio!");
        return;
    }

    // Verifica se todos os nomes são únicos
    const uniqueNames = new Set(listaDeAmigos);
    if (uniqueNames.size !== listaDeAmigos.length) {
        alert("⚠️ Nomes repetidos encontrados! Todos os participantes devem ter nomes únicos.");
        return;
    }

    let shuffled = [...listaDeAmigos];
    do {
        shuffled = shuffle([...listaDeAmigos]);
    } while (!validarSorteio(shuffled));

    sorteados = shuffled.map((nome, index) => ({
        nome,
        amigoSecreto: shuffled[(index + 1) % shuffled.length]
    }));

    mostrarResultadoSorteio();
    abrirModalSorteio();
}

// Função para validar o sorteio
function validarSorteio(shuffled) {
    return shuffled.every((nome, index) =>
        nome !== shuffled[(index + 1) % shuffled.length]
    );
}

// 📜 Exibe o Resultado do Sorteio no Modal (atualizada)
function mostrarResultadoSorteio() {
    const lista = document.getElementById('modal-resultados');
    lista.innerHTML = '';

    sorteados.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'reveal-container';
        li.innerHTML = `
            <div class="participante">
                <span>${item.nome}</span>
                <button class="reveal-button" onclick="revelarAmigo('${item.nome}')">
                    Revelar Amigo Secreto
                </button>
            </div>
            <div id="reveal-${item.nome}" class="revealed-name hidden"></div>
        `;
        lista.appendChild(li);
    });
}

// Revelar o amigo secreto (atualizada)
function revelarAmigo(nome) {
    const resultado = sorteados.find(item => item.nome === nome);
    const elemento = document.getElementById(`reveal-${nome}`);

    elemento.textContent = resultado.amigoSecreto;
    elemento.classList.remove('hidden');
    elemento.style.display = 'block';

    // Animação adicional
    elemento.animate([
        { transform: 'rotateY(90deg)', opacity: 0 },
        { transform: 'rotateY(0deg)', opacity: 1 }
    ], {
        duration: 800,
        easing: 'ease-out'
    });
}

// Funções para controlar o modal
function abrirModalSorteio() {
    const modal = document.getElementById('modal-sortear');
    modal.style.display = 'block';

    // Foco automático no modal para scroll com teclado
    modal.focus();

    // Ajuste de scroll para topo
    modal.querySelector('.modal-list').scrollTo(0, 0);

    // Habilitar scroll suave
    modal.querySelector('.modal-list').style.scrollBehavior = 'smooth';

    // Fechar com ESC
    document.addEventListener('keydown', function fecharComESC(event) {
        if (event.key === 'Escape') fecharModalSorteio();
    });
}

function fecharModalSorteio() {
    document.getElementById('modal-sortear').style.display = 'none';
}

// Fechar modal da lista
function fecharModalLista() {
    document.getElementById('listaModal').style.display = 'none';
}

// Adicione event listeners para os novos X
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

// 🌀 Algoritmo de Embaralhamento (Fisher-Yates) - Mantido
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}