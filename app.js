

const questionNumber = document.querySelector(".question-number")
const questionText = document.querySelector(".question-text")
const optionContainer = document.querySelector(".option-container")

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];


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
    questionNumber.innerHTML = "Question" + (questionCounter + 1) + "of" + quiz.length;

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
    }
    else{
        element.classList.add("wrong");

        // if the answer is incorrect the show the correct option by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }

    unclickableOption();
}

// make all the option unclickable once the user select a option
function unclickableOption(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("alredy-answered")
    }
}

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
    }
    else{
        getNewQuestion();
    }
}

window.onload = function(){
    setAvailableQuestion();
    getNewQuestion();
}