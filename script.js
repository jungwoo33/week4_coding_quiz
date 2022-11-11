// link to the "start_quiz" button
var click_button = document.querySelector("#start_quiz"); // select the "Start Quiz" button

// create questions ===================================================== /
var my_questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices:[
            '1. strings',
            '2. booleans',
            '3. alerts',
            '4. numbers'
        ],
        correct_answer: '3. alerts'
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
        answers:[
            '1. quotes',
            '2. curly brackets',
            '3. jw...',
            '4. square brackets'
        ],
        correct_answer: '2'
    }
]

// check if they are correctly coded...
// Note: this is for the test...
function console_test(){
    console.log(my_questions.length);
    console.log(my_questions[0]);
    console.log(my_questions[0].question);
    console.log(my_questions[0].choices);
    console.log(my_questions[0].choices[0]);    
}
// end of question creation ============================================ /

// create question displaying function ================================= /
function show_questions(questions, quiz_container){
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for eqch question...
    for(var i=0; i<my_questions.length; i++){
        // first reset the list of answers
        answers = [];

    }
}
// End of question displaying function ================================= /

function generate_quiz(){
    function show_questions(){

    }
    function show_results(){

    }
}


// when user clicks submit, show results
//submitButton.onclick = function(){
//    show_results();
//}

// Add event listener to "start_button" when "click" it.
// When you "click" the button, call "console_test" function
//generateBtn.addEventListener("click", write_password);
click_button.addEventListener("click", console_test);
