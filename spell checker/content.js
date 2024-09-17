document.addEventListener('DOMContentLoaded', function () {
    // Function to check spelling using browser's spell checker
    function checkSpelling(text) {
        const words = text.split(/\s+/);
        const misspelled = [];

        words.forEach(word => {
            if (!spellCheckWord(word)) {  // Use a spell checking library or API
                misspelled.push(word);
            }
        });

        return misspelled;
    }

    // Function to spell check a word (stub function for now)
    function spellCheckWord(word) {
        // Implement your spell check logic here, for now, returning false to demonstrate.
        return false;
    }

    // Highlight misspelled words
    function highlightMisspelledWords() {
        const textNodes = getTextNodes(document.body);
        let misspelledCount = 0;

        textNodes.forEach(node => {
            const misspelled = checkSpelling(node.textContent);

            if (misspelled.length) {
                misspelledCount += misspelled.length;
                let newContent = node.textContent;

                misspelled.forEach(word => {
                    const suggestion = `<span class='misspelled' title='Correct: ${getCorrectSpelling(word)}'>${word}</span>`;
                    newContent = newContent.replace(new RegExp(`\\b${word}\\b`, 'g'), suggestion);
                });

                const span = document.createElement('span');
                span.innerHTML = newContent;
                node.parentNode.replaceChild(span, node);
            }
        });

        updateMisspelledCount(misspelledCount);
    }

    // Get correct spelling for a word (stub function for now)
    function getCorrectSpelling(word) {
        // Implement your logic here
        return "suggested_spelling";
    }

    // Update misspelled words count in the UI
    function updateMisspelledCount(count) {
        let counter = document.getElementById('misspelled-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.id = 'misspelled-counter';
            counter.style.position = 'fixed';
            counter.style.bottom = '10px';
            counter.style.right = '10px';
            counter.style.backgroundColor = '#ffcccc';
            counter.style.padding = '5px';
            counter.style.border = '1px solid #ff0000';
            document.body.appendChild(counter);
        }
        counter.textContent = `Misspelled Words: ${count}`;
    }

    // Function to get all text nodes in the document
    function getTextNodes(node) {
        const textNodes = [];
        if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node);
        } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
            node.childNodes.forEach(child => {
                textNodes.push(...getTextNodes(child));
            });
        }
        return textNodes;
    }

    highlightMisspelledWords();
});
