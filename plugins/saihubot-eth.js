/* globals SaihuBot */
'use strict';

const GASSTATION_API = 'https://ethgasstation.info/api/ethgasAPI.json';
const GASNOW_API = 'https://www.gasnow.org/api/v3/gas/price?utm_source=:gaso';

SaihuBot.prototype.responses.push({
  name: 'gasnow',
  rule: /gas*/igs,
  action: function(robot, msg) {
    fetch(GASSTATION_API)
      .then(response => response.json())
      .then(json => {
        const div = document.createElement('div');
        const result = `GasStation: H: ${json.fast / 10} M: ${json.average / 10} L: ${json.safeLow / 10}`
        console.log('station ', result)
        const node = document.createTextNode(result);
        div.appendChild(node);
        robot.sendHTML(div);
      })
    fetch(GASNOW_API)
      .then(response => response.json())
      .then(json => {
        const div = document.createElement('div');
        const result = `GasNow: H: ${json.data.fast / 1000000000} M: ${json.data.standard / 1000000000} L: ${json.data.slow / 1000000000}`
        const node = document.createTextNode(result);
        console.log('now ', result, typeof node)
        div.appendChild(node);
        robot.sendHTML(div);
      })
  }
});
