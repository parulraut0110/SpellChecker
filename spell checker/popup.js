document.getElementById('checkButton').addEventListener('click', () => {
  const textInput = document.getElementById('textInput').value;
  chrome.runtime.sendMessage({ text: textInput }, (response) => {
    const resultDiv = document.getElementById('result');
    const words = textInput.split(/\s+/);

    resultDiv.innerHTML = words.map(word => {
      if (response.misspelledWords.includes(word)) {
        return `<span class="misspelled">${word}</span>`;
      } else {
        return word;
      }
    }).join(' ');
  });
});
