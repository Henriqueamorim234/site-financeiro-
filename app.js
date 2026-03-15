let listaHistorico = document.getElementById("lista_historico");
let listaMovimentos = [];
let listaEntrada = [];
let listaSaida = [];
let subtituloHistorico = document.getElementById("subtitulo_historico");
let historicoVazio = document.getElementById('historico_vazio');
let somaEntrada = 0;
let somaSaida = 0;


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
atualizaValor();
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
    listaMovimentos.splice(index, 1);
    atualizarTela()
    verificandoListaMovimentos()
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

    console.log(historicoVazio.style.display)
}

function atualizaValor(){


    listaMovimentos.forEach((item) => {
        if (item.tipo = 'entrada') {
            listaEntrada.push(item.valor);
                let i = 0;
            somaEntrada += listaEntrada[i];

        } else if (item.tipo = 'saida') {
            listaSaida.push(item.valor)
        }
    })

        for(i = 0; i < listaSaida.length; i++){
        somaSaida = [];
        somaSaida += listaSaida[i];
    }

    let saldo = document.getElementById('saldo_atual');

    saldo.innerHTML = somaEntrada - somaSaida;
}