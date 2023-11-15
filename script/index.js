const result_label = document.getElementById("result")

// https://v6.exchangerate-api.com/v6/532c2fb12819de32c88ceafb/latest/COIN

// Get Coin conversion
async function getCoin() {
    const optcoin1 = document.getElementById("selectCoin1")
    const optcoin2 = document.getElementById("selectCoin2")
    const coin1 = optcoin1.value
    const coin2 = optcoin2.value

    const url = `https://v6.exchangerate-api.com/v6/532c2fb12819de32c88ceafb/latest/${coin1}`
    const response = await fetch(url)
    const data = await response.json()

    const qntd = document.getElementById("input-qnt").value
    data.conversion_rates[coin1] = qntd

    const smcoin = qntd * data.conversion_rates[coin2]
    const formattext = smcoin.toFixed(2)

    result_label.innerHTML = `${coin2} ${formattext}`
}

const inputCoin = document.getElementById("selectCoin1")

inputCoin.addEventListener('change', function (){
    const inputQuatidade = document.getElementById("input-qnt")
    var selected = this.value
    inputQuatidade.placeholder = `Quantidade de ${selected}`
})

