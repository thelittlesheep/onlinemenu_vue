export function RWDElMessageBox() {
  const msgBOX = document.getElementsByClassName(
    "el-message-box"
  )[0] as HTMLElement;
  let msgBOXWidth;
  let windowSize = document.body.clientWidth;
  const defaultWidth = 450; // 預設寬度
  if (windowSize < defaultWidth) {
    msgBOXWidth = "80%";
    if (msgBOX) {
      msgBOX.style.width = msgBOXWidth;
    }
  } else {
    msgBOXWidth = defaultWidth + "px";
  }
}
