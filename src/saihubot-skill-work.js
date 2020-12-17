'use strict';

export const skillWork = {
  name: 'work',
  help: 'work related links',
  requirements: {
		addons: ['confirm', 'openLink']
	},
  rule: /^WORK/i,
  action: function(robot, msg) {
    robot.addons.confirm('Choose Work', [
      {
        title: 'Asana',
        id: 'asana',
        rule: /^ASANA|TASKS/i,
        action: () => robot.addons.openLink('https://app.asana.com/0/1122117831189090/list'),
      },
      {
        title: 'Github',
        id: 'github',
        rule: /^GITHUB/i,
        action: () => robot.addons.openLink('https://github.com/bitfinexcom/mobile-app/pulls'),
      },
      {
        title: 'Play store',
        id: 'playstore',
        rule: /^PLAYSTORE/i,
        action: () => robot.addons.openLink('https://play.google.com/console/u/0/developers/7467801197753319472/app/4976214076899729947/app-dashboard?timespan=thirtyDays'),
      },
      {
        title: 'App store',
        id: 'appstore',
        rule: /^APPSTORE/i,
        action: () => robot.addons.openLink('https://appstoreconnect.apple.com/'),
      },
      {
        title: 'Analytics',
        id: 'analytics',
        rule: /^ANALYTICS/i,
        action: () => robot.addons.openLink('https://analytics.google.com/analytics/web/?authuser=1#/p182217412/reports/defaulthome?params=_u..nav%3Ddefault'),
      },
      {
        title: 'Recruitee',
        id: 'recruitee',
        rule: /RECRUITEE/i,
        action: () => robot.addons.openLink('https://app.recruitee.com/#/offers/mobile-app-developer-remote/pipeline'),
      },
      {
        title: 'Window View',
        id: 'window',
        rule: /WINDOW/i,
        action: () => robot.addons.openLink('http://window-swap.com/window'),
      },
    ]);
  },
}

export const skillToday = {
  name: 'today',
  help: 'today - Show today selections',
  requirements: {
		addons: ['confirm', 'search']
	},
  rule: /^TODAY/i,
  action: function(robot, msg) {
    robot.addons.confirm('What\'s up Today', [
      {
        title: 'Weather',
        id: 'weather',
        rule: /WEATHER/i,
        action: () => robot.ask('g weather today'),
      },
      {
        title: 'Pocket',
        id: 'pocket',
        rule: /POCKET/i,
        action: () => robot.addons.openLink('https://app.getpocket.com/'),
      },
      {
        title: '電影',
        id: 'movie',
        rule: /^MOVIE/i,
        action: () => robot.addons.openLink('https://movie.douban.com/people/gasolin/'),
      },
      {
        title: '書櫃',
        id: 'book',
        rule: /^BOOK/i,
        action: () => robot.addons.openLink('https://share.readmoo.com/mooer/lifaicqb9/bookshelf/gasolin/total'),
      },
      {
        title: 'Feedly',
        id: 'feedly',
        rule: /^FEEDLY/i,
        action: () => robot.addons.openLink('https://feedly.com/i/my'),
      }
    ]);
  },
};

const skills = [skillWork, skillToday];
export {skills};
