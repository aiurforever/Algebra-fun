// Select the app container
const app = document.getElementById('app');

// Data for chapters and activities
const content = [
    {
        chapter: 'Chapter 1: The Mystery of Variables',
        lesson: `
            <h2>The Mystery of Variables</h2>
            <p>Imagine you have a treasure chest, but you don't know how many gold coins are inside. Instead of guessing, we use a letter to represent the unknown number. This letter is called a <strong>variable</strong>.</p>
            <p>Let's use <strong>x</strong> to represent the number of coins in the chest.</p>
        `,
        activity: {
            question: 'If x = 5, how many coins are in the treasure chest?',
            answer: '5',
            explanation: 'Since x represents the number of coins and x = 5, there are 5 coins.'
        }
    },
    {
        chapter: 'Chapter 2: Balancing Equations',
        lesson: `
            <h2>Balancing Equations</h2>
            <p>An equation is like a balanced scale. Whatever is on one side must equal what's on the other side.</p>
            <p>For example, x + 2 = 6. We need to find the value of x that makes this equation true.</p>
        `,
        activity: {
            question: 'Solve for x: x + 2 = 6',
            answer: '4',
            explanation: 'Subtract 2 from both sides: x = 6 - 2, so x = 4.'
        }
    },
    {
        chapter: 'Chapter 3: The Magic of Operations',
        lesson: `
            <h2>The Magic of Operations</h2>
            <p>Just like regular numbers, we can add or subtract variables.</p>
            <p>For example, if x = 2, what is x + x?</p>
        `,
        activity: {
            question: 'If x = 2, what is x + x?',
            answer: '4',
            explanation: 'x + x = 2 + 2 = 4.'
        }
    },
    // Add more chapters as needed...
];

// Keep track of the current chapter
let currentChapter = 0;

// Function to display the lesson
function showLesson() {
    const chapter = content[currentChapter];
    app.innerHTML = `
        <h1>${chapter.chapter}</h1>
        ${chapter.lesson}
        <button onclick="showActivity()">Try an Activity</button>
    `;
}

// Function to display the activity
function showActivity() {
    const activity = content[currentChapter].activity;
    app.innerHTML = `
        <h2>Activity</h2>
        <p>${activity.question}</p>
        <input type="text" id="userAnswer" placeholder="Enter your answer here">
        <button onclick="checkAnswer()">Submit</button>
        <p id="feedback" class="feedback"></p>
    `;
}

// Function to check the user's answer
function checkAnswer() {
    const userAnswer = document.getElementById('userAnswer').value.trim();
    const activity = content[currentChapter].activity;
    const feedback = document.getElementById('feedback');
    if (userAnswer === activity.answer) {
        feedback.className = 'feedback correct';
        feedback.textContent = 'Correct! ' + activity.explanation;
        // Proceed to the next chapter after a delay
        setTimeout(() => {
            currentChapter++;
            if (currentChapter < content.length) {
                showLesson();
            } else {
                showCompletionMessage();
            }
        }, 3000);
    } else {
        feedback.className = 'feedback incorrect';
        feedback.textContent = 'Oops! That\'s not quite right. Try again.';
    }
}

// Function to display completion message
function showCompletionMessage() {
    app.innerHTML = `
        <h1>Congratulations!</h1>
        <p>You've completed all the chapters. Keep practicing to become an algebra star!</p>
    `;
}

// Start the app by showing the first lesson
showLesson();
