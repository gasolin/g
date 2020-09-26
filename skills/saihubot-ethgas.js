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
