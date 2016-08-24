'strict';
document.addEventListener('DOMContentLoaded', function() {
  SaihuBot.prototype.responses.push(
    { name: 'google', rule: /(^search |^google |^g* )(.*)/i, action: function(robot, msg) {
      let url = 'https://www.google.com/search?q=' + encodeURIComponent(msg[2]);
      let link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      let linkText = document.createTextNode('Search ' + msg[2] + ' via google');
      link.appendChild(linkText);
      robot.sendHTML(link);
      window.open(url, '_blank');
    }});
  
  SaihuBot.prototype.responses.push(
    { name: 'wikipedia', rule: /(^w |^wiki |^wikipedia )(.*)/i, action: function(robot, msg) {
      let url = 'http://zh.wikipedia.org/w/index.php?title=Special:Search&search=' + encodeURIComponent(msg[2]);
      let link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      let linkText = document.createTextNode('透過維基百科搜尋 ' + msg[2]);
      link.appendChild(linkText);
      robot.sendHTML(link);
      window.open(url, '_blank');
    }});

  SaihuBot.prototype.responses.push(
    { name: 'translate', rule: /(^translate |^tr )(.*)/i, action: function(robot, msg) {
      let url = 'http://translate.google.com/?q=' + encodeURIComponent(msg[2]);
      let link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      let linkText = document.createTextNode('翻譯 ' + msg[2]);
      link.appendChild(linkText);
      robot.sendHTML(link);
      window.open(url, '_blank');
    }});
});
