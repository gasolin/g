'use strict';
// plugin to provide gasolin specific services
document.addEventListener('DOMContentLoaded', function() {
  SaihuBot.prototype.catchAll = { action: function(robot, msg) {
    var randomMsg = [
      '我只好回你一個404了',
      '我就當真你在跟我聊天了(灑花)',
      '你收到幾個錯誤訊息了？再試一個',
      '你怎麼不問問神奇的五樓呢？',
      '人生哪~要浪費在美好的事物上，我就當你在跟我聊天了（幸福）',
      '我想你應該不是在跟我講話，我都不知道要怎麼回你',
      '你想知道什麼？',
      '至少你是認真在跟我聊天, 不是在玩皮卡丘'
    ];
    var msgLen = randomMsg.length;
    robot.send(randomMsg[Math.floor(Math.random() * msgLen)]);
  }};

  SaihuBot.prototype.responses.push(
    { name: 'home', rule: /首頁*|home*/i, action: function(robot, msg) {
      let url = 'http://www.gasolin.idv.tw';
      let link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      let linkText = document.createTextNode('歡迎前往 gasolin 的首頁');
      link.appendChild(linkText);
      robot.sendHTML(link);
      window.open(url, '_blank');
    }});

  SaihuBot.prototype.responses.push(
    { name: 'resume', rule: /gasolin*|履歷*|經歷*|網站*|學歷*|resume*/i, action: function(robot, msg) {
      let url = 'http://www.gasolin.idv.tw/personal/resume';
      let link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      let linkText = document.createTextNode('我主人 gasolin 的履歷在這，人才阿！');
      link.appendChild(linkText);
      robot.sendHTML(link);
      window.open(url, '_blank');
    }});

  SaihuBot.prototype.responses.push(
    { name: 'project', rule: /專案*|project*/i, action: function(robot, msg) {
      let url = 'http://www.gasolin.idv.tw/personal/portfolio';
      let link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      let linkText = document.createTextNode('gasolin 貢獻過的專案大都在這了');
      link.appendChild(linkText);
      robot.sendHTML(link);
      window.open(url, '_blank');
    }});

  SaihuBot.prototype.responses.push(
    { name: 'present', rule: /演講*|present*/i, action: function(robot, msg) {
      let url = 'http://www.gasolin.idv.tw/personal/present';
      let link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      let linkText = document.createTextNode('gasolin 過去的演講列表');
      link.appendChild(linkText);
      robot.sendHTML(link);
      window.open(url, '_blank');
    }});

  SaihuBot.prototype.responses.push(
    { name: 'travel', rule: /去過*|travel*/i, action: function(robot, msg) {
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
    }});
});