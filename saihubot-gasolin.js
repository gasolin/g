'use strict';
// plugin to provide gasolin specific services
document.addEventListener('DOMContentLoaded', function() {
  SaihuBot.prototype.catchAll = { action: function(robot, msg) {
    var randomMsg = [
      '我只好回你一個404了',
      '梅林的鬍子阿, 你用對命令沒? 用個?試試?',
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

});