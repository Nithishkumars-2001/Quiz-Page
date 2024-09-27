

const questionNumber = document.querySelector(".question-number")
const questionText = document.querySelector(".question-text")
const optionContainer = document.querySelector(".option-container")
const answersIndicatorContainer = document.querySelector(".answers-indicator")
const homeBox = document.querySelector(".home-box")
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


// push the questions into availableQuestions Array
function setAvailableQuestion(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
    console.log(availableQuestions)
}

// set question number and number and options
function getNewQuestion(){
    //set Question number
    questionNumber.innerHTML = " Question " + (questionCounter + 1) + " of " + quiz.length;

    //set question text
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    // get the position of 'questionIndex' from the availableQuestions Array;
    const index1 = availableQuestions.indexOf(questionIndex);

    // remove the 'questionIndex' from the availableQuestions Array, so that the question does not
    availableQuestions.splice(index1,1);
     
    // set option
    // get the length of options
    const optionLen = currentQuestion.options.length

    //push option into availableOption Array
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }

    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    //create options in html
    for(let i=0; i<optionLen; i++){
        // random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of 'optonIndex' from the availableOptions
        const index2 = availableOptions.indexOf(optonIndex);
        // remove the 'optonIndex' from the availableOptions, so that the option does not repeat
        availableOptions.splice(index2,1)
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter++
}

// get the result of current attempt question
function getResult(element){
    const id = parseInt(element.id);
    console.log(typeof id)
    if(id === currentQuestion.answer){
        //set the green color to correct option
        element.classList.add("correct");
        // add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct:" + correctAnswers)
    }
    else{
        element.classList.add("wrong");
         // add the indicator to wrong mark
         updateAnswerIndicator("wrong");

        // if the answer is incorrect the show the correct option by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOption();
}

// make all the option unclickable once the user select a option
function unclickableOption(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("alredy-answered")
    }
}

function  answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div")
        answersIndicatorContainer.appendChild(indicator);

    }
}
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    // hide quiz quizBox
    quizBox.classList.add("hide");
    // show result Box
    resultBox.classList.remove("hide");
    quizResult();
}

// get the quiz Result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;

    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    // hide the resultBox
    resultBox.classList.add("hide");
    // show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    // hide result Box
    resultBox.classList.add("hide");
    // show home box
    homeBox.classList.remove("hide");
    resetQuiz();
}

function  startQuiz(){

    // hide home box
    homeBox.classList.add("hide");
    // show quiz box
    quizBox.classList.remove("hide");

    setAvailableQuestion();
    getNewQuestion();
    // to create indicator of answer
    answersIndicator();
}
