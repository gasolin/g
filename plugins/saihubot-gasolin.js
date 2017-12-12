'use strict';
// plugin to provide gasolin specific services
SaihuBot.prototype.responses.push({
  name: 'home',
  rule: /首頁*|home*/i,
  action: function(robot, msg) {
    let url = 'http://www.gasolin.idv.tw';
    let link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    let linkText = document.createTextNode('歡迎前往 gasolin 的首頁');
    link.appendChild(linkText);
    robot.sendHTML(link);
    window.open(url, '_blank');
  }
});

SaihuBot.prototype.responses.push({
  name: 'resume',
  rule: /gasolin*|履歷*|經歷*|網站*|學歷*|resume*/i,
  action: function(robot, msg) {
    let url = 'http://www.gasolin.idv.tw/resume';
    let link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    let linkText = document.createTextNode('我主人 gasolin 的履歷在這，人才阿！');
    link.appendChild(linkText);
    robot.sendHTML(link);
    window.open(url, '_blank');
  }
});

SaihuBot.prototype.responses.push({
  name: 'project',
  rule: /貢獻*|專案*|project*/i,
  action: function(robot, msg) {
    let url = 'http://www.gasolin.idv.tw/portfolio';
    let link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    let linkText = document.createTextNode('gasolin 貢獻過的專案大都在這了');
    link.appendChild(linkText);
    robot.sendHTML(link);
    window.open(url, '_blank');
  }
});

SaihuBot.prototype.responses.push({
  name: 'present',
  rule: /演講*|present*/i,
  action: function(robot, msg) {
    let url = 'http://www.gasolin.idv.tw/present';
    let link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    let linkText = document.createTextNode('gasolin 過去的演講列表');
    link.appendChild(linkText);
    robot.sendHTML(link);
    window.open(url, '_blank');
  }
});

SaihuBot.prototype.responses.push({
  name: 'travel',
  rule: /去過*|travel*/i,
  action: function(robot, msg) {
    let url = 'http://www.mytravelmap.tk/compare/gg112695256249584453237/1470712913452?locale=en';
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = 'http://www.mytravelmap.tk/worldMap/images/408/264/gg112695256249584453237/1470712913452.png';
    let link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    let linkText = document.createTextNode('這些是 gasolin 去過的國家');
    link.appendChild(linkText);
    div.appendChild(img);
    div.appendChild(document.createElement('br'));
    div.appendChild(link);
    robot.sendHTML(div);
  }
});
