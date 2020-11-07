// https://www.visa.com.tw/travel-with-visa/exchange-rate-calculator.html
// https://www.mastercard.us/en-us/personal/get-support/convert-currency.html

const PROXY = 'https://cors-anywhere.herokuapp.com/';
// https://docs.bitfinex.com/reference#rest-public-ticker
const BITFINEX_API = 'https://api-pub.bitfinex.com/v2/';
// https://tw.rter.info/howto_currencyapi.php
let RTER_API = 'https://tw.rter.info/capi.php';

function fetchUSDtPrice(robot, rootElement) {
  return fetch(`${PROXY}${BITFINEX_API}ticker/tUSTUSD`)
  .then(response => response.json())
  .then(json => {
    const resultMsg = `USD / USDt: 現價: ${json[6]} 高: ${json[8]} 低: ${json[9]}`
    const result = document.createTextNode(resultMsg);
    const br = document.createElement("br");
    rootElement.appendChild(result);
    rootElement.appendChild(br);
    return true;
  })
}

function fetchUSDPrice(robot, rootElement) {
  return fetch(`${PROXY}${RTER_API}`)
  .then(response => response.json())
  .then(json => {
    const usdtwd = `USD / TWD: 現價: ${json.USDTWD.Exrate}`;
    const usdsgd = `USD / SGD: 現價: ${json.USDSGD.Exrate}`;
    const br = document.createElement("br");
    const br1 = document.createElement("br");
    const rennderUsdtwd = document.createTextNode(usdtwd);
    const rennderUsdsgd = document.createTextNode(usdsgd);
    rootElement.appendChild(rennderUsdtwd);
    rootElement.appendChild(br);
    rootElement.appendChild(rennderUsdsgd);
    rootElement.appendChild(br1);
    return true;
  })
}

// skills that use card addon
export const skill_price = {
  name: 'price',
  help: 'forex|usd price|美金|美元 - Fetch current USD price',
  rule: /^forex*|^usd price*|^美金*|^美元*/igs,
  requirements: {
    addonns: 'card',
  },
  action: function(robot, msg) {
    robot.card({
      renderLoading: (rootElement) => {
        const span = document.createElement('span');
        span.id = robot.getRandomId();
        const loading = document.createTextNode('抓取中...');
        const br = document.createElement("br");
        span.appendChild(loading);
        span.appendChild(br);
        rootElement.appendChild(span);
        return span.id;
      },
      asyncAction: (rootElement) => {
        Promise.race([
          fetchUSDPrice(robot, rootElement),
          fetchUSDtPrice(robot, rootElement),
        ]).then(() => {
          robot.cardIsReady(rootElement);
        })
      },
    })
  },
};

const skills = [skill_price];
export { skills };
