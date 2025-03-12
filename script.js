

//Array of object

const quiz = [
    {
        q: ' HTML stands for - ',
        options:['HighText Machine Language','HyperText and links Markup Language','HyperText Markup Language','None of these'],
        answer: 2
    },
    {
        q: ' CSS stands for - ',
        options:['Cascade style sheets','Color and style sheets','Cascading style sheets','None of the above'],
        answer: 2
    },
    {
        q: ' Which type of JavaScript language is ',
        options:['Object-Oriented','Object-Based','Assembly-language','High-level'],
        answer: 1
    },
    {
        q: ' Is Bootstrap3 mobile-first? ',
        options:['True','False','Can not say','May be'],
        answer: 0
    },
    {
        q: ' PHP stands for - ',
        options:['Hypertext Preprocessor','Pretext Hypertext Preprocessor','Personal Home Processor','None of the above'],
        answer: 0
    }
]

document.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // Disable right-click
});

document.addEventListener("keydown", function (event) {
    if (event.key == "F12" || 
        (event.ctrlKey && event.shiftKey && event.key == "I") || 
        (event.ctrlKey && event.shiftKey && event.key == "J") || 
        (event.ctrlKey && event.key == "U") || 
        (event.ctrlKey && event.key == "S") || 
        (event.ctrlKey && event.key == "H")) {
        event.preventDefault(); // Block inspect element shortcuts
    }
});