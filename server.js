const express = require('express');
const cors = require('cors');
 
const port = 3000;

const bank_accounts = {
    data: {
        accounts: [
            {
                account_number: 123,
                currency: "ruble",
                value: 10000,
            },
            {
                account_number: 124,
                currency: "euro",
                value: 300,
            },
            {
                account_number: 1235,
                currency: "dollar",
                value: 400,
            },
        ],
    },
}

let last_dollar_value = 85
let last_euro_value = 97

function roundFloat(number){
    return parseFloat(number.toFixed(2));
}

exchange_data = () => {
  let dollarValue = roundFloat(85 + Math.random() * 20)
  let euroValue = roundFloat(97 + Math.random() * 23)
  const dollar_delta = roundFloat(dollarValue - last_dollar_value)
  const euro_delta = roundFloat(euroValue - last_euro_value)
  const de_delta = roundFloat(euroValue / dollarValue)
  last_dollar_value = dollarValue;
  last_euro_value = last_euro_value;
  return {
    data: {
      exchange_rates: [
        {
          currency_from: "ruble",
          currency_to: "dollar",
          value: dollarValue,
          delta: dollar_delta,
        },
        {
          currency_from: "ruble",
          currency_to: "euro",
          value: euroValue,
          delta: euro_delta,
        },
        {
          currency_from: "dollar",
          currency_to: "euro",
          value: roundFloat(euroValue / dollarValue),
          delta: de_delta,
        }
      ]
    }
  }
}

const app = express();
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.json("No data");
});
app.get('/exchange_rates', (req, res) => {
    res.json(exchange_data());
});

app.get('/bank_accounts', (req, res) => {
    res.json(bank_accounts);
});

app.listen(port, () => {
    console.log('server is listening on port 2020');
});