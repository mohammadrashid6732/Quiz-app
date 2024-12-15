const buttons = document.querySelectorAll("button");

const selectedHandler = (event) => {
  const result = event.target.innerText.toLowerCase();
  localStorage.setItem("result", result);
  window.location.assign("/");
};

buttons.forEach((button) => {
  button.addEventListener("click", selectedHandler);
});
