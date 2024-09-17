chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.text) {
      const misspelledWords = [];
      const text = message.text;
      const words = text.split(/\s+/);
  
      // Using the browser's spell checker
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      
      words.forEach(word => {
        textarea.value = word;
        if (textarea.checkValidity() === false) {
          misspelledWords.push(word);
        }
      });
  
      document.body.removeChild(textarea);
  
      sendResponse({ misspelledWords });
    }
    return true;
  });
  