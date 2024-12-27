// Select elements from the HTML
const startButton = document.getElementById('start-button');
const questionBox = document.getElementById('question-box');
let questionText = document.getElementById('question-text');
let responseContainer = document.querySelector('.response-container');

// Questions array
const questions = [
    {
        category: "Ambition",
        tones: [
            {
                tone: "friendly",
                question: "How ambitious are you? Would you say you’re setting bold goals, making steady progress, or exploring opportunities in your own way?",
                answers: [
                    { text: "I’m smashing goals left and right—what’s next?", score: 10 },
                    { text: "I prefer thoughtful, steady progress at my own pace.", score: 5 },
                    { text: "I’m figuring out a ladder that works for me—step by step.", score: 3 }
                ]
            },
            {
                tone: "sassy",
                question: "Ambition? Oh, so tell me—are you climbing the ladder, holding it steady, or sitting at the bottom watching everyone else?",
                answers: [
                    { text: "Oh, I see the sass! Well, I’m sprinting to the top—try to keep up!", score: 10 },
                    { text: "I get what you’re saying, but I’m steady and consistent—it works for me.", score: 5 },
                    { text: "Oh, okay, I think I missed the memo about the ladder—here’s what I’m doing.", score: 3 }
                ]
            }
        ]
    },
    {
        category: "Networking",
        tones: [
            {
                tone: "friendly",
                question: "How do you approach networking? Are you a social butterfly, an intentional connector, or someone who creates meaningful relationships on your own terms?",
                answers: [
                    { text: "I thrive in networking events and love meeting new people.", score: 10 },
                    { text: "I value quality over quantity, so I make my connections count.", score: 5 },
                    { text: "I try my best, but networking events can be a bit much.", score: 3 }
                ]
            },
            {
                tone: "sassy",
                question: "Networking? Oh, are you here to connect and make moves, or just collect snacks and business cards you’ll never look at?",
                answers: [
                    { text: "Oh, that’s a vibe! But trust me, I’m working the room and making moves.", score: 10 },
                    { text: "I see where you’re coming from. I prefer meaningful connections over small talk.", score: 5 },
                    { text: "Oh, I think I misunderstood the vibe at first, but here’s what I try to do.", score: 3 }
                ]
            }
        ]
    },
    {
        category: "Popularity",
        tones: [
            {
                tone: "friendly",
                question: "How do you handle popularity? Do you shine in the spotlight, keep things balanced, or focus on being respected in your own way?",
                answers: [
                    { text: "Spotlight? I’m built for it—watch me glow!", score: 10 },
                    { text: "I don’t crave attention, but I stay respected.", score: 5 },
                    { text: "I’m learning how to balance my space and others’ attention.", score: 3 }
                ]
            },
            {
                tone: "sassy",
                question: "Popularity? Oh, are you leading the crowd, blending in, or wondering why people even care?",
                answers: [
                    { text: "Oh, I feel the tone change, but I’m still leading the crowd effortlessly.", score: 10 },
                    { text: "Noted! I keep it balanced and stay respected.", score: 5 },
                    { text: "Oh, okay, I didn’t realize it was about that, but here’s how I handle it.", score: 3 }
                ]
            }
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;

// Load the current question
function loadQuestion(index) {
    if (index >= questions.length * 2) {
        showResults();
        return;
    }

    const categoryIndex = Math.floor(index / 2);
    const toneIndex = index % 2;
    const currentTone = questions[categoryIndex].tones[toneIndex];

    // Update question text and answers
    questionText.textContent = currentTone.question;
    responseContainer.innerHTML = ''; // Clear previous responses

    currentTone.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.dataset.score = answer.score;
        button.className = 'response';
        button.addEventListener('click', handleResponse);
        responseContainer.appendChild(button);
    });
}

// Handle user responses
function handleResponse(event) {
    const score = parseInt(event.target.dataset.score);
    if (isNaN(score)) return;

    totalScore += score;
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
}

// Show final results
function showResults() {
    questionBox.innerHTML = `
        <p>Your total score: ${totalScore}</p>
        <p>Thank you for completing the quiz!</p>
        <button id="restart-btn">Restart Quiz</button>
    `;

    const restartButton = document.getElementById('restart-btn');
    restartButton.addEventListener('click', restartQuiz);
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;

    // Reset the DOM elements
    questionBox.style.display = 'none';
    questionBox.innerHTML = `
        <p id="question-text"></p>
        <div class="response-container"></div>
    `;

    questionText = document.getElementById('question-text');
    responseContainer = document.querySelector('.response-container');
    startButton.style.display = 'block';
}

// Start the quiz
startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    questionBox.style.display = 'block';
    loadQuestion(currentQuestionIndex);
});
