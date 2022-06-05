export function RWDElMessageBox() {
  const msgBOX = document.getElementsByClassName(
    'el-message-box'
  )[0] as HTMLElement;
  let msgBOXWidth;
  let windowSize = document.body.clientWidth;
  const defaultWidth = 450; // 預設寬度
  if (windowSize < defaultWidth) {
    msgBOXWidth = '80%';
    if (msgBOX) {
      // msgBOX.style.width = msgBOXWidth;
      // console.log(msgBOX);

      msgBOX.setAttribute('style', 'width:' + msgBOXWidth + ';');
    }
  } else {
    msgBOXWidth = defaultWidth + 'px';
  }
}
export function RWDElMessage() {
  const msgBOX = document.getElementsByClassName(
    'el-message'
  )[0] as HTMLElement;

  let msgBOXWidth;
  let windowSize = document.body.clientWidth;
  const defaultWidth = 450; // 預設寬度
  if (windowSize < defaultWidth) {
    msgBOXWidth = '80%';
    if (msgBOX) {
      msgBOX.setAttribute('style', 'width:' + msgBOXWidth + ';');
    }
  } else {
    msgBOXWidth = defaultWidth + 'px';
  }
}
