// usage https://code.ciaoca.com/javascript/qrcode/
// need import
/* <script src="https://cdn.jsdelivr.net/npm/davidshimjs-qrcodejs@0.0.2/qrcode.min.js"></script> */

// skills that use card addon
export const skill_qrcode = {
  name: 'qrcode',
  help: 'qrcode [text] - Generate QRCode with [text]',
  rule: /qrcode (.*)/i,
  action: function(robot, msg) {
    robot.card({
      width: '256px',
      height: '256px',
      asyncAction: (rootElement) => {
        const code = encodeURIComponent(msg[1]);
        new QRCode(rootElement, {
          text: code,
          width: 256,
          height: 256,
        });
        const br = document.createElement('br');
        rootElement.appendChild(br);
      }
    })
  }
};

const skills = [skill_qrcode];
export { skills };