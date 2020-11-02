'use strict';

export const skillWork = {
  name: 'work',
  help: 'work related links',
  requirements: [],
  rule: /WORK/i,
  action: function(robot, msg) {
    robot.addons.confirm('Choose Work', [
      {
        title: 'Asana',
        id: 'asana',
        rule: /ASANA|TASKS/i,
        action: () => robot.addons.openLink('https://app.asana.com/0/1122117831189090/list'),
      },
      {
        title: 'Github',
        id: 'github',
        rule: /GITHUB/i,
        action: () => robot.addons.openLink('https://github.com/bitfinexcom/mobile-app/pulls'),
      },
      {
        title: 'Play store',
        id: 'playstore',
        rule: /PLAYSTORE/i,
        action: () => robot.addons.openLink('https://play.google.com/console/u/0/developers/7467801197753319472/app/4976214076899729947/app-dashboard?timespan=thirtyDays'),
      },
      {
        title: 'App store',
        id: 'appstore',
        rule: /APPSTORE/i,
        action: () => robot.addons.openLink('https://appstoreconnect.apple.com/'),
      },
      {
        title: 'Recruitee',
        id: 'recruitee',
        rule: /RECRUITEE/i,
        action: () => robot.addons.openLink('https://app.recruitee.com/#/offers/mobile-app-developer-remote/pipeline'),
      },
    ]);
  },
}

export const skillToday = {
  name: 'today',
  help: 'today - Show today selections',
  requirements: [],
  rule: /TODAY/i,
  action: function(robot, msg) {
    robot.addons.confirm('What\'s up Today', [
      {
        title: 'Weather',
        id: 'weather',
        rule: /WEATHER/i,
        action: () => robot.ask('g weather today'),
      },
      {
        title: 'Today in History',
        id: 'history',
        rule: /HISTORY/i,
        action: () => robot.ask('wolf today in history'),
      },
      {
        title: '圖書館',
        id: 'lib',
        rule: /LIBRARY/i,
        action: () => robot.addons.openLink('http://webcat.tpml.edu.tw/webpac/webpacIndex.jsp'),
      },
    ]);
  },
};

const skills = [skillWork, skillToday];
export {skills};
