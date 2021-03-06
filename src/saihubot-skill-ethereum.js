'use strict';


import {GAS_ESTIMATOR} from '../node_modules/staker/src/saihubot-addon-ethgas.js';

export function fetchGasStation(robot) {
  robot.addons.fetchGas(GAS_ESTIMATOR.GASSTATION,
    data => {
      const result = `這是 ${data.source} 提供的價格...\n 高: ${data.H} 中: ${data.M} 低: ${data.L}`
      robot.send(result);
      robot.render();
    });
}

export function fetchGasNow(robot) {
  robot.addons.fetchGas(GAS_ESTIMATOR.GASNOW,
    data => {
      const result = `這是 ${data.source} 提供的價格...\n 高: ${data.H} 中: ${data.M} 低: ${data.L}`
      robot.send(result);
      robot.render();
    });
}

// skills that use
// confirm dialog addon
export const skillGasnow = {
  name: 'gasnow',
  help: 'gas - Show current ethereum Gas fee',
  requirements: {
    addons: ['fetch', 'confirm'],
  },
	rule: /^gas/i,
  action: function(robot, msg) {
    robot.addons.confirm('想看哪個來源?', [
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
};

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
const skillSearchBitfinex = {
  name: 'bitfinex',
  help: 'bitfinex|bfx [quote/base] - search [quote/base] pair with Bitfinex exchange',
  rule: /(^bitfinex |^bfx )(.*)/i,
  requirements: {
    addons: ['search'],
	},
	action: function(robot, msg) {
    let [quote, base] = msg[2] && getSymbols(msg[2]);
    let pair = msg[2] === ''
      ? BFX_DEFAULT_PAIR
      : base
        ? `${quote.toUpperCase()}:${base.toUpperCase()}`
        : `${quote.toUpperCase()}:${BFX_DEFAULT_BASE}`;
    const url = `https://www.bitfinex.com/t/${pair}?demo=true`;
    robot.addons.search('Search', pair, url, 'Bitfinex');
  },
}

const ACE_DEFAULT_PAIR = 'TWD_USDT';
const BFX_DEFAULT_QUOTE = 'TWD';

// https://www.ace.io/webtrade/TWD_USDT
export const skillSearchAce = {
  name: 'ace',
  help: 'ace [quote/base] - search [quote/base] pair with ACE exchange',
  requirements: {
    addons: ['search'],
  },
  rule: /(^ace )(.*)/i,
  action: function(robot, msg) {
    let [quote, base] = msg[2] && getSymbols(msg[2]);
    let pair = msg[2] === ''
      ? ACE_DEFAULT_PAIR
      : base
        ? `${base.toUpperCase()}_${quote.toUpperCase()}`
        : `${BFX_DEFAULT_QUOTE}_${quote.toUpperCase()}`;
    const url = `https://www.ace.io/webtrade/${pair}`;
    robot.addons.search('Search', pair, url, 'ACE');
  },
};

const MAICOIN_DEFAULT_COIN = 'USDT';

export const skillSearchMaicoin = {
  name: 'maicoin',
  help: 'maicoin [coin] - search [coin] with Maicoin',
  requirements: {
    addons: ['search'],
  },
  rule: /(^maicoin )(.*)/i,
  action: function(robot, msg) {
    let coin = msg[2] === ''
      ? MAICOIN_DEFAULT_COIN
      : msg[2].toUpperCase();
    const url = `https://www.maicoin.com/market/${coin}`;
    robot.addons.search('Search', coin, url, 'Maicoin');
  },
}

const MAX_DEFAULT_COIN = 'usdttwd'
// https://max.maicoin.com/trades/usdttwd
export const skillSearchMax = {
  name: 'max',
  help: 'max [coin] - search [coin] with Max',
  requirements: {
    addons: ['search'],
  },
  rule: /(^max )(.*)/i,
  action: function(robot, msg) {
    let coin = msg[2] === ''
      ? MAX_DEFAULT_COIN
      : msg[2].toLowerCase();
    const url = `https://max.maicoin.com/trades/${coin}`;
    robot.addons.search('Search', coin, url, 'Max');
  },
};

// https://ethcontract.watch/contracts/0x6B175474E89094C44Da98b954EedeAC495271d0F
export const skillSearchEthcontract = {
  name: 'ethcontract',
  help: 'contract [address] - check contract on ethcontract',
  requirements: {
    addons: ['search'],
  },
  rule: /(^contract |^ethcontract )(.*)/i,
  action: function(robot, msg) {
    const url = 'https://ethcontract.watch/contracts/' + msg[2];
    robot.addons.search('Check', msg[2], url, 'ethcontract');
  },
};

//https://www.etherscan.io/address/0x6B175474E89094C44Da98b954EedeAC495271d0F
export const skillSearchEtherscan = {
  name: 'etherscan',
  help: 'scan [address] - check contract address on etherscan',
  requirements: {
    addons: ['search'],
  },
  rule: /(^scan |^ethscan )(.*)/i,
  action: function(robot, msg) {
    const url = 'https://www.etherscan.io/address/' + msg[2];
    robot.addons.search('Check', msg[2], url, 'etherscan');
  },
};

const skills = [
  skillGasnow,
  skillSearchBitfinex,
  skillSearchAce,
  skillSearchMaicoin,
  skillSearchMax,
  skillSearchEthcontract,
  skillSearchEtherscan,
];
export {skills};
