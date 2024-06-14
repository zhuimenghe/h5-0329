export function validatePhone(phone?: string): boolean {
  return phone ?/^1[23456789]\d{9}$/.test(phone) : false;
}

export function setDocumentTitle(title:string) {
  document.title = title;
  var ua = navigator.userAgent;
  // 微信浏览器特殊处理
  if (/MicroMessenger/i.test(ua)) {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = '/favicon.ico';
    iframe.onload = function() {
      setTimeout(function() {
        iframe.remove();
      }, 0);
    };
    document.body.appendChild(iframe);
  }
}