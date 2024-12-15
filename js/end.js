const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("highscores")) || [];

const inputUser = document.querySelector("input");
const saveButton = document.querySelector("button");
const scoreEL = document.querySelector("p");

scoreEL.innerText = score;

const saveHandler = () => {
  if (!inputUser.value || !score) {
    alert("invalid username or scores");
  } else {
    const finalScores = { name: inputUser.value, score };
    highScores.push(finalScores);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);

    localStorage.setItem("highscores", JSON.stringify(highScores));
    localStorage.removeItem("score");
    window.location.assign("/");
  }
};

saveButton.addEventListener("click", saveHandler);
