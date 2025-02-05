// Variáveis globais
let scrollPosicao = 0;
let usuarioAtual = '';
let sorteioRealizado = false;
let senhaTemporaria = '';
let senhasArmazenadas = JSON.parse(localStorage.getItem('senhasAmigos')) || {};

// Função personalizada para substituir os alerts nativos
function customAlert(message, isPassword = false) {
    return new Promise(resolve => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px 20px 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            z-index: 10000;
            text-align: center;
            min-width: 300px;
        `;

        // Ícone de fechar
        const closeButton = document.createElement('span');
        closeButton.innerHTML = '&times;';
        closeButton.style.cssText = `
            position: absolute;
            right: 15px;
            top: 0px;
            font-size: 40px;
            cursor: pointer;
            color: #ff4444;
            transition: all 0.3s;
        `;
        closeButton.onclick = () => {
            document.body.removeChild(modal);
            resolve(null); // Retorna null quando cancela
        };

        modal.appendChild(closeButton);

        const text = document.createElement('p');
        text.textContent = message;
        text.style.marginBottom = '20px';
        modal.appendChild(text);

        if (isPassword) {
            const input = document.createElement('input');
            input.type = 'password';
            input.maxLength = 4;
            input.inputMode = 'numeric';
            input.style.cssText = `
                width: 80%;
                margin: 0 auto 15px;
                padding: 10px;
                font-size: 20px;
                text-align: center;
                letter-spacing: 5px;
                border: 2px solid #4B69FD;
                border-radius: 8px;
            `;

            const button = document.createElement('button');
            button.textContent = 'Salvar';
            button.style.cssText = `
                padding: 10px 25px;
                background: #4B69FD;
                color: white;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                transition: transform 0.2s;
            `;

            button.onclick = () => {
                if (input.value.length === 4) {
                    document.body.removeChild(modal);
                    resolve(input.value);
                }
            };

            modal.appendChild(input);
            modal.appendChild(button);
            document.body.appendChild(modal);
            input.focus();
        } else {
            const button = document.createElement('button');
            button.textContent = 'OK';
            button.style.cssText = `
                padding: 10px 25px;
                background: #4B69FD;
                color: white;
                border: none;
                border-radius: 25px;
                cursor: pointer;
            `;

            button.onclick = () => {
                document.body.removeChild(modal);
                resolve();
            };

            modal.appendChild(button);
            document.body.appendChild(modal);
            button.focus();
        }
    });
}

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
    // Verifica se o nome já existe na lista
    if (listaDeAmigos.some(nome => nome.toLowerCase() === name.toLowerCase())) {
        customAlert("⚠️ Este nome já foi adicionado à lista!");
        return;  // Não adiciona o nome se ele já estiver na lista
    }

    inputName.placeholder = originalPlaceholder;
    inputName.classList.remove('invalid');
    buttonAdd.classList.remove('invalid');
    buttonAdd.classList.add('valid');
    listaDeAmigos.push(name);
    animateTextEntry(name);

    // Salva a lista atualizada
    salvarListaNoLocalStorage();

    // Só toca o som se o nome foi adicionado à lista (não duplicado)
    clickSound.currentTime = 0;
    setTimeout(() => clickSound.play(), 50);
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
    // Limpa qualquer listener residual clonando o botão
    const oldButton = document.getElementById('botaoSortear');
    const newButton = oldButton.cloneNode(true);
    oldButton.replaceWith(newButton);

    if (listaDeAmigos.length < 2) {
        customAlert("❄️ Precisa de pelo menos 2 participantes!");
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

    sorteioRealizado = true; // 👈 Novo estado

    // Alerta e armazenamento
    customAlert("🎉 Sorteio realizado com sucesso!");
    sessionStorage.setItem('sorteioAtual', JSON.stringify(sorteados));

    // Atualiza a interface
    const botaoSortear = document.getElementById('botaoSortear');
    document.querySelector('.button-text').textContent = 'Ver resultado do sorteio';
    botaoSortear.classList.add('efeto-pulsar');
    document.getElementById('resetarSorteio').classList.remove('hidden');

    // 🔥 Atualização crucial do listener aqui 🔥
    botaoSortear.onclick = () => abrirModal('modal-identificacao');
}

// Função para resetar o sorteio
async function resetarSorteio() {
    const confirmado = await customConfirm("⚠️ Tem certeza que deseja realizar um novo sorteio?");
    if (confirmado) {
        // Limpa todas as senhas armazenadas
        localStorage.removeItem('senhasAmigos');
        localStorage.removeItem('listaDeAmigos'); // Limpa a lista de nomes


        // Atualiza a variável global de senhas
        senhasArmazenadas = {};

        // Resto do código de reset...
        document.getElementById('botaoSortear').onclick = sortearAmigos;
        document.querySelector('.button-text').textContent = 'Sortear amigo';
        sorteioRealizado = false;
        sorteados = [];
        listaDeAmigos = [];
        usuarioAtual = ''; // Limpa o usuário atual

        document.querySelectorAll('.name-list').forEach(lista => lista.innerHTML = '');
        sessionStorage.removeItem('sorteioAtual');

        // Fecha todos os modais abertos
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
    return false;
}

// Função auxiliar para confirmação personalizada
function customConfirm(message) {
    return new Promise(resolve => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            z-index: 10000;
            text-align: center;
        `;

        const text = document.createElement('p');
        text.textContent = message;
        modal.appendChild(text);

        const btnContainer = document.createElement('div');
        btnContainer.style.marginTop = '15px';

        const simBtn = document.createElement('button');
        simBtn.textContent = 'Sim';
        simBtn.onclick = () => {
            document.body.removeChild(modal);
            resolve(true);
        };

        const naoBtn = document.createElement('button');
        naoBtn.textContent = 'Não';
        naoBtn.onclick = () => {
            document.body.removeChild(modal);
            resolve(false);
        };

        // Estilização comum para os botões
        [simBtn, naoBtn].forEach(btn => {
            btn.style.cssText = `
                padding: 8px 20px;
                margin: 0 5px;
                cursor: pointer;
                border: none;
                border-radius: 5px;
            `;
        });

        simBtn.style.background = '#4CAF50';
        simBtn.style.color = 'white';
        naoBtn.style.background = '#f44336';
        naoBtn.style.color = 'white';

        btnContainer.appendChild(simBtn);
        btnContainer.appendChild(naoBtn);
        modal.appendChild(btnContainer);
        document.body.appendChild(modal);
    });
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
        // Garantir comparação case insensitive
        const isUsuarioAtual = item.nome.toLowerCase() === usuarioAtual.toLowerCase();

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="participante">
                <span>${item.nome}</span>
                <button class="eye-button ${isUsuarioAtual ? '' : 'bloqueado'}" 
                    ${!isUsuarioAtual ? 'disabled' : ''}>
                    <i class="fas ${isUsuarioAtual ? 'fa-eye' : 'fa-lock'}"></i>
                </button>
            </div>
            <div id="reveal-${item.nome}" class="revealed-name hidden"></div>
        `;

        // Adiciona o event listener corretamente
        if (isUsuarioAtual) {
            li.querySelector('button').addEventListener('click', (e) => toggleAmigo(item.nome, e));
        }

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
    // Fecha todos os modais primeiro
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });

    // Configurações específicas
    if (modalId === 'modal-regras') {
        document.body.style.overflow = 'hidden'; // Trava o scroll
    }

    // Apenas resetar o modal de identificação se for uma nova consulta
    if (modalId === 'modal-identificacao') {
        document.getElementById('modal-titulo').textContent = '🔒 Identifique-se'
        resetarModalIdentificacao();
    }

    // Configurações comuns
    scrollPosicao = window.pageYOffset;
    document.body.classList.add('modal-aberto');
    document.body.style.top = `-${scrollPosicao}px`;

    // Exibe o modal solicitado
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    modal.focus();
}

function fecharModal(modalId) {
    document.body.classList.remove('modal-aberto');
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';

    // Restaura a posição de scroll apenas se não for o modal de resultados
    if (modalId !== 'modal-sortear') {
        window.scrollTo(0, scrollPosicao);
    }
    document.body.style.top = '';
}

// Nova função para resetar estado do modal de identificação
function resetarModalIdentificacao() {
    usuarioAtual = ''; // Só reseta se for uma nova consulta
    document.getElementById('etapa-nome').style.display = 'block';
    document.getElementById('etapa-senha').style.display = 'none';
    document.getElementById('input-identificacao').value = '';
    document.getElementById('input-senha').value = '';
    document.getElementById('modal-titulo').textContent = '🔒 Identifique-se';
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

function fecharModalCompleto() {
    // Reseta todas as variáveis temporárias
    usuarioAtual = '';
    senhaTemporaria = '';

    // Reseta os campos e etapas
    document.getElementById('etapa-nome').style.display = 'block';
    document.getElementById('etapa-senha').style.display = 'none';
    document.getElementById('input-identificacao').value = '';
    document.getElementById('input-senha').value = '';

    // Fecha o modal
    fecharModal('modal-identificacao');
}

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

function verificarNome() {
    const nomeDigitado = document.getElementById('input-identificacao').value.trim();

    if (!nomeDigitado) {
        customAlert("❌ Por favor, digite seu nome!");
        return;
    }

    // Verifica na lista de participantes
    const nomeExiste = listaDeAmigos.some(nome => 
        nome.toLowerCase() === nomeDigitado.toLowerCase()
    );

    if (!nomeExiste) {
        customAlert('❌ Seu nome não está na lista de participantes!');
        return;
    }

    usuarioAtual = nomeDigitado.toLowerCase();

    if (senhasArmazenadas[usuarioAtual]) {
        document.getElementById('modal-titulo').textContent = '🔑 Coloque sua senha aqui';
        document.getElementById('etapa-nome').style.display = 'none';
        document.getElementById('etapa-senha').style.display = 'block';
        document.getElementById('input-senha').focus();
    } else {
        document.getElementById('modal-titulo').textContent = '🔒 Identifique-se';
        cadastrarNovaSenha();
    }
}

function cadastrarNovaSenha() {
    customAlert("🔐 Crie uma senha de 4 dígitos para proteger seu amigo secreto:", true).then((senha) => {
        if (senha === null) {
            // Usuário clicou no X
            fecharModalCompleto();
            return;
        }

        if (/^\d{4}$/.test(senha)) {
            senhasArmazenadas[usuarioAtual] = senha;
            localStorage.setItem('senhasAmigos', JSON.stringify(senhasArmazenadas));
            abrirResultados();
        } else {
            customAlert("⚠️ A senha deve conter exatamente 4 dígitos numéricos!");
        }
    });
}

function verificarSenha() {
    const senhaDigitada = document.getElementById('input-senha').value;

    if (senhasArmazenadas[usuarioAtual] === senhaDigitada) {
        abrirResultados();
    } else {
        customAlert("❌ Senha incorreta! Tente novamente.");
        document.getElementById('input-senha').value = '';
    }
}

function abrirResultados() {
    fecharModal('modal-identificacao');
    abrirModal('modal-sortear');
    mostrarResultadoSorteio();
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

document.getElementById('resetarSorteio').addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation(); // Impede múltiplos handlers
    await resetarSorteio();
});

document.addEventListener('DOMContentLoaded', () => {
    // Carrega a lista salva
    carregarListaDoLocalStorage();
    
    // Verifica se há sorteio armazenado
    const sorteioSalvo = sessionStorage.getItem('sorteioAtual');

    if (sorteioSalvo) {
        sorteados = JSON.parse(sorteioSalvo);
        // Apenas prepara os dados, mas não altera o botão ainda
    }

    // Configura o botão inicial
    const botaoSortear = document.getElementById('botaoSortear');
    botaoSortear.onclick = sortearAmigos;
    botaoSortear.classList.remove('efeto-pulsar');
    document.querySelector('.button-text').textContent = 'Sortear amigo';
    document.getElementById('resetarSorteio').classList.remove('hidden');

    // Mostra o modal de regras ao carregar
    setTimeout(() => {
        abrirModal('modal-regras');
    }, 1000); // Delay para melhor experiência
});

function salvarListaNoLocalStorage() {
    localStorage.setItem('listaDeAmigos', JSON.stringify(listaDeAmigos));
}

function carregarListaDoLocalStorage() {
    const listaSalva = localStorage.getItem('listaDeAmigos');
    if (listaSalva) {
        listaDeAmigos = JSON.parse(listaSalva);
        // Atualiza a interface se necessário
        atualizarListaModal();
    }
}