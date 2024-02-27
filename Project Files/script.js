function validateInput() {
    // Get values from input boxes
    var quizName = document.getElementById('question-input').value;
    var numQuestions = document.getElementById('num-input').value;

    console.log('Quiz Name:', quizName);
    console.log('Number of Questions:', numQuestions);

    if (quizName === '' || numQuestions === '' || numQuestions === '1' || numQuestions === '0') {
        console.log('Inputs are blank. Showing alert.');
        alert('Please fill in both the quiz name and number of questions.');
    } else {

    // Scroll to the desired section (change 'section-id' to your actual section ID)
        document.getElementById('sec-create').scrollIntoView({ behavior: 'smooth' });

        document.getElementById('question1-input').removeAttribute('disabled');
        document.getElementById('answer1-input').removeAttribute('disabled');
        document.getElementById('answer2-input').removeAttribute('disabled');
        document.getElementById('answer3-input').removeAttribute('disabled');
        document.getElementById('answer4-input').removeAttribute('disabled');
        document.getElementById('answer1-radio').removeAttribute('disabled');
        document.getElementById('answer2-radio').removeAttribute('disabled');
        document.getElementById('answer3-radio').removeAttribute('disabled');
        document.getElementById('answer4-radio').removeAttribute('disabled');

        document.getElementById('question-input').value = "";
        document.getElementById('num-input').value = "";

        const contButton = document.getElementById('cont_btn');
        if (numQuestions === 1) {
            contButton.addEventListener('click', disableNextQuestionButton);
        }
    }
        
}




const quizData = [];
let currentQuestionNum = 1;
let totalQuestions;
const submitQuizButton = document.getElementById('submit-quiz');


// Function to reset the input boxes in the form
function resetForm() {
    const form = document.getElementById('question-form');
    form.reset();
    
}

function updateSubmitButtonState() {
    if (currentQuestionNum === totalQuestions) {
        document.getElementById("submit-quiz").disabled = false;
    }
}

// Function to handle the "Next Question" button click
function handleNextQuestion() {
    // Get values from input boxes
    const question1 = document.getElementById('question1-input').value;
    const answer1 = document.getElementById('answer1-input').value;
    const answer2 = document.getElementById('answer2-input').value;
    const answer3 = document.getElementById('answer3-input').value;
    const answer4 = document.getElementById('answer4-input').value;
    const answer1Radio = document.getElementById('answer1-radio');
    const answer2Radio = document.getElementById('answer2-radio');
    const answer3Radio = document.getElementById('answer3-radio');
    const answer4Radio = document.getElementById('answer4-radio');

    if (!question1 || !answer1 || !answer2 || !answer3 || !answer4) {
        alert('Please fill in all the fields before proceeding to the next question.');
        return;
    }

    if (!answer1Radio.checked && !answer2Radio.checked && !answer3Radio.checked && !answer4Radio.checked) {
        alert('Please select the correct answer before proceeding.');
        return; // Stop execution if no radio button is selected
    }

    // Store data in the array
    const questionData = {
        questionNumber: currentQuestionNum,
        questions: question1,
        answers: [answer1, answer2, answer3, answer4]
    };

    quizData.push(questionData);
    
    // Reset the form
    resetForm();
    currentQuestionNum++;
    console.log(currentQuestionNum);
    console.log(totalQuestions);
    

    updateSubmitButtonState();
    updateQuestionNumberText();

    if (currentQuestionNum === totalQuestions) {
        disableNextQuestionButton();
    }

    // You can also add any additional logic for the next question here
}

function updateQuestionNumberText() {
    const questionNumberText = `Question ${currentQuestionNum} of ${totalQuestions}`;
    document.getElementById('q-num').textContent = questionNumberText;
}

function disableNextQuestionButton() {
    const nextQuestionButton = document.getElementById('nxt-question');
    nextQuestionButton.disabled = true;
}

document.addEventListener('DOMContentLoaded', function () {
// Add an event listener to the "Next Question" button
    const nextQuestionButton = document.getElementById('nxt-question');
    if (nextQuestionButton) {
    nextQuestionButton.addEventListener('click', handleNextQuestion);
    }
    

    const numQuestionsInput = document.getElementById('num-input');
    numQuestionsInput.addEventListener('input', function () {
        // Update the totalQuestions variable dynamically
        totalQuestions = parseInt(numQuestionsInput.value, 10);

        // Initial update of the question number text
        updateQuestionNumberText();
    });
});

function generateQuizID() {
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 10000);
    return `quiz_${timestamp}_${randomPart}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-quiz');
    const shareLine = document.getElementById('shareable');
    submitButton.addEventListener('click', function (){
        const question1 = document.getElementById('question1-input').value;
        const answer1 = document.getElementById('answer1-input').value;
        const answer2 = document.getElementById('answer2-input').value;
        const answer3 = document.getElementById('answer3-input').value;
        const answer4 = document.getElementById('answer4-input').value;
        const answer1Radio = document.getElementById('answer1-radio');
        const answer2Radio = document.getElementById('answer2-radio');
        const answer3Radio = document.getElementById('answer3-radio');
        const answer4Radio = document.getElementById('answer4-radio');

        if (!question1 || !answer1 || !answer2 || !answer3 || !answer4) {
            alert('Please fill in all the fields before proceeding to the next question.');
            return;
        }
    
        if (!answer1Radio.checked && !answer2Radio.checked && !answer3Radio.checked && !answer4Radio.checked) {
            alert('Please select the correct answer before proceeding.');
            return; // Stop execution if no radio button is selected
        }
        const quizID = generateQuizID();
        const baseURL = 'https://example.com/quiz/';
        const shareableLink = `${baseURL}${quizID}`;

        shareLine.innerHTML = `Given below is your shareable link: <a href="/submit.html" target="_blank"> ${shareableLink}</a>`;
        console.log(shareableLink);
        });    
});