// link to the "start_quiz" button
var start_quiz = document.querySelector("#start_quiz"); // select the "Start Quiz" button
var correct_wrong = document.querySelector("#correct_wrong");

// pre-define global variables:
var elapsed_question_num = 0; // total elapsing (showing) questions
var user_selection = []; // array of user choices for each question
//var time_left = 60; // inital time left in [sec]
var timer_status = "off"; // set initial timer as "off" condition
var stopwatch = document.querySelector("#stopwatch");
var time_left;
var final_score;

// create questions ===================================================== /
var my_questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        choices:[
            '1. strings',
            '2. booleans',
            '3. alerts',
            '4. numbers'
        ],
        correct_answer: '3'
    },
    {
        question: 'The condition in an if/else statement is enclosed within _____.',
        choices:[
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
    console.log(typeof "my_questions[0].correct_answer"); // string
}


// end of question creation ============================================ /



// create question displaying function ================================= /
function remove_previous_question(){
    var quiz = document.querySelector("#quiz");
    // remove previous elements:
    while(quiz.firstChild){
        quiz.removeChild(quiz.firstChild);
    }
    //correct_wrong.children[0].textContent = "";
}

function reset(){
    remove_previous_question();

    // reset() requires additional process as follows:
    elapsed_question_num = 0; // reset to 0

    // delete "Prev" button and show "Next" button
    var next = document.querySelector("#next");
    var prev = document.querySelector("#prev");
    next.style.display = "inline-block";
    prev.style.display = "none";

    // kill previous timer and restart timer. 
    reset_timer();
}


function display_next_question(){
    var quiz = document.querySelector("#quiz");
    
    remove_previous_question(); // remove previous question before showing the next question:
    if(elapsed_question_num < my_questions.length){
        var i = elapsed_question_num;
        //console.log(i);

        // show "Prev" button from the second question
        var next = document.querySelector("#next");
        next.style.display = "inline-block";
        if(elapsed_question_num !== 0){
            var prev = document.querySelector("#prev");
            prev.style.display = "inline-block";
        }


        var p = document.createElement("p"); // create <p></p> element for question
        p.textContent = my_questions[i].question; // include question in <p></p>
        quiz.appendChild(p);

        var ul = document.createElement("ul"); // create unordered list (ul)
        var choice_length = my_questions[i].choices.length; //each question's choice length; This will allow me to have different length choices.
        for(var j=0; j<choice_length; j++){
            // include radio button lists
            var li = document.createElement("li");
            var input = document.createElement("input");
            input.setAttribute("type","radio");
            input.setAttribute("name","answer");
            input.setAttribute("value",j+1); // 1, 2, 3, 4
            var label = document.createElement("label");
            label.textContent = my_questions[i].choices[j];
            li.appendChild(input);
            li.appendChild(label);
            ul.appendChild(li);
        }
        quiz.appendChild(ul);

        // if user select an answer and click "Next" button, 
        // read the user selection and save it to an array, and
        // increase "elapsed_question_num" to move to the next question
        var next = document.querySelector("#next");
        var prev = document.querySelector("#prev");
        document.getElementById('next').onclick = function(){
            var selected = document.querySelector('input[type=radio][name=answer]:checked');
            // if nothing is selected, show alert,
            // otherwise move foreward.
            if(selected === null){
                var start = Date.now(); // [milli-second]
                //console.log(start);
                window.alert("Please choose an answer!");
                var finish = Date.now(); // [milli-second]
                //console.log(finish);
                var time_reduction = Math.floor((Number(finish) - Number(start))/1000); // only consider [integer] part
                //console.log(time_reduction);

                // subtract "pausing" time from the time remaining
                time_left = time_left - time_reduction;
            }else{
                user_selection[elapsed_question_num] = selected.value;
                //console.log(user_selection[elapsed_question_num]);

                // show correct/wrong, let's skip this 
                /*
                var i = elapsed_question_num;
                if(Number(user_selection[i]) === Number(my_questions[i].correct_answer)){
                    // show correct!
                    correct_wrong.children[0].textContent = "Correct!";
                }else{
                    // show wrong! & 10 sec time reduction
                    correct_wrong.children[0].textContent = "Wrong!"
                    time_left = time_left - 10;
                }
                */

                elapsed_question_num++;
            }
        }
        document.getElementById('prev').onclick = function(){
            elapsed_question_num--;
            remove_previous_question();
            display_next_question();
        }
        next.addEventListener("click",display_next_question);
    }else{
        // delete previous question and show the final result
        show_score();
                
        reset_timer();
        stopwatch.children[0].textContent = " "
    }
}
// End of question displaying function ================================= /

function show_score(){
    // delete previous question and show the final result
    remove_previous_question();
    var score = 0;
    for(var i=0;i<my_questions.length;i++){
        //console.log(typeof(user_selection[i])); // string
        //console.log(typeof(my_questions[i].correct_answer)); // string

        if(Number(user_selection[i]) === Number(my_questions[i].correct_answer)){
            score++;
        }
    }
    final_score = score; // I will use this later
    var p = document.createElement("p"); // create <p></p> element for question
    p.textContent = "Your final score: "+ score + " out of " + my_questions.length; // include question in <p></p>
    quiz.appendChild(p);

    // deactivate both "Prev" and "Next" button
    var next = document.querySelector("#next");
    var prev = document.querySelector("#prev");
    next.style.display = "none";
    prev.style.display = "none";

    // include Initial form & submit button:
    var label = document.createElement("label");
    label.setAttribute("for","user_initial");
    label.textContent = "Initial: ";
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("id","user_initial")
    quiz.appendChild(label);
    quiz.appendChild(input);
    
    var input2 = document.createElement("input");
    input2.setAttribute("type","submit");
    input2.setAttribute("id","submit_button");
    input2.setAttribute("value","Submit");
    quiz.appendChild(input2);

    // when click "Submit" button, retrieve the user infor and show it again.
    var submit_button = document.querySelector("#submit_button");
    submit_button.addEventListener("click", retrieve_score);
}


function retrieve_score(){
    // save user info to local storage:
    var initial = document.querySelector("#user_initial");
    var current_initial = initial.value;
    localStorage.setItem("initial",current_initial);

    var score = final_score;
    localStorage.setItem("score",score);

    // retrieve user info from the local storage:
    var last_initial = localStorage.getItem("initial");
    var last_score = localStorage.getItem("score");

    // Now, clear the previous question & show the saved info:
    remove_previous_question();
    var h2 = document.createElement("h2");
    h2.textContent = "Highscores:"
    var p = document.createElement("p");
    p.textContent = last_initial + ": " + last_score
    quiz.appendChild(h2);
    quiz.appendChild(p);
}


// Show stopwatch ====================================================== /
function start_timer(){
    if(timer_status === "off"){
        // if timer is "off" turn it on
        time_left = 20;
        timer_status = setInterval(show_stopwatch,1000);
        function show_stopwatch(){
            if(time_left > 0){
                stopwatch.children[0].textContent = time_left + " sec";
                time_left --;
            }else{
                show_score();
                stopwatch.children[0].textContent = "Time Over!";
                clearInterval(timer_status); // kill countdown    
            }
        }
    }
}

function reset_timer(){
    // clear opened timer, and switch the status to "off"
    clearInterval(timer_status);
    timer_status = "off";
}

function generate_quiz(){
    reset();
    display_next_question();
    start_timer();
}

start_quiz.addEventListener("click", generate_quiz);