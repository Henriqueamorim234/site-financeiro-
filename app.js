let listaHistorico = document.getElementById("lista_historico");
let listaMovimentos = [];
let subtituloHistorico = document.getElementById("subtitulo_historico");
let historicoVazio = document.getElementById('historico_vazio');
let saldo = 0;
let saldoAtual = document.getElementById('saldo_atual');

function salvarNoStorage() {
    localStorage.setItem('listaMovimentos', JSON.stringify(listaMovimentos));
    localStorage.setItem('saldo', saldo.toString());
}

function carregarDoStorage() {
    const dados = localStorage.getItem('listaMovimentos');
    const valorSaldo = localStorage.getItem('saldo');
      listaMovimentos = JSON.parse(dados) || [];
    if (valorSaldo !== null) {
        const parseSaldo = parseFloat(valorSaldo);
        saldo = isNaN(parseSaldo) ? 0 : parseSaldo;
    }
}

function inicializar() {
    carregarDoStorage();
    atualizarTela();
    verificandoListaMovimentos();
    saldoAtual.innerHTML = saldo.toFixed(2);
}

function adicionar() {
    let tipoMovimento = document.getElementById("tipo_movimento").value;
    let valorMovimento = parseFloat(document.getElementById("valor_movimento").value);
    let descricaoMovimento = document.getElementById("descricao_movimento").value;
    let dataMovimento = document.getElementById("data_movimento").value;

    if (isNaN(valorMovimento)) {
        alert("Digite um valor válido!");
        return;
    }

    let itensDaLista = {
        tipo: tipoMovimento,
        valor: valorMovimento,
        descricao: descricaoMovimento,
        data: dataMovimento
    };

    listaMovimentos.push(itensDaLista);
    atualizaValor(tipoMovimento, valorMovimento);
    atualizarTela();
    verificandoListaMovimentos();
    salvarNoStorage();
}

function atualizarTela() {
    listaHistorico.innerHTML = '';
    listaMovimentos.forEach((item, index) => {
        listaHistorico.innerHTML += 
`<li class="item_historico">
<div class="div_historico">
<button class="historico_${item.tipo}">${item.tipo === "entrada" ? "Entrada" : "Saída"}</button>
<p class="historico_descricao">${item.descricao}</p>
</div>
<div class="div_historico">
<p class="historico_valor">R$ ${item.valor.toFixed(2)}</p>
<button class="botao_excluir" onclick="excluir(${index})">Excluir</button>
</div>
</li>`;
    });
}

function excluir(index) {
    const item = listaMovimentos[index];
    if (!item) return;

    if (item.tipo === 'entrada') {
        saldo -= item.valor;
    } else if (item.tipo === 'saida') {
        saldo += item.valor;
    }

    listaMovimentos.splice(index, 1);
    atualizarTela();
    verificandoListaMovimentos();
    saldoAtual.innerHTML = saldo.toFixed(2);
    salvarNoStorage();
}

function verificandoListaMovimentos() {
    if (listaMovimentos.length !== 0) {
        historicoVazio.style.display = 'none';
        listaHistorico.classList.add('lista_historico');
        listaHistorico.classList.remove('lista_historico_vazio');
    } else {
        historicoVazio.style.display = 'block';
        listaHistorico.classList.add('lista_historico_vazio');
        listaHistorico.classList.remove('lista_historico');
    }
}

function atualizaValor(tipos, valor) {
    if (tipos == 'entrada') {
        saldo += valor;
    } else if (tipos == 'saida') {
        saldo -= valor;
    }
    saldoAtual.innerHTML = saldo.toFixed(2);
}

inicializar();
