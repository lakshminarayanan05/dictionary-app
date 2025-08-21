
const inputBox = document.getElementById("input-box");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

searchBtn.addEventListener("click", (event) => {
    const word = inputBox.value.trim();
    console.log(word);
    if(word){
        inputBox.value = "";
        getMeaning(word);
    }
    else{
        result.innerHTML = `<p style="color:green; font-size:2em">Enter a word</p>`;
    }
});

inputBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter"){
        searchBtn.click();
    }
});

async function getMeaning(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Word not found in dictionary");
        }
        const data = await response.json();
        console.log(data);
        display(data);
    } catch (err){
        result.innerHTML = `<p style="color:red; font-size:2em">${err.message}</p>`;
    }

};

function display(data) {
    let { word } = data[0];
    let { definition } = data[0].meanings[1]? data[0].meanings[1].definitions[0] : data[0].meanings[0].definitions[0];
    let { partOfSpeech } = data[0].meanings[1]? data[0].meanings[1] : data[0].meanings[0];
    let { audio = "" } = data[0].phonetics[0] || {};
    let { text = "" } = data[0].phonetics[0] || {};

    word = word.charAt(0).toUpperCase() + word.substring(1);

    result.innerHTML = `
        <h2>${word}</h2>
        <p><strong>Phonetic:</strong> ${text? text:word}</p>
        ${audio? `<p><audio controls src="${audio}"></audio></p>` : ""}
        <p><strong>Definition:</strong> ${definition}</p>
        <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
    `;
};