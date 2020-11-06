import SaihuBot from './node_modules/saihubot/src/saihubot.js';
import htmlAdapter from './node_modules/saihubot-html-adapter/saihubot-html-adapter.js';
// import localforageBrain from './node_modules/html-adapter/saihubot-html-brain-localforage.js';
import {addons as dialogAddons} from './node_modules/saihubot-html-adapter/saihubot-html-addon-dialog.js';
import {addons as cardAddons} from './node_modules/saihubot-html-adapter/saihubot-html-addon-card.js';
import {addons as searchAddons} from './node_modules/saihubot-html-adapter/saihubot-html-addon-search.js';
import {skillHelp} from './node_modules/saihubot-html-adapter/saihubot-html-skill-help.js';
import {skills as diagnosSkills} from './node_modules/saihubot-skill-diagnostics/index.js';
import {skills as searchSkills} from './node_modules/saihubot-skill-search/index.js';
import {skills as gasoSkills} from './src/saihubot-html-skill-gasolin.js';
import {skills as ethSkills} from './src/saihubot-skill-ethereum.js';
import {skills as curSkills} from './src/saihubot-html-skill-currency.js';
import {skills as qrSkills} from './src/saihubot-html-skill-qrcode.js';
import {skills as workSkills} from './src/saihubot-skill-work.js';

// <div class="chat-message">
//     <div class="flex items-end">
//       <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
//           <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Can be verified on any platform using docker</span></div>
//       </div>
//       <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1">
//     </div>
// </div>
// user
// <div class="chat-message">
//     <div class="flex items-end justify-end">
//       <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
//           <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Your error message says permission denied, npm global installs must be given root privileges.</span></div>
//       </div>
//       <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-2">
//     </div>
// </div>
const renderMessage = (message, charactor, role = 'bot') => {
  const messageWraper = document.createElement('span');
  messageWraper.className = role === 'bot'
    ? 'px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600'
    : 'px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white';
  if (typeof message === 'string') {
    messageWraper.textContent = message;
  } else if (message instanceof HTMLElement) {
    messageWraper.appendChild(message);
  }
  const messageDivL3 = document.createElement('div');
  const messageDivL2 = document.createElement('div');
  messageDivL2.className = role === 'bot'
    ? 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'
    : 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end';

  const span = document.createElement('span');
  span.textContent = charactor;
  span.className = role === 'bot' ? 'w-6 h-6 rounded-full order-1' : 'w-6 h-6 rounded-full order-2';

  const messageDivL1 = document.createElement('div');
  messageDivL1.className = role === 'bot'
    ? 'flex items-end'
    : 'flex items-end justify-end';
  const botContainer = document.createElement('div');
  botContainer.className = 'chat-message';
  messageDivL3.appendChild(messageWraper);
  messageDivL2.appendChild(messageDivL3);
  messageDivL1.appendChild(messageDivL2);
  messageDivL1.appendChild(span);
  botContainer.appendChild(messageDivL1);
  return botContainer;
};

document.addEventListener('DOMContentLoaded', function() {
  new SaihuBot({
    adapter: htmlAdapter,
    // brain: localforageBrain,
    welcomeMessage: '有什麼需要服務的地方嗎？或輸入`help`看看我能做哪些事',
    notFoundMessages: [
      '輸入 `help` 可以看到所有支援的技能(skill)喔',
      '我只好回你一個404了',
      '我就當真你在跟我聊天了(灑花)',
      '你收到幾個錯誤訊息了？再試一個',
      '你怎麼不問問神奇的五樓呢？',
      '人生哪~要浪費在美好的事物上，我就當你在跟我聊天了（幸福）',
      '我想你應該不是在跟我講話，我都不知道要怎麼回你',
      '你想知道什麼？',
      '至少你是認真在跟我聊天, 不是在玩皮卡丘'
    ],
    botAlias: '🤖',
    userAlias: '😎',
    renderMessage,
    renderComponent: renderMessage,
    addons: [...cardAddons, ...dialogAddons, ...searchAddons],
    skills: [skillHelp, ...diagnosSkills, ...searchSkills, ...gasoSkills,
    ...ethSkills, ...curSkills, ...qrSkills, ...workSkills],
    debug: true,
  });
});
