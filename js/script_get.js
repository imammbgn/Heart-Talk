let questions = []

fetch('/.netlify/functions/get-question/get-question')
    .then(response => response.json())
    .then(data => {
        questions = data.results.map(item => item.question);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

const button = document.getElementById("btn");
const card = document.querySelector(".card");
const h2 = document.querySelector(".question");
let isAnimating = false;
let isFlipped = false;
let checkQuestions = false

function getRandomQuestion() {
  if (questions.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * questions.length);
  const resultQuestion = questions[randomIndex];
  questions = questions
    .slice(0, randomIndex)
    .concat(questions.slice(randomIndex + 1));
  return resultQuestion;
}

button.addEventListener("click", function () {
  if (checkQuestions == false){
    const randomQuestion = getRandomQuestion();

    if (isAnimating) return;
  
    isAnimating = true;
  
    if (isFlipped) {
      card.classList.toggle("flip-back");
      setTimeout(function () {
        if (randomQuestion == null) {
          h2.textContent = "Pertanyaan Habis";
          checkQuestions = true
        } else {
          h2.textContent = randomQuestion;
        }
      }, 400);
    } else {
      card.classList.toggle("flip-front");
      h2.textContent = randomQuestion;
      isFlipped = true;
    }
  
    setTimeout(function () {
      isAnimating = false;
    }, 1000);
  }
  else {
    return
  }
});
