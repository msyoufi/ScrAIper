chrome.runtime.onMessage.addListener(handleFileRequest);

async function handleFileRequest(message, sender, sendResponse) {
  if (message.action !== 'requestFile') return;

  const { prompt, fileType, html } = message;

  // Request the file from the backend
  const fileURLPromise = await fetch(`http://127.0.0.1:8000?file_type=${fileType}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, html })
  });

  const fileURL = fileURLPromise.json();

  chrome.runtime.sendMessage({ action: 'download', fileURL });
}

