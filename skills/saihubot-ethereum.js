/* globals SaihuBot */
'use strict';

const GASSTATION_API = 'https://ethgasstation.info/api/ethgasAPI.json';
const GASNOW_API = 'https://www.gasnow.org/api/v3/gas/price?utm_source=:gaso';

function int(num) {
  return parseInt(num, 10);
}

function fetchGasStation(robot) {
  fetch(GASSTATION_API)
  .then(response => response.json())
  .then(json => {
    const result = `這是 Gas Station 提供的價格...\n 高: ${int(json.fast / 10)} 中: ${int(json.average / 10)} 低: ${int(json.safeLow / 10)}`
    robot.send(result);
    robot.render();
  })
}

function fetchGasNow(robot) {
  fetch(GASNOW_API)
  .then(response => response.json())
  .then(json => {
    const result = `這是 Gas Now 提供的價格...\n 高: ${int(json.data.fast / 1000000000)} 中: ${int(json.data.standard / 1000000000)} 低: ${int(json.data.slow / 1000000000)}`
    robot.send(result);
    robot.render();
  })
}

// skills that use
// confirm dialog addon
SaihuBot.prototype.responses.push({
  name: 'gasnow',
  help: 'gas - Show current ethereum Gas fee',
  rule: /gas*/igs,
  action: function(robot, msg) {
    robot.confirm('想看哪個來源?', [
      {
        title: 'Gas Station',
        id: 'gasstation',
        rule: /station*/ig,
        action: function() {
          fetchGasStation(robot);
        },
      },
      {
        title: 'Gas Now',
        id: 'gasnow',
        rule: /now*/ig,
        action: function() {
          fetchGasNow(robot);
        },
      },
      {
        title: '全部 (all)',
        id: 'allgas',
        rule: /all|全部/ig,
        action: function() {
          fetchGasStation(robot);
          fetchGasNow(robot);
        },
      }
    ]);
  }
});


function getSymbols(input) {
  if (input.length > 6) {
    return input.split(/\/|:/, 2);
  }
  return [input.slice(0, 3), input.slice(3, 6)];
}

const BFX_DEFAULT_PAIR = 'ETH:USD';
const BFX_DEFAULT_BASE = 'USD';

// https://www.bitfinex.com/t/ETH:USD
// https://www.bitfinex.com/t/UST:USD
SaihuBot.prototype.responses.push({
  name: 'bitfinex',
  help: 'bitfinex|bfx [quote/base] - search [quote/base] pair with Bitfinex exchange',
  rule: /(^bitfinex |^bfx )(.*)/i,
  action: function(robot, msg) {
    let [quote, base] = msg[2] && getSymbols(msg[2]);
    let pair = msg[2] === ''
      ? BFX_DEFAULT_PAIR
      : base
        ? `${quote.toUpperCase()}:${base.toUpperCase()}`
        : `${quote.toUpperCase()}:${BFX_DEFAULT_BASE}`;
    const url = `https://www.bitfinex.com/t/${pair}`;
    robot.search('Search', pair, url, 'Bitfinex');
  },
});

const ACE_DEFAULT_PAIR = 'TWD_USDT';
const BFX_DEFAULT_QUOTE = 'TWD';

// https://www.ace.io/webtrade/TWD_USDT
SaihuBot.prototype.responses.push({
  name: 'ace',
  help: 'ace [quote/base] - search [quote/base] pair with ACE exchange',
  rule: /(^ace )(.*)/i,
  action: function(robot, msg) {
    let [quote, base] = msg[2] && getSymbols(msg[2]);
    let pair = msg[2] === ''
      ? ACE_DEFAULT_PAIR
      : base
        ? `${base.toUpperCase()}_${quote.toUpperCase()}`
        : `${BFX_DEFAULT_QUOTE}_${quote.toUpperCase()}`;
    const url = `https://www.ace.io/webtrade/${pair}`;
    robot.search('Search', pair, url, 'ACE');
  },
});

const MAICOIN_DEFAULT_COIN = 'USDT';

// USDT
SaihuBot.prototype.responses.push({
  name: 'maicoin',
  help: 'maicoin [coin] - search [coin] with Maicoin',
  rule: /(^maicoin )(.*)/i,
  action: function(robot, msg) {
    let coin = msg[2] === ''
      ? MAICOIN_DEFAULT_COIN
      : msg[2].toUpperCase();
    const url = `https://www.maicoin.com/market/${coin}`;
    robot.search('Search', coin, url, 'Maicoin');
  },
});

// https://ethcontract.watch/contracts/0x6B175474E89094C44Da98b954EedeAC495271d0F
SaihuBot.prototype.responses.push({
  name: 'ethcontract',
  help: 'contract [address] - check contract on ethcontract',
  rule: /(^contract )(.*)/i,
  action: function(robot, msg) {
    const url = 'https://ethcontract.watch/contracts/' + msg[2];
    robot.search('Check', msg[2], url, 'ethcontract');
  },
});

//https://www.etherscan.io/address/0x6B175474E89094C44Da98b954EedeAC495271d0F
SaihuBot.prototype.responses.push({
  name: 'etherscan',
  help: 'scan [address] - check contract address on etherscan',
  rule: /(^scan )(.*)/i,
  action: function(robot, msg) {
    const url = 'https://www.etherscan.io/address/' + msg[2];
    robot.search('Check', msg[2], url, 'etherscan');
  },
});
