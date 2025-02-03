// Variáveis globais
let scrollPosicao = 0;

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
let listaDeAmigos = [];
let sorteados = [];

// 🎁 Som do presente
const presentSound = new Audio('assets/som-presente.mp3');

// Sons de interface
const clickSound = new Audio('assets/clique-adicionar.mp3');
clickSound.volume = 0.2;
const errorSound = new Audio('assets/som-erro.mp3');

// ✅ Evento de clique no botão "Adicionar"
buttonAdd.addEventListener('click', () => {
    const inputValue = inputName.value.trim();

    if (inputValue === "") {
        handleInvalidInput();
        errorSound.play().catch(() => { });
    } else {
        handleValidInput(inputValue);
        inputName.value = "";
        clickSound.currentTime = 0;
        setTimeout(() => clickSound.play(), 50);
    }
});

// ✅ Restaura o estado original quando o input recebe foco
inputName.addEventListener('focus', resetInputState);

// 🚫 Input inválido
function handleInvalidInput() {
    errorSound.play().catch(() => { });
    inputName.value = '';
    inputName.placeholder = 'Por favor, preencha o campo corretamente!';
    inputName.classList.add('invalid');
    buttonAdd.classList.add('invalid');
    buttonAdd.classList.remove('valid');
}

// ✅ Input válido
function handleValidInput(name) {
    inputName.placeholder = originalPlaceholder;
    inputName.classList.remove('invalid');
    buttonAdd.classList.remove('invalid');
    buttonAdd.classList.add('valid');
    listaDeAmigos.push(name);
    animateTextEntry(name);
}

// 🔄 Restaura estado do input
function resetInputState() {
    inputName.placeholder = originalPlaceholder;
    inputName.classList.remove('invalid');
    buttonAdd.classList.remove('invalid');
}

// ✅ Captura evento "Enter"
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter" && document.activeElement === inputName) {
        event.preventDefault();
        buttonAdd.click();
    }
    setTimeout(() => {
        buttonAdd.classList.remove('valid', 'invalid');
    }, 1150);
});

// 🏆 Animação do texto + presente
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

    tempText.animate([
        { transform: 'translate(-50%, 0)', opacity: 1 },
        { transform: `translate(-50%, -200px) scale(1.5)`, opacity: 1, offset: 0.7 },
        { transform: `translate(-50%, -220px) scale(0)`, opacity: 0 }
    ], {
        duration: 2500,
        easing: 'ease-out'
    });

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

// 🌟 Efeito de clique do botão
buttonAdd.addEventListener('mouseup', () => {
    setTimeout(() => {
        buttonAdd.classList.remove('valid', 'invalid');
    }, 1000);
});

// 🗑️ Funcionalidades da lista
document.getElementById('mostrarLista').addEventListener('click', (e) => {
    e.preventDefault();
    abrirModal('listaModal');
    atualizarListaModal();
});

// 🎲 Função de Sorteio
function sortearAmigos() {
    if (listaDeAmigos.length < 2) {
        alert("❄️ Precisa de pelo menos 2 participantes!");
        return;
    }

    const uniqueNames = new Set(listaDeAmigos);
    if (uniqueNames.size !== listaDeAmigos.length) {
        alert("⚠️ Nomes repetidos encontrados!");
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
    abrirModal('modal-identificacao');
}

// Funções auxiliares do sorteio
function validarSorteio(shuffled) {
    return shuffled.every((nome, index) =>
        nome !== shuffled[(index + 1) % shuffled.length]
    );
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 📜 Exibe resultados
function mostrarResultadoSorteio() {
    const lista = document.getElementById('modal-resultados');
    lista.innerHTML = '';

    sorteados.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="participante">
                <span>${item.nome}</span>
                <button class="eye-button" data-nome="${item.nome}">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
            <div id="reveal-${item.nome}" class="revealed-name hidden">
                ${item.amigoSecreto}
            </div>
        `;
        lista.appendChild(li);
    });
}

function toggleAmigo(nome, event) {
    const elemento = document.getElementById(`reveal-${nome}`);
    const button = event.currentTarget;
    const icon = button.querySelector('i');

    // Revelar/ocultar imediatamente
    const isHidden = elemento.classList.toggle('hidden');
    elemento.style.display = isHidden ? 'none' : 'block';
    icon.classList.toggle('fa-eye-slash', !isHidden);
    icon.classList.toggle('fa-eye', isHidden);

    if (!isHidden) {
        const resultado = sorteados.find(item => item.nome === nome);
        elemento.textContent = resultado.amigoSecreto;
        
        // Animação não interfere no clique
        elemento.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 200,
            fill: 'forwards' // Mantém o estado final
        });
    }
}

// 🖼️ Controle de Modais
function abrirModal(modalId) {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    scrollPosicao = window.pageYOffset;
    document.body.classList.add('modal-aberto');
    document.body.style.top = `-${scrollPosicao}px`;
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    modal.focus();
}

function fecharModal(modalId) {
    document.body.classList.remove('modal-aberto');
    const modal = document.getElementById(modalId);
    modal.style.display = 'none'; // 👈 Garanta que está ocultando
    window.scrollTo(0, scrollPosicao);
    document.body.style.top = '';
}

// Event Listeners para modais
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        fecharModal(btn.closest('.modal').id);
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        fecharModal(e.target.id);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.style.display === 'block') {
                fecharModal(modal.id);
            }
        });
    }
});

// 🗑️ Atualização da lista
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
    if (index === -1) return;

    listaDeAmigos.splice(index, 1);
    atualizarListaModal();

    const listaPrincipal = document.getElementById('listaAmigos');
    if (listaPrincipal) {
        const items = listaPrincipal.querySelectorAll('li');
        if (items[index]) items[index].remove();
    }
}

function verificarIdentificacao() {
    const nomeDigitado = document.getElementById('input-identificacao').value.trim();
    const nomeNormalizado = nomeDigitado.toLowerCase();

    // Verificar se existe na lista (case-insensitive)
    const usuarioEncontrado = listaDeAmigos.find(nome =>
        nome.toLowerCase() === nomeNormalizado
    );

    // Se NÃO encontrou o usuário
    if (!usuarioEncontrado) {
        alert("🚫 Nome não está na lista de participantes!");
        document.getElementById('input-identificacao').value = ""; // Limpa o campo
        return; // 👈 Impede totalmente a execução
    }

    // Se passou da validação (nome existe)
    usuarioAtual = usuarioEncontrado; // Mantém a grafia original
    fecharModal('modal-identificacao');
    abrirModal('modal-sortear');
    iniciarRevelacaoTemporaria();
}

function iniciarRevelacaoTemporaria() {
    const elemento = document.querySelector(`#reveal-${usuarioAtual}`);
    const button = document.querySelector(`button[data-nome="${usuarioAtual}"]`);

    if (!elemento || !button) {
        console.error('Elemento não encontrado!');
        return;
    }

    // Revela o nome
    elemento.classList.remove('hidden');
    elemento.style.display = 'block';

    // Altera o ícone para "olho fechado"
    const icon = button.querySelector('i');
    icon.classList.replace('fa-eye', 'fa-eye-slash');

    // Oculta após 5 segundos
    setTimeout(() => {
        elemento.classList.add('hidden');
        elemento.style.display = 'none';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }, 5000);
}