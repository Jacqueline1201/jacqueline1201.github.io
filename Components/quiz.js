let Questions = [
    {"question":"Where did we first meet?",
        "correct_answer":"hackathon",
        "incorrect_answers":
            ["boba shop","anime expo","LCS"]
    },
    {"question":"What is Jackie's favorite league champion?",
        "correct_answer":"sona",
        "incorrect_answers":
            ["yuumi","aphelios","ahri"]
    },
    {"question":"What did myork buy first item in the promotion game to master?",
        "correct_answer":"Moonstone Renewer",
        "incorrect_answers":
            ["Shurelya's","Ardent Censor","Archangel's Staff"]
    },
    {"question":"Where was the second time we met?",
        "correct_answer":"anime expo",
        "incorrect_answers":
            ["boba shop","anime impulse","LCS"]
    },
    {"question":"How many times did we meet in real life before we became a thing?",
        "correct_answer":"3",
        "incorrect_answers":
            ["1","2","4"]
    }
];
const ques = document.getElementById("ques")

async function fetchQuestions() {
	try {
		const response = await
		fetch('https://opentdb.com/api.php?amount=10');
		if (!response.ok) {
			throw new Error(`Something went wrong!!
		Unable to fecth the data`);
		}
		const data = await response.json();
		Questions = data.results;
	}
	catch (error) {
		console.log(error);
		ques.innerHTML = `<h5 style='color: red'>
		${error}</h5>`;
	}
}
// fetchQuestions();

let currQuestion = 0
let score = 0


ques.innerHTML = `<h4>Please Wait!! 
Loading Questions...</h4>`


function loadQues() {
	const opt = document.getElementById("opt");
	let currentQuestion = Questions[currQuestion].question;
	if (currentQuestion.indexOf('"') > -1) {
		currentQuestion = currentQuestion
			.replace(/"/g, '\"');
	}
	if (currentQuestion.indexOf("'") > -1) {
		currentQuestion = currentQuestion
			.replace(/&#039;/g, '\'');
	}
	ques.innerText = currentQuestion;
	opt.innerHTML = ""
	const correctAnswer = Questions[currQuestion]
		.correct_answer;
	console.log(Questions);
	const incorrectAnswers = Questions[currQuestion]
		.incorrect_answers;
	const options = [correctAnswer, ...incorrectAnswers];
	options.sort(() => Math.random() - 0.5);
	options.forEach((option) => {
		if (option.indexOf('"') > -1) {
			option = option.replace(/"/g, '\"');
		}
		if (option.indexOf("'") > -1) {
			option = option.replace(/'/g, '\'');
		}
		const choicesdiv = document.createElement("div");
		const choice = document.createElement("input");
		const choiceLabel = document.createElement("label");
		choice.type = "radio";
		choice.name = "answer";
		choice.value = option;
		choiceLabel.textContent = option;
		choicesdiv.appendChild(choice);
		choicesdiv.appendChild(choiceLabel);
		opt.appendChild(choicesdiv);
	});
}

setTimeout(() => {
	loadQues();
	if (Questions.length === 0) {
		ques.innerHTML = `<h5 style='color: red'>Unable 
		to fetch data, Please try again!!</h5>`
	}
}, 2000)


function loadScore() {
	const totalScore = document.getElementById("score");
	totalScore.textContent = `You scored ${score} out 
	of ${Questions.length}`;
	totalScore.innerHTML += "<h3>All Answers</h3>"
	Questions.forEach((el, index) => {
		totalScore.innerHTML += `<p>${index + 1}.
		${el.correct_answer}</p>`
	})
    totalScore.innerHTML += "<h2>Now time for your gift!</h2>"
}


function nextQuestion() {
	if (currQuestion < Questions.length - 1) {
		currQuestion++;
		loadQues();
	} else {
		document.getElementById("opt").remove()
		document.getElementById("ques").remove()
		document.getElementById("btn").remove()
		loadScore();
	}
}

function checkAns() {
	const selectedAns = document.
		querySelector('input[name="answer"]:checked').value;

	if (selectedAns === Questions[currQuestion].correct_answer) {
		score++;
		nextQuestion();
	} else {
		nextQuestion();
	}
}
