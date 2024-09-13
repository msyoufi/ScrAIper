const form = document.querySelector('form');
const input = document.querySelector('textarea');
const errMsg = document.querySelector('small');

form.addEventListener('submit', getPageHTML);
input.addEventListener('input', removeErrMsg);

async function getPageHTML(event) {
  event.preventDefault();
  const { prompt, fileType } = getFormData();

  if (!prompt) {
    errMsg.style.display = 'block';
    input.focus();
    return;
  }

  const action = 'getPageHTML';
  const tabId = await getTabId();

  chrome.tabs.sendMessage(tabId, { action, prompt, fileType });
}

function removeErrMsg() {
  const { prompt } = getFormData();

  if (prompt)
    errMsg.style.display = 'none';
}

function getFormData() {
  const formData = new FormData(form);
  return {
    prompt: formData.get('prompt'),
    fileType: formData.get('file-type')
  };
}

async function getTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab.id;
}

chrome.runtime.onMessage.addListener(onFileGenerated);

function onFileGenerated(message) {
  if (message.action !== 'download') return;
  console.log(message.fileURL);
}