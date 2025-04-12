const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


const quizQuestions = [
  {
    id: 1,
    question: "Koji je glavni grad Francuske?",
    options: ["Berlin", "Madrid", "Pariz", "Rim"],
    answer: "Pariz"
  },
  {
    id: 2,
    question: "Koja planeta je poznata kao Crveni planet?",
    options: ["Venera", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    id: 3,
    question: "Tko je autor drame 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
    answer: "William Shakespeare"
  }
];


app.get('/api/quiz', (req, res) => {
  const questions = quizQuestions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options
  }));
  res.json({ success: true, questions });
});


app.post('/api/quiz', (req, res) => {
  const userAnswers = req.body.answers; 
  if (!userAnswers || typeof userAnswers !== 'object') {
    return res.status(400).json({ success: false, message: "Neispravni podaci." });
  }
  let score = 0;
  quizQuestions.forEach(q => {
    if (userAnswers[q.id] && userAnswers[q.id] === q.answer) {
      score++;
    }
  });
  res.json({ success: true, score, total: quizQuestions.length });
});

app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
