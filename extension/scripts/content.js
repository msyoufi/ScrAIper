chrome.runtime.onMessage.addListener(onFileRequested);

function onFileRequested(message) {
  if (message.action !== 'getPageHTML') return;

  const html = document.documentElement.outerHTML;
  message.action = 'requestFile';
  message = { ...message, html };
  chrome.runtime.sendMessage(message);
}