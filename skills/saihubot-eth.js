/* globals SaihuBot */
'use strict';

const GASSTATION_API = 'https://ethgasstation.info/api/ethgasAPI.json';
const GASNOW_API = 'https://www.gasnow.org/api/v3/gas/price?utm_source=:gaso';

SaihuBot.prototype.responses.push({
  name: 'gasnow',
  rule: /gas*/igs,
  action: function(robot, msg) {
    // const div = document.createElement('div');
    // const node = document.createTextNode();
    // div.appendChild(node);
    robot.send('等等我找看看啊...');
    // Promise.all([
    //   fetch(GASSTATION_API).then(response => response.json()),
    //   fetch(GASNOW_API).then(response => response.json()),
    // ]).then(([station, gasnow]) => {
    //   const gas = gasnow.data
    //   const div = document.createElement('pre');
    //   const result = `GasStation: H: ${station.fast / 10} M: ${station.average / 10} L: ${station.safeLow / 10}\n` +
    //   `GasNow: H: ${gas.fast / 1000000000} M: ${gas.standard / 1000000000} L: ${gas.slow / 1000000000}`
    //   const node = document.createTextNode(result);
    //   div.appendChild(node);
    //   robot.sendHTML(div);
    // })
    fetch(GASSTATION_API)
      .then(response => response.json())
      .then(json => {
        const result = `GasStation: H: ${json.fast / 10} M: ${json.average / 10} L: ${json.safeLow / 10}`
        robot.send(result);
      })
    fetch(GASNOW_API)
      .then(response => response.json())
      .then(json => {
        const result = `GasNow: H: ${json.data.fast / 1000000000} M: ${json.data.standard / 1000000000} L: ${json.data.slow / 1000000000}`
        robot.send(result);
      })
  }
});
