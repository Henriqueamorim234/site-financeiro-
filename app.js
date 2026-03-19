let listaHistorico = document.getElementById("lista_historico");
let tipoMovimento = document.getElementById("tipo_movimento").value
let listaMovimentos = [];
let subtituloHistorico = document.getElementById("subtitulo_historico");
let historicoVazio = document.getElementById('historico_vazio');
let saldo = 0;
let saldoAtual = document.getElementById('saldo_atual');
let index = 0;



function adicionar(){

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

listaMovimentos.push(itensDaLista)
atualizarTela()
verificandoListaMovimentos()
atualizaValor(tipoMovimento,valorMovimento);
}

function atualizarTela(){
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
</li>`;})
index++
}


function excluir(index){
    const item = listaMovimentos[index];
    if (!item) return;

    if (item.tipo === 'entrada') {
        saldo -= item.valor; // remover entrada diminui saldo
    } else if (item.tipo === 'saida') {
        saldo += item.valor; // remover saída aumenta saldo
    }

    listaMovimentos.splice(index, 1);
    atualizarTela();
    verificandoListaMovimentos();
    saldoAtual.innerHTML = saldo.toFixed(2);
}

function verificandoListaMovimentos(){
    if (listaMovimentos.length !== 0){
        historicoVazio.style.display = 'none';
        listaHistorico.classList.add('lista_historico');
        listaHistorico.classList.remove('lista_historico_vazio');
    } else  {
        historicoVazio.style.display = 'block';
        listaHistorico.classList.add('lista_historico_vazio');
        listaHistorico.classList.remove('lista_historico');
    }  
}

function atualizaValor(tipos,valor){
    if (tipos == 'entrada'){
        saldo += valor;
    } else if (tipos == 'saida') {
       saldo -= valor;
    }
    saldoAtual.innerHTML = saldo;
}


    