// Инициализация переменных
let totalQuestions = 0;
let correctAnswers = 0;
let currentQuestion = {};

// Генерация нового примера
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  currentQuestion = {
    question: `${num1} + ${num2}`,
    answer: num1 + num2,
  };

  document.getElementById("question").textContent = currentQuestion.question;
}

// Функция для проверки ответа
function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answer").value, 10); // Получаем ответ пользователя
  const feedback = document.getElementById("feedback"); // Элемент для обратной связи

  // Проверяем, введено ли число
  if (isNaN(userAnswer)) {
    feedback.textContent = translations[currentLanguage].feedbackWrong; // Сообщение о неверном ответе
    feedback.style.color = "red";
    return;
  }

  totalQuestions++; // Увеличиваем общее количество вопросов

  // Проверяем правильность ответа
  if (userAnswer === currentQuestion.answer) {
    correctAnswers++; // Увеличиваем количество правильных ответов
    feedback.textContent = translations[currentLanguage].feedbackCorrect; // Сообщение о правильном ответе
    feedback.style.color = "green";

    // Анимация шариков
    createConfetti();
  } else {
    feedback.textContent = translations[currentLanguage].feedbackWrong; // Сообщение о неверном ответе
    feedback.style.color = "red";
  }

  // Обновляем статистику
  updateStatistics();

  // Генерируем новый вопрос
  generateQuestion();

  // Очищаем поле ввода
  document.getElementById("answer").value = "";
}

// Функция для обновления статистики
function updateStatistics() {
  // Обновляем текстовые элементы статистики
  document.querySelector("#statistics p:nth-of-type(1)").textContent =
    translations[currentLanguage].totalQuestions + ` ${totalQuestions}`;
  document.querySelector("#statistics p:nth-of-type(2)").textContent =
    translations[currentLanguage].correctAnswers + ` ${correctAnswers}`;
}

// Анимация шариков
function createConfetti() {
  const feedback = document.getElementById("feedback");
  feedback.textContent += " 🎈🎈🎈";
}

// Объект переводов
const translations = {
  en: {
    title: "Hello Maria", // Заголовок
    questionPlaceholder: "Your answer", // Подсказка в поле ввода
    submitButton: "Submit", // Текст на кнопке
    feedbackCorrect: "Correct! 🎉", // Сообщение при правильном ответе
    feedbackWrong: "Wrong. Try again.", // Сообщение при неправильном ответе
    totalQuestions: "Total questions:", // Текст статистики
    correctAnswers: "Correct answers:", // Текст статистики
  },
  ru: {
    title: "Привет Мария",
    questionPlaceholder: "Ваш ответ",
    submitButton: "Ответить",
    feedbackCorrect: "Правильно! 🎉",
    feedbackWrong: "Неправильно. Попробуйте снова.",
    totalQuestions: "Всего вопросов:",
    correctAnswers: "Правильных ответов:",
  },
  ua: {
    title: "Привіт Марія",
    questionPlaceholder: "Ваша відповідь",
    submitButton: "Відповісти",
    feedbackCorrect: "Правильно! 🎉",
    feedbackWrong: "Неправильно. Спробуйте знову.",
    totalQuestions: "Усього питань:",
    correctAnswers: "Правильних відповідей:",
  },
};

// Функция для установки языка
function setLanguage(lang) {
  // Сопоставляем элементы на странице с переводами
  const elementsToTranslate = {
    title: document.querySelector("h1"), // Заголовок
    questionPlaceholder: document.getElementById("answer"), // Поле ввода
    submitButton: document.getElementById("submit"), // Кнопка
    totalQuestions: document.querySelector("#statistics p:nth-of-type(1)"), // Статистика: всего вопросов
    correctAnswers: document.querySelector("#statistics p:nth-of-type(2)"), // Статистика: правильных ответов
  };

  // Устанавливаем текст для каждого элемента
  elementsToTranslate.title.textContent = translations[lang].title;
  elementsToTranslate.questionPlaceholder.placeholder =
    translations[lang].questionPlaceholder;
  elementsToTranslate.submitButton.textContent =
    translations[lang].submitButton;
  elementsToTranslate.totalQuestions.textContent =
    translations[lang].totalQuestions + ` ${totalQuestions}`;
  elementsToTranslate.correctAnswers.textContent =
    translations[lang].correctAnswers + ` ${correctAnswers}`;
}

// Обработчик для изменения языка
document.getElementById("language").addEventListener("change", (event) => {
  currentLanguage = event.target.value; // Получаем выбранный язык
  setLanguage(currentLanguage); // Обновляем текст на странице
});

// Инициализация языка (по умолчанию "en")
let currentLanguage = "ua"; // Начальный язык
setLanguage(currentLanguage); // Устанавливаем начальный язык

// События
document.getElementById("submit").addEventListener("click", checkAnswer);

// Начинаем с первого вопроса
generateQuestion();
