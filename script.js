const startButton = document.getElementById('start-btn');
const questionBox = document.querySelector('.question-box');
const questionText = document.getElementById('question-text');
const responseContainer = document.querySelector('.response-container');

// Questions and answers data with scores
const questions = [
    {
        category: "Ambition",
        friendly: "How ambitious are you? Would you say you’re setting bold goals, making steady progress, or exploring opportunities in your own way?",
        sassy: "Ambition? Oh, so tell me—are you climbing the ladder, holding it steady, or just sitting at the bottom, watching others do the work?",
        answers: [
            { text: "Sky’s the limit! I’m here to break records and shatter ceilings.", score: 10 },
            { text: "I prefer steady, meaningful steps towards my goals.", score: 5 },
            { text: "I’m building my own ladder, thank you very much.", score: 3 }
        ]
    },
    {
        category: "Networking",
        friendly: "How do you approach networking? Are you a social butterfly, an intentional connector, or someone who creates meaningful relationships on your own terms?",
        sassy: "Networking? Oh, so are you here to connect and make moves, or just collect free snacks and business cards you’ll never look at?",
        answers: [
            { text: "I thrive in networking events and love meeting new people.", score: 10 },
            { text: "I value quality over quantity, so I make my connections count.", score: 5 },
            { text: "I’m observing and choosing connections that resonate with me.", score: 3 }
        ]
    },
    {
        category: "Popularity",
        friendly: "How do you handle popularity? Do you shine in the spotlight, keep things balanced, or focus on being respected in your own way?",
        sassy: "Popularity? Oh, are you here to lead the crowd, blend into the background, or is popularity a concept that doesn’t even register for you?",
        answers: [
            { text: "Leading the crowd, obviously. What’s a scene without me?", score: 10 },
            { text: "I don’t need to lead; I just make sure my presence is felt when it matters.", score: 5 },
            { text: "Popularity? That’s not even on my radar—why conform when I can be me?", score: 3 }
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;

// Function to load the next question
function loadQuestion(index) {
    const currentQuestion = questions[index];
    const tone = index % 2 === 0 ? 'friendly' : 'sassy'; // Alternate between friendly and sassy tone
    questionText.textContent = tone === 'friendly' ? currentQuestion.friendly : currentQuestion.sassy;

    responseContainer.innerHTML = ''; // Clear previous buttons

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.dataset.score = answer.score;
        button.className = 'response';
        button.addEventListener('click', handleResponse);
        responseContainer.appendChild(button);
    });
}

// Handle response click
function handleResponse(event) {
    totalScore += parseInt(event.target.dataset.score); // Add score from the selected response
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

// Show results at the end
function showResults() {
    questionBox.innerHTML = `
        <p>Your total score: ${totalScore}</p>
        <p>Thank you for completing the questionnaire!</p>
        <button id="restart-btn">Restart</button>
    `;

    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;
    loadQuestion(currentQuestionIndex);
    questionBox.style.display = 'none';
    questionBox.style.opacity = 0;
    startButton.style.display = 'block';
}

// Start button click event
startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    questionBox.style.display = 'block';
    questionBox.style.opacity = 1;
    loadQuestion(currentQuestionIndex);
});
