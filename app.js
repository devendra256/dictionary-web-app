const api = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchWord = document.querySelector("#search-box");
const form = document.querySelector("form");
const theWord = document.querySelector(".the-word");
const speech = document.querySelector(".speech");
const phonetics = document.querySelector(".phonetics");
const explainMeaning = document.querySelector(".explain-meaning");
const synonym = document.querySelector(".synonym");

const details = document.querySelector(".details");
const searchData = document.querySelector(".search-data");

const audioBtn = document.querySelector("audio-btn");
const sound = document.querySelector("#word-audio");
const error = document.querySelector(".error");

form.addEventListener("submit", (e) => {
  error.innerText = "";
  e.preventDefault();

  getMeaning(searchWord.value);
});

const getMeaning = async (searchWord) => {
  const response = await fetch(api + searchWord);
  const data = await response.json();

  if (response.status == 404) {
    error.style.display = "inline";
    error.innerText = "Please Search a valid Word!!";
  } else {
    details.style.display = "block";
    searchData.style.display = "block";

    // assigning audio source
    if (`${data[0].phonetics[0].audio}` || "") {
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    } else {
      sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
    }

    // searched word
    theWord.innerText = data[0].word;

    // parts of Speech
    speech.innerText = data[0].meanings[0].partOfSpeech;

    // setting Phonetics
    const resPhonetic = data[0].phonetics[0].text;
    if (resPhonetic) {
      phonetics.innerText = resPhonetic;
    } else {
      phonetics.innerText = "---";
    }

    // setting Meaning
    if (`data[0].meanings[0].definitions[0].definition` || "") {
      explainMeaning.innerText = data[0].meanings[0].definitions[0].definition;
    } else {
      explainMeaning.innerText = data[0].meanings[1].definitions[0].definition;
    }
  }
};

function audioHandler() {
  sound.play();
}
