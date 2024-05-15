function popularSelect(selectId, moedas) {
    const select = document.getElementById(selectId);
    moedas.forEach(moeda => {
        const option = document.createElement('option');
        option.value = moeda.codigo;
        option.textContent = `${moeda.codigo} - ${moeda.nome}`;
        select.appendChild(option);
    });
}

// Carregar as moedas do arquivo JSON
fetch('moedas.json')
    .then(response => response.json())
    .then(data => {
        popularSelect('inputGroupSelect02', data.moedas);
        popularSelect('inputGroupSelect03', data.moedas);
    })
    .catch(error => console.error('Erro ao carregar moedas:', error));


    // Formatação input valor
function formatMoney(value) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
            urrency: 'BRL'
    });
    return formatter.format(value);
}

// Convert coin

function registrarConversao(coin1, coin2, quantidade, resultado) {
    const conversionRecord = {
        coin1: coin1,
        coin2: coin2,
        quantidade: quantidade,
        resultado: resultado
    };

    let conversoes = JSON.parse(localStorage.getItem('conversoes')) || [];
    conversoes.push(conversionRecord);
    localStorage.setItem('conversoes', JSON.stringify(conversoes));
}

async function getCoin() {
    const optcoin1 = document.getElementById("inputGroupSelect02")
    const optcoin2 = document.getElementById("inputGroupSelect03")
    const coin1 = optcoin1.value
    const coin2 = optcoin2.value

    const url = `https://v6.exchangerate-api.com/v6/532c2fb12819de32c88ceafb/latest/${coin1}`
    const response = await fetch(url)
    const data = await response.json()

    const qntd = document.getElementById("money").value
    data.conversion_rates[coin1] = qntd

    const smcoin = qntd * data.conversion_rates[coin2]
    const formattext = smcoin.toFixed(2)
    
    var result_label = document.getElementById('result')
    result_label.value = `$ ${formattext}`
    registrarConversao(coin1, coin2, qntd, formattext);

    const listaConversoes = document.getElementById('listaConversoes');
    listaConversoes.innerHTML = '';

    let conversoes = JSON.parse(localStorage.getItem('conversoes')) || [];

    conversoes.forEach(conversao => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `$${conversao.quantidade} ${conversao.coin1} = $${conversao.resultado} ${conversao.coin2}`;
        listaConversoes.appendChild(listItem);
    });
}

const inputCoin = document.getElementById("inputGroupSelect02")

inputCoin.addEventListener('change', function (){
    const inputQuatidade = document.getElementById("money")
    var selected = this.value
    inputQuatidade.placeholder = `Quantidade de ${selected}`
})

let conversoes = JSON.parse(localStorage.getItem('conversoes')) || [];

    conversoes.forEach(conversao => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `$${conversao.quantidade} ${conversao.coin1} = $${conversao.resultado} ${conversao.coin2}`;
        listaConversoes.appendChild(listItem);
    });

function limparHistorico() {
    localStorage.removeItem('conversoes');
    const listaConversoes = document.getElementById('listaConversoes');
    listaConversoes.innerHTML = '';
}


// Troca de session

const s_conversor = document.getElementById('calc')
const s_hist = document.getElementById('hist')
const s_sobre = document.getElementById('sobre')

const b_calc = document.getElementById('bcalc')
const b_hist = document.getElementById('bhist')
const b_sobre = document.getElementById('bsobre')

const calcClick = () =>{
    s_conversor.style.display = 'flex'
    s_hist.style.display = 'none'
    s_sobre.style.display = 'none'

    b_hist.classList.remove('active')
    b_sobre.classList.remove('active')

    b_calc.classList.add('active')

    var navbarToggle = document.getElementById('navbarToggle');
    var navbarCollapse = document.getElementById('navbarNavDropdown');
    navbarToggle.classList.add('collapsed');
    navbarCollapse.classList.remove('show');
}
const histClick = () =>{
    s_conversor.style.display = 'none'
    s_hist.style.display = 'flex'
    s_sobre.style.display = 'none'

    b_calc.classList.remove('active')
    b_sobre.classList.remove('active')

    b_hist.classList.add('active')

    var navbarToggle = document.getElementById('navbarToggle');
    var navbarCollapse = document.getElementById('navbarNavDropdown');
    navbarToggle.classList.add('collapsed');
    navbarCollapse.classList.remove('show');
}
const sobreClick = () =>{
    s_conversor.style.display = 'none'
    s_hist.style.display = 'none'
    s_sobre.style.display = 'flex'

    b_calc.classList.remove('active')
    b_hist.classList.remove('active')

    b_sobre.classList.add('active')

    var navbarToggle = document.getElementById('navbarToggle');
    var navbarCollapse = document.getElementById('navbarNavDropdown');
    navbarToggle.classList.add('collapsed');
    navbarCollapse.classList.remove('show');
}


// codding by Gabriel Loha