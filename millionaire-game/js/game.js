const questions = [
    {
        question: 'Где, если верить пословице, любопытной Варваре нос оторвали?',
        variantA: 'На базаре',
        variantB: 'На озере',
        variantC: 'В шкафу',
        variantD: 'Под кроватью',
        answer: 'A',
        prize: 100,
    },
    {
        question: 'Какой из этих летательных аппаратов появился раньше других?',
        variantA: 'Самолет',
        variantB: 'Дерижабль',
        variantC: 'Вертолет',
        variantD: 'Космическая ракета',
        answer: 'B',
        prize: 200,
    },
    {
        question: 'В какую одежду принято плакать, чтобы вызвать сочувствие?',
        variantA: 'В платок',
        variantB: 'В штаны',
        variantC: 'В жилетку',
        variantD: 'В пиджак',
        answer: 'C',
        prize: 300,
    },
    {
        question: 'Кто или что из указанного имеет регулятор уровня громкости?',
        variantA: 'Теща',
        variantB: 'Двигатель',
        variantC: 'Микроволновая печь',
        variantD: 'Микшер',
        answer: 'D',
        prize: 500,
    },
    {
        question: 'Какое растение называют дикой розой?',
        variantA: 'Жасмин',
        variantB: 'Шиповник',
        variantC: 'Розмарин',
        variantD: 'Акация',
        answer: 'B',
        prize: 1000,
    },
    {
        question: 'Какая из этих планет расположена ближе к других к земле?',
        variantA: 'Венера',
        variantB: 'Плутон',
        variantC: 'Марс',
        variantD: 'Меркурий',
        answer: 'A',
        prize: 2000,
    },
    {
        question: 'На каком инструменте, как считается, играл древнерусский певец и сказитель Боян?',
        variantA: 'На баяне',
        variantB: 'На виолончели',
        variantC: 'На гуслях',
        variantD: 'На гитаре',
        answer: 'C',
        prize: 4000,
    },
    {
        question: 'Какая картина Малевича находится в Русском музее?',
        variantA: '"Точильщик"',
        variantB: 'Белый квадрат',
        variantC: 'Черный квадрат',
        variantD: 'Красный квадрат',
        answer: 'D',
        prize: 8000,
    },
    {
        question: 'Какой титул имел Дон Кихот?',
        variantA: 'Барон',
        variantB: 'Маркиз',
        variantC: 'Идальго',
        variantD: 'Вождь',
        answer: 'C',
        prize: 16000,
    },
    {
        question: 'Кто автор антиутопического романа "О дивный новый мир"?',
        variantA: 'Олдос Хаксли',
        variantB: 'Рэй Бредбери',
        variantC: 'Джордж Оруэлл',
        variantD: 'Иван Замятин',
        answer: 'A',
        prize: 32000,
    },
    {
        question: 'Как называется самая глубокая точка поверхности Земли, находящаяся на дне Марианской впадины?',
        variantA: 'Филиппинская плита',
        variantB: 'Бездна Челленджера',
        variantC: 'Кермадек',
        variantD: 'Черное логово',
        answer: 'B',
        prize: 64000,
    },
    {
        question: 'В какой из этих стран один из официальных языков - французский?',
        variantA: 'Кения',
        variantB: 'Эквадор',
        variantC: 'Венесуэла',
        variantD: 'Республика Гаити',
        answer: 'D',
        prize: 125000,
    },
    {
        question: 'В каком году произошла Куликовская битва?',
        variantA: '1380',
        variantB: '1569',
        variantC: '1616',
        variantD: '1773',
        answer: 'A',
        prize: 250000,
    },
    {
        question: 'Шкала Сковилла - это шкала оценки...',
        variantA: 'Качества атмосферного воздуха',
        variantB: 'Привлекательности женщин',
        variantC: 'Уровня моря',
        variantD: 'Остроты перца',
        answer: 'D',
        prize: 500000,
    },
    {
        question: 'В каком из этих фильмов не снимался Александр Абдулов?',
        variantA: '"Карнавал"',
        variantB: '"Московские каникулы"',
        variantC: '"Чародеи"',
        variantD: '"Убить дракона"',
        answer: 'B',
        prize: 1000000,
    },
];

/*
    {
        ...
        variants: [
            'A' => 'text',
            'B' => 'text',
            ...
        ]
        ...
    }
*/

let numCurrentQuestion = 0;

let timerId;

changeQuestion();

document.getElementById('prizes').append(createPrizes());

window.addEventListener('load', countdown());

let answers = [
    document.getElementById('answer-a'),
    document.getElementById('answer-b'),
    document.getElementById('answer-c'),
    document.getElementById('answer-d'),
];

for (let answer of answers) {
    answer.addEventListener('click', clickAnswer);
}

document.getElementById('continue-game').addEventListener('click', clickContinue);
document.getElementById('exit-game').addEventListener('click', clickEndGame);

document.getElementById('fifty-fifty-help').addEventListener('click', function () {
    if (
        this.classList.contains('disabled-button') ||
        timerId === null
    ) {
        return;
    }

    let objectQuestion = questions[numCurrentQuestion - 1];
    let answers = [
        document.getElementById('answer-a'),
        document.getElementById('answer-b'),
        document.getElementById('answer-c'),
        document.getElementById('answer-d'),
    ];

    let indexRandAnswer;
    do {
        indexRandAnswer = getRandomInt(0, answers.length - 1);
    } while (objectQuestion.answer === answers[indexRandAnswer].dataset.value);

    for (let i = 0; i < answers.length; i++) {
        let answerLetter = answers[i].dataset.value;

        if (
            answerLetter !== objectQuestion.answer &&
            i !== indexRandAnswer
        ) {
            answers[i].classList.add('hidden-answer');
        }
    }

    this.classList.add('disabled-button');
});
document.getElementById('hall-help').addEventListener('click', clickHallHelp);
document.getElementById('call-friend-help').addEventListener('click', clickFriendHelp);

function clickHallHelp() {
    if (
        this.classList.contains('disabled-button') ||
        timerId === null
    ) {
        return;
    }

    let answersContainers = document.querySelectorAll('.answers-container > div');
    let answers = [];
    for (let answersContainer of answersContainers) {
        if (!answersContainer.classList.contains('hidden-answer')) {
            answers.push(answersContainer);
        }
    }

    let randomsProbabilities = getRandomsInInterval(answers.length);

    for (let i = 0; i < answers.length; i++) {
        let probabilitieContainer = document.createElement('div');
        probabilitieContainer.classList.add('probabilitie-answer');
        probabilitieContainer.append(randomsProbabilities[i] + '%');

        answers[i].append(probabilitieContainer);
    }

    this.classList.add('disabled-button');
}

function getRandomsInInterval(amount, limit = 100) {
    let result = [];

    if (limit >= 0 && Number.isInteger(limit)) {
        let tempLimit = limit;

        for (let i = 0; i < amount; i++) {
            let randomInt = getRandomInt(0, tempLimit);
            tempLimit -= randomInt;
            if (tempLimit < 0) {
                randomInt += tempLimit;
                tempLimit = 0;
            }

            result[i] = randomInt;
        }

        let sumRandoms = result.reduce(function (previousValue, currentElem) {
            return previousValue + currentElem;
        });

        if (sumRandoms < limit) {
            result[getRandomInt(0, amount - 1)] += limit - sumRandoms;
        }
    }

    return result;
}

function clickFriendHelp() {
    if (
        this.classList.contains('disabled-button') ||
        timerId === null
    ) {
        return;
    }

    let objectQuestion = questions[numCurrentQuestion - 1];

    let answersContainers = document.querySelectorAll('.answers-container > div');
    let answers = [];
    for (let answersContainer of answersContainers) {
        if (!answersContainer.classList.contains('hidden-answer')) {
            answers.push(answersContainer);
        }
    }

    let indexRandAnswer;
    do {
        indexRandAnswer = getRandomInt(0, answers.length - 1);
    } while (objectQuestion.answer === answers[indexRandAnswer].dataset.value);

    answers[indexRandAnswer].classList.add('possible-answer');

    this.classList.add('disabled-button');
}

function countdown(start = 60, end = 0) {
    let timeBlock = document.getElementById('game-time');
    timeBlock.textContent = start;

    timerId = setInterval(function () {
        start--;
        timeBlock.textContent = start;

        if (start === end) {
            clearInterval(timerId);
            timerId = null;
            showRightAnswer();

            if (numCurrentQuestion % 5 === 0 || numCurrentQuestion < 5) {
                setTimeout(function () {
                    showResult(false, getGuaranteedSum());
                }, 3000);
            } else {
                document.getElementById('exit-game').classList.remove('disabled-button');
            }
        }
    }, 1000)
}

function createPrizes() {
    let prizesContainer = document.createElement('div');
    prizesContainer.id = 'prizes-items';

    for (let i = 0; i < questions.length; i++) {
        let prizeItem = document.createElement('div');
        prizeItem.classList.add('prize');
        if ((i + 1) % 5 === 0) {
            prizeItem.classList.add('guaranteed-prize');
        } else if (i === 0) {
            prizeItem.classList.add('current-prize');
        }

        let numberPrize = document.createElement('span');
        numberPrize.classList.add('number-prize');
        numberPrize.textContent = (i + 1) + '.';

        let sumPrize = document.createElement('span');
        sumPrize.classList.add('sum-prize');
        sumPrize.textContent = prepareNumber(questions[i].prize) + '$';

        prizeItem.append(numberPrize);
        prizeItem.append(sumPrize);

        prizesContainer.append(prizeItem);
    }

    return prizesContainer;
}

function prepareNumber(number) {
    number = String(number);

    for (let i = number.length - 4; i >= 0; i -= 3) {
        number = number.slice(0, i + 1) + ' ' + number.slice(i + 1, number.length);
    }

    return number;
}

function clickAnswer() {
    let answer = this.dataset.value;
    let rightAnswer = questions[numCurrentQuestion - 1].answer;
    let answerContainers = [
        document.getElementById('answer-a'),
        document.getElementById('answer-b'),
        document.getElementById('answer-c'),
        document.getElementById('answer-d'),
    ];

    if (this.classList.contains('hidden-answer')) {
        return;
    }

    for (let answerContainer of answerContainers) {
        if (
            answerContainer.classList.contains('selected-answer') ||
            answerContainer.classList.contains('right-answer')
        ) {
            return;
        }
    }

    clearInterval(timerId);
    timerId= null;

    this.classList.add('selected-answer');
    showRightAnswer();

    if (answer === rightAnswer) {
        document.getElementById('exit-game').classList.remove('disabled-button');

        if (numCurrentQuestion !== questions.length) {
            document.getElementById('continue-game').classList.remove('disabled-button');
        }
    } else {
        setTimeout(function () {
            showResult(false, getGuaranteedSum());
        }, 3000);
    }
}

function changeQuestion() {
    numCurrentQuestion++;

    if (numCurrentQuestion > questions.length) {
        setTimeout(function () {
            showResult(true, questions[numCurrentQuestion - 2].prize);
        }, 3000);
        return false;
    }

    let objectQuestion = questions[numCurrentQuestion - 1];
    let answers = [
        document.getElementById('answer-a'),
        document.getElementById('answer-c'),
        document.getElementById('answer-b'),
        document.getElementById('answer-d'),
    ];

    document.getElementById('number-question').textContent = numCurrentQuestion;
    document.getElementById('game-question').textContent = objectQuestion.question;

    for (let answer of answers) {
        answer.getElementsByClassName('answer-desc')[0].textContent = objectQuestion['variant' + answer.dataset.value];

        if (answer.classList.contains('right-answer')) {
            answer.classList.remove('right-answer');
        }

        if (answer.classList.contains('selected-answer')) {
            answer.classList.remove('selected-answer');
        }

        if (
            document.querySelector('.probabilitie-answer') !== null &&
            !answer.classList.contains('hidden-answer')
        ) {
            answer.removeChild(document.querySelector('.probabilitie-answer'));
        }

        if (answer.classList.contains('hidden-answer')) {
            answer.classList.remove('hidden-answer');
        }

        if (answer.classList.contains('possible-answer')) {
            answer.classList.remove('possible-answer');
        }
    }

    if (numCurrentQuestion > 1) {
        document.getElementsByClassName('prize')[numCurrentQuestion - 2].classList.remove('current-prize');
        document.getElementsByClassName('prize')[numCurrentQuestion - 1].classList.add('current-prize');
    }

    document.getElementById('exit-game').classList.add('disabled-button');
    document.getElementById('continue-game').classList.add('disabled-button');

    return true;
}

function showRightAnswer() {
    let rightAnswer = questions[numCurrentQuestion - 1].answer;
    let answerContainer = document.getElementById('answer-' + rightAnswer.toLowerCase());

    if (answerContainer.classList.contains('selected-answer')) {
        answerContainer.classList.remove('selected-answer');
    }

    answerContainer.classList.add('right-answer');
}

function clickContinue() {
    if (this.classList.contains('disabled-button')) {
        return;
    }

    if (changeQuestion()) {
        countdown();
    }
}

function showResult(isWin, winSum) {
    sessionStorage.setItem('winSum', prepareNumber(winSum));
    sessionStorage.setItem('isWin', isWin);
    document.location = 'endGame.html';
}

function getGuaranteedSum() {
    let numGuaranteed = numCurrentQuestion - 1;

    if (numCurrentQuestion > 5 && numCurrentQuestion % 5 !== 0) {
        while (numGuaranteed % 5 !== 0) {
            numGuaranteed--;
        }

        return questions[numGuaranteed - 1].prize;
    }

    return 0;
}

function clickEndGame() {
    if (this.classList.contains('disabled-button')) {
        return;
    }

    showResult(true, questions[numCurrentQuestion - 1].prize);
}

function getRandomInt(min, max) {
    if (min > max) {
        let temp = max;
        max = min;
        min = temp;
    }

    let random = Math.random() * Math.abs(max - min + 1) + min;

    return Math.floor(random);
}
