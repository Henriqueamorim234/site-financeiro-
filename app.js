let listaHistorico = document.getElementById("lista_historico");
listaHistorico.innerHTML = ''
let subtituloHistorico = document.getElementById("subtitulo_historico");

if (listaHistorico == ''){
    listaHistorico.classList .add("lista_vazia");
    subtituloHistorico.innerHTML = "Nenhum movimento registrado";
}

function adicionar(){

let tipoMovimento = document.getElementById("tipo_movimento").value; 
let valorMovimento = parseFloat(document.getElementById("valor_movimento").value);
let descricaoMovimento = document.getElementById("descricao_movimento").value;
let dataMovimento = document.getElementById("data_movimento").value;

if (isNaN(valorMovimento)) {
    alert("Digite um valor válido!");
    return;
}

let listaHistorico = document.getElementById("lista_historico");

listaHistorico.innerHTML += `<li class="item_historico"> 
    <div class="div_historico">
        <button class="historico_${tipoMovimento}">${tipoMovimento}</button>
        <p class="historico_descricao">${descricaoMovimento}</p>
    </div>
    <div class="div_historico">    
        <p class="historico_valor">R$ ${valorMovimento.toFixed(2)}</p> 
        <button class="botao_excluir" onclick="excluir(0)">Excluir</button>
    </div>    
</li>`; 
}
