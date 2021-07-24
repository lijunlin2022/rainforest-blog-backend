function htmlEncode(str) {
  if (str.length == 0) {
    return "";
  }
  return str
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&apos;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/ /g, "&nbsp;");
}

module.exports = {
  htmlEncode
};
