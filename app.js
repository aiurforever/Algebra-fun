// Select elements
const app = document.getElementById('app');
const progressBar = document.getElementById('progress-bar');
const scoreDisplay = document.getElementById('score');
const hintModal = document.getElementById('hint-modal');
const hintText = document.getElementById('hint-text');

// Data for chapters and activities
const content = [
    {
        chapter: 'Chapter 1: The Mystery of Variables',
        lesson: `
            <h2>The Mystery of Variables</h2>
            <p>Imagine you have a treasure chest, but you don't know how many gold coins are inside. Instead of guessing, we use a letter to represent the unknown number. This letter is called a <strong>variable</strong>.</p>
            <p>Let's use <strong>x</strong> to represent the number of coins in the chest.</p>
            <img src="images/treasure_chest.png" alt="Treasure Chest" width="200">
        `,
        activity: {
            type: 'input',
            question: 'If x = 5, how many coins are in the treasure chest?',
            answer: '5',
            hint: 'Substitute 5 for x.',
            explanation: 'Since x represents the number of coins and x = 5, there are 5 coins.'
        }
    },
    {
        chapter: 'Chapter 2: Balancing Equations',
        lesson: `
            <h2>Balancing Equations</h2>
            <p>An equation is like a balanced scale. Whatever is on one side must equal what's on the other side.</p>
            <img src="images/balance_scale.png" alt="Balance Scale" width="200">
            <p>For example, x + 2 = 6. We need to find the value of x that makes this equation true.</p>
        `,
        activity: {
            type: 'multiple-choice',
            question: 'Solve for x: x + 2 = 6',
            options: ['2', '4', '6', '8'],
            answer: '4',
            hint: 'Subtract 2 from both sides.',
            explanation: 'Subtracting 2 from both sides gives x = 4.'
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
            type: 'drag-and-drop',
            question: 'Match the expressions to their values when x = 3.',
            pairs: {
                'x + x': '6',
                'x * 2': '6',
                'x - 1': '2',
                'x / x': '1'
            },
            hint: 'Calculate each expression using x = 3.',
            explanation: 'By substituting x with 3, we solve each expression.'
        }
    },
    // Add more chapters as needed...
];

// State variables
let currentChapter = 0;
let score = 0;

// Function to display the lesson
function showLesson() {
    const chapter = content[currentChapter];
    updateProgress();
    app.innerHTML = `
        <h1>${chapter.chapter}</h1>
        ${chapter.lesson}
        <button onclick="showActivity()">Try an Activity</button>
    `;
}

// Function to display the activity
function showActivity() {
    const activity = content[currentChapter].activity;
    let activityHTML = `<h2>Activity</h2><p>${activity.question}</p>`;
    switch (activity.type) {
        case 'input':
            activityHTML += `
                <input type="text" id="userAnswer" placeholder="Enter your answer here">
                <button onclick="checkAnswer()">Submit</button>
                <button onclick="showHint()">Need a Hint?</button>
                <p id="feedback" class="feedback"></p>
            `;
            break;
        case 'multiple-choice':
            activityHTML += '<div class="multiple-choice">';
            activity.options.forEach(option => {
                activityHTML += `
                    <label>
                        <input type="radio" name="mcq" value="${option}"> ${option}
                    </label><br>
                `;
            });
            activityHTML += `
                </div>
                <button onclick="checkAnswer()">Submit</button>
                <button onclick="showHint()">Need a Hint?</button>
                <p id="feedback" class="feedback"></p>
            `;
            break;
        case 'drag-and-drop':
            // Simplified drag-and-drop implementation
            activityHTML += `
                <div id="drag-container">
                    <div id="expressions" class="drag-column">
                        <h3>Expressions</h3>
                        ${Object.keys(activity.pairs).map(expr => `<div class="draggable" draggable="true" data-value="${expr}">${expr}</div>`).join('')}
                    </div>
                    <div id="values" class="drag-column">
                        <h3>Values</h3>
                        ${Object.values(activity.pairs).map(val => `<div class="droppable" data-value="${val}">${val}</div>`).join('')}
                    </div>
                </div>
                <button onclick="checkDragAndDrop()">Submit</button>
                <button onclick="showHint()">Need a Hint?</button>
                <p id="feedback" class="feedback"></p>
            `;
            break;
    }
    app.innerHTML = activityHTML;
    if (activity.type === 'drag-and-drop') {
        initializeDragAndDrop();
    }
}

// Function to show hints
function showHint() {
    const activity = content[currentChapter].activity;
    hintText.textContent = activity.hint;
    hintModal.style.display = 'block';
}

// Function to close hint modal
function closeHint() {
    hintModal.style.display = 'none';
}

// Function to check the user's answer
function checkAnswer() {
    const activity = content[currentChapter].activity;
    const feedback = document.getElementById('feedback');
    let userAnswer;
    let isCorrect = false;

    switch (activity.type) {
        case 'input':
            userAnswer = document.getElementById('userAnswer').value.trim();
            if (userAnswer === activity.answer) {
                isCorrect = true;
            }
            break;
        case 'multiple-choice':
            const options = document.getElementsByName('mcq');
            for (const option of options) {
                if (option.checked) {
                    userAnswer = option.value;
                    if (userAnswer === activity.answer) {
                        isCorrect = true;
                    }
                    break;
                }
            }
            break;
    }

    if (isCorrect) {
        feedback.className = 'feedback correct';
        feedback.textContent = 'Correct! ' + activity.explanation;
        score += 10;
        updateScore();
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

// Function to initialize drag-and-drop functionality
function initializeDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const droppables = document.querySelectorAll('.droppable');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    droppables.forEach(droppable => {
        droppable.addEventListener('dragover', dragOver);
        droppable.addEventListener('drop', drop);
    });
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.value);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    event.target.textContent = data;
    event.target.dataset.matched = data;
}

function checkDragAndDrop() {
    const activity = content[currentChapter].activity;
    const feedback = document.getElementById('feedback');
    const droppables = document.querySelectorAll('.droppable');
    let isCorrect = true;

    droppables.forEach(droppable => {
        if (droppable.dataset.matched !== undefined) {
            const expression = droppable.dataset.matched;
            const value = droppable.dataset.value;
            if (activity.pairs[expression] !== value) {
                isCorrect = false;
            }
        } else {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        feedback.className = 'feedback correct';
        feedback.textContent = 'Correct! ' + activity.explanation;
        score += 10;
        updateScore();
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
        feedback.textContent = 'Some matches are incorrect. Please try again.';
    }
}

// Function to update progress bar
function updateProgress() {
    const progressPercent = ((currentChapter) / content.length) * 100;
    progressBar.style.width = progressPercent + '%';
}

// Function to update score display
function updateScore() {
    scoreDisplay.textContent = score;
}

// Function to display completion message
function showCompletionMessage() {
    updateProgress();
    app.innerHTML = `
        <h1>Congratulations!</h1>
        <p>You've completed all the chapters with a score of ${score} points!</p>
        <p>Keep practicing to become an algebra star!</p>
        <button onclick="restartApp()">Restart</button>
    `;
}

// Function to restart the app
function restartApp() {
    currentChapter = 0;
    score = 0;
    updateScore();
    showLesson();
}

// Start the app by showing the first lesson
showLesson();

// Close hint modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == hintModal) {
        hintModal.style.display = 'none';
    }
}
