let question = []

fetch('data_question.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        question = data;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


const card = document.getElementById("card")
const cardQuestion = document.getElementById("question")
const button = document.getElementById("btn")


function getRandomQuestion(){
    const randomCard = Math.floor(Math.random() * question.length)
    const resultQuestion = question[randomCard]
    question = question.slice(0, randomCard).concat(question.slice(randomCard + 1))
    console.log(question)
    return resultQuestion
}

function displayRandomQuestion(){
    const randomQuestion = getRandomQuestion()
    cardQuestion.style.color = "#ccc" 
    if (question.length == 0) {
        card.style.backgroundColor = "rgb(23, 23, 23)"
        cardQuestion.textContent = "Pertanyaan Abis Waktunya Cipokan HAHAHA"
    }
    else {
        card.style.backgroundColor = "crimson"
        cardQuestion.textContent = randomQuestion
    }
}

button.addEventListener("click", displayRandomQuestion)