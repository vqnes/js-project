const questions = [
    {
        question: 'Где, если верить пословице, любопытной Варваре нос оторвали?',
        variants: {
            A: 'На базаре',
            B: 'На озере',
            C: 'В шкафу',
            D: 'Под кроватью',    
        },
        answer: 'A',
        prize: 100,
    },
    {
        question: 'Какой из этих летательных аппаратов появился раньше других?',
        variants: {
            A: 'Самолет',
            B: 'Дерижабль',
            C: 'Вертолет',
            D: 'Космическая ракета',    
        },
        answer: 'B',
        prize: 200,
    },
    {
        question: 'В какую одежду принято плакать, чтобы вызвать сочувствие?',
        variants: {
            A: 'В платок',
            B: 'В штаны',
            C: 'В жилетку',
            D: 'В пиджак',    
        },
        answer: 'C',
        prize: 300,
    },
    {
        question: 'Кто или что из указанного имеет регулятор уровня громкости?',
        variants: {
            A: 'Теща',
            B: 'Двигатель',
            C: 'Микроволновая печь',
            D: 'Микшер',    
        },
        answer: 'D',
        prize: 500,
    },
    {
        question: 'Какое растение называют дикой розой?',
        variants: {
            A: 'Жасмин',
            B: 'Шиповник',
            C: 'Розмарин',
            D: 'Акация',
        },
        answer: 'B',
        prize: 1000,
    },
    {
        question: 'Какая из этих планет расположена ближе к других к земле?',
        variants: {
            A: 'Венера',
            B: 'Плутон',
            C: 'Марс',
            D: 'Меркурий',
        },
        answer: 'A',
        prize: 2000,
    },
    {
        question: 'На каком инструменте, как считается, играл древнерусский певец и сказитель Боян?',
        variants: {
            A: 'На баяне',
            B: 'На виолончели',
            C: 'На гуслях',
            D: 'На гитаре',
        },
        answer: 'C',
        prize: 4000,
    },
    {
        question: 'Какая картина Малевича находится в Русском музее?',
        variants: {
            A: '"Точильщик"',
            B: 'Белый квадрат',
            C: 'Черный квадрат',
            D: 'Красный квадрат',
        },
        answer: 'D',
        prize: 8000,
    },
    {
        question: 'Какой титул имел Дон Кихот?',
        variants: {
            A: 'Барон',
            B: 'Маркиз',
            C: 'Идальго',
            D: 'Вождь',
        },
        answer: 'C',
        prize: 16000,
    },
    {
        question: 'Кто автор антиутопического романа "О дивный новый мир"?',
        variants: {
            A: 'Олдос Хаксли',
            B: 'Рэй Бредбери',
            C: 'Джордж Оруэлл',
            D: 'Иван Замятин',
        },
        answer: 'A',
        prize: 32000,
    },
    {
        question: 'Как называется самая глубокая точка поверхности Земли, находящаяся на дне Марианской впадины?',
        variants: {
            A: 'Филиппинская плита',
            B: 'Бездна Челленджера',
            C: 'Кермадек',
            D: 'Черное логово',
        },
        answer: 'B',
        prize: 64000,
    },
    {
        question: 'В какой из этих стран один из официальных языков - французский?',
        variants: {
            A: 'Кения',
            B: 'Эквадор',
            C: 'Венесуэла',
            D: 'Республика Гаити',
        },
        answer: 'D',
        prize: 125000,
    },
    {
        question: 'В каком году произошла Куликовская битва?',
        variants: {
            A: '1380',
            B: '1569',
            C: '1616',
            D: '1773',
        },
        answer: 'A',
        prize: 250000,
    },
    {
        question: 'Шкала Сковилла - это шкала оценки...',
        variants: {
            A: 'Качества атмосферного воздуха',
            B: 'Привлекательности женщин',
            C: 'Уровня моря',
            D: 'Остроты перца',
        },
        answer: 'D',
        prize: 500000,
    },
    {
        question: 'В каком из этих фильмов не снимался Александр Абдулов?',
        variants: {
            A: '"Карнавал"',
            B: '"Московские каникулы"',
            C: '"Чародеи"',
            D: '"Убить дракона"',
        },
        answer: 'B',
        prize: 1000000,
    },
];

let numCurrentQuestion = 0;

let timerId;

let answers = document.querySelectorAll('.answers-container > div');

changeQuestion();

document.getElementById('prizes').append(createPrizes());

window.addEventListener('load', countdown());

for (let answer of answers) {
    answer.addEventListener('click', clickAnswer);
}

document.getElementById('continue-game').addEventListener('click', clickContinue);
document.getElementById('exit-game').addEventListener('click', clickEndGame);

document.getElementById('fifty-fifty-help').addEventListener('click', clickFiftyFifty);
document.getElementById('hall-help').addEventListener('click', clickHallHelp);
document.getElementById('call-friend-help').addEventListener('click', clickFriendHelp);

function clickFiftyFifty() {
    if (
        this.classList.contains('disabled-button') ||
        timerId === null
    ) {
        return;
    }

    let objectQuestion = questions[numCurrentQuestion - 1];

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
}

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

        if (tempLimit > 0) {
            result[getRandomInt(0, amount - 1)] += tempLimit;
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
            setTimeout(function () {
                showResult(false, getGuaranteedSum());
            }, 3000);
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
    if (this.classList.contains('hidden-answer')) {
        return;
    }

    let answer = this.dataset.value;
    let rightAnswer = questions[numCurrentQuestion - 1].answer;
    let answerContainers = answers;

    for (let answerContainer of answerContainers) {
        if (
            answerContainer.classList.contains('selected-answer') ||
            answerContainer.classList.contains('right-answer')
        ) {
            return;
        }
    }

    clearInterval(timerId);
    timerId = null;

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

    document.getElementById('number-question').textContent = numCurrentQuestion;
    document.getElementById('game-question').textContent = objectQuestion.question;

    for (let answer of answers) {
        answer.querySelector('.answer-desc').textContent = objectQuestion.variants[answer.dataset.value];

        if (answer.classList.contains('right-answer')) {
            answer.classList.remove('right-answer');
        }

        if (answer.classList.contains('selected-answer')) {
            answer.classList.remove('selected-answer');
        }

        if (answer.classList.contains('hidden-answer')) {
            answer.classList.remove('hidden-answer');
        }

        if (answer.querySelector('.probabilitie-answer') !== null) {
            answer.removeChild(answer.querySelector('.probabilitie-answer'));
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
