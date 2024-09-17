document.getElementById('dictionaryForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const word = document.getElementById('wordInput').value;

    const response = await fetch(`/dictionary?word=${word}`);
    const data = await response.json();

    if (data.error) {
        document.getElementById('result').innerText = "Word not found!";
    } else {
        document.getElementById('result').innerText = `Meaning: ${data.meaning}`;
    }
});
