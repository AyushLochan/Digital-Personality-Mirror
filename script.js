const quiz = document.getElementById("quiz");
const avatar = document.getElementById("avatar");
const face = document.getElementById("face");

quiz.addEventListener("submit", function (e) {
  e.preventDefault();

  const env = quiz.env.value;
  const power = quiz.power.value;
  const mood = quiz.mood.value;

  // Avatar color logic
  const colorMap = {
    forest: "#4CAF50",
    city: "#9C27B0",
    desert: "#FF9800",
    space: "#3F51B5"
  };

  avatar.style.borderRadius =
    power === "flight" ? "50%" :
    power === "invisibility" ? "20%" :
    power === "telepathy" ? "10%" : "0";

  const moodFaces = {
    calm: "😌",
    chaotic: "🤪",
    creative: "🎨",
    logical: "🧠"
  };

  avatar.style.background = colorMap[env];
  face.textContent = moodFaces[mood];

  avatar.classList.remove("pulse");
  void avatar.offsetWidth;
  avatar.classList.add("pulse");
});
