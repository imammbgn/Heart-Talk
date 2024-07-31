let questions = [];

// URL dan kunci API Back4App
const apiUrl = 'https://parseapi.back4app.com/classes/questions';
const appId = 'GD2an5fhqNJnBy9wZSl3d1a3fx30i7SgfPuaNwiJ';
const restApiKey = 'RDxV07R4Ykh3F81T5Zno7xYMsQiLetwyCPdzl46U';

fetch(apiUrl, {
    method: 'GET',
    headers: {
        'X-Parse-Application-Id': appId,
        'X-Parse-REST-API-Key': restApiKey,
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    questions = data.results.map(item => item.question);
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});


const card = document.getElementById("card");
const cardQuestion = document.getElementById("question");
const button = document.getElementById("btn");

function getRandomQuestion(){
    if (questions.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    const resultQuestion = questions[randomIndex];
    questions = questions.slice(0, randomIndex).concat(questions.slice(randomIndex + 1));
    return resultQuestion;
}

function displayRandomQuestion(){
    const randomQuestion = getRandomQuestion();
    if (randomQuestion === null) {
        card.style.backgroundColor = "rgb(23, 23, 23)";
        cardQuestion.textContent = "Pertanyaan Abis Waktunya Cipokan HAHAHA";
    } else {
        card.style.backgroundColor = "crimson";
        cardQuestion.style.color = "#e6e6e6"; // Mengatur warna teks
        cardQuestion.textContent = randomQuestion;
    }
}

button.addEventListener("click", displayRandomQuestion);
