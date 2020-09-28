// https://www.visa.com.tw/travel-with-visa/exchange-rate-calculator.html
// https://www.mastercard.us/en-us/personal/get-support/convert-currency.html

const PROXY = 'https://cors-anywhere.herokuapp.com/';
// https://docs.bitfinex.com/reference#rest-public-ticker
const BITFINEX_API = 'https://api-pub.bitfinex.com/v2/';
// https://tw.rter.info/howto_currencyapi.php
let RTER_API = 'https://tw.rter.info/capi.php';

function fetchUSDtPrice(robot) {
  fetch(`${PROXY}${BITFINEX_API}ticker/tUSTUSD`)
  .then(response => response.json())
  .then(json => {
    const result = `USD / USDt: 現價: ${json[6]} 高: ${json[8]} 低: ${json[9]}`
    robot.send(result);
    robot.render();
  })
}

function fetchUSDPrice(robot) {
  fetch(`${PROXY}${RTER_API}`)
  .then(response => response.json())
  .then(json => {
    const usdtwd = `USD / TWD: 現價: ${json.USDTWD.Exrate}`;
    robot.send(usdtwd);
    const usdsgd = `USD / SGD: 現價: ${json.USDSGD.Exrate}`;
    robot.send(usdsgd);
    robot.render();
  })
}

// skills that use
// confirm dialog addon
SaihuBot.prototype.responses.push({
  name: 'price',
  rule: /forex*|usd price*|美金*|美元*/igs,
  action: function(robot, msg) {
    robot.send('抓取中...');
    fetchUSDPrice(robot)
    fetchUSDtPrice(robot)
  },
});
