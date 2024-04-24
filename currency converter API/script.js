let body = document.getElementsByClassName("body")[0];
body.innerHTML = `
  <div class="wrapper">
    <header>Currency Converter</header>
    <form action="#">
      <div class="amount">
        <p>Enter Amount</p>
        <input type="text" value="1">
      </div>
      <div class="drop-list">
        <div class="from">
          <p>From</p>
          <div class="select-box">
            <img src="https://flagcdn.com/48x36/us.png" alt="flag">
            <select> </select>
          </div>
        </div>
        <div class="icon"><i class="fas fa-exchange-alt"></i></div>
        <div class="to">
          <p>To</p>
          <div class="select-box">
            <img src="https://flagcdn.com/48x36/np.png" alt="flag">
            <select> </select>
          </div>
        </div>
      </div>
      <div class="exchange-rate"></div>
      <button>Get Exchange Rate</button>
    </form>
  </div>
`;


document.body.appendChild(body);
  const droplist =document.querySelectorAll("form select"),
  fromCurrency =document.querySelector(".from selector"),
  toCurrency = document.querySelector(".to select"),
  getButton = document.querySelector(".from button");

for (let i=0; i<droplist.length; i++) {
    for (let currency_code in country_list) {
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "NPR" ? "slelected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        droplist[i].insertAdjacentHTML("beforeend", optionTag);
    }
        droplist[i].addEventListener("change", e=> {
             loadFlag(e.target);

        })

    }

    function loadFlag(element) {
        for (let code in country_list) {
            if (code == element.value) {
                let imgTag = element.parentElement.querrySelector("img")
                imgTag.src =`https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
            }
        }
    }

     window.addEventListener("load", () => {
        getExchangeRate();
     })

     getButton.addEventListener("click", e => {
        e.preventDefault();
        getExchangeRate();
    });
    
    const exchangeIcon = document.querySelector("form .icon");
    exchangeIcon.addEventListener("click", () => {
        let tempCode = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = tempCode;
        loadFlag(fromCurrency);
        loadFlag(toCurrency);
        getExchangeRate();
    })
    
    function getExchangeRate() {
        const amount = document.querySelector("form input");
        const exchangeRateTxt = document.querySelector("form .exchange-rate");
        let amountVal = amount.value;
        if (amountVal == "" || amountVal == "0") {
            amount.value = "1";
            amountVal = 1;
        }
        exchangeRateTxt.innerText = "Getting exchange rate...";
        let url = `https://v6.exchangerate-api.com/v6/${ApiKey}/latest/${fromCurrency.value}`;
        fetch(url).then(response => response.json()).then(result => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
        }).catch(() => {
            exchangeRateTxt.innerText = "Something went wrong";
        });
    }





