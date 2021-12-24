let randButton = document.getElementById('rand-button');

randButton.addEventListener('click', clickGenerate);

function clickGenerate() {
    let randContainer = document.getElementById('rand-container');
    let amountGenerated = document.getElementById('rand-nums-amount').value;
    let leftRange = document.getElementById('rand-left-range').value;
    let rightRange = document.getElementById('rand-right-range').value;
    let repeat = document.getElementById('rand-repeat').checked;

    if (validate()) {
        let randForm = document.getElementById('rand-form-container');
        let randNums = document.getElementById('rand-nums-container');
        let generatedNums = getRandomIntegers(+leftRange, +rightRange, +amountGenerated, !repeat);

        if (!randForm.classList.contains('border-bottom')) {
            randForm.classList.add('border-bottom');
            randForm.classList.add('border-info');
        }
        
        if (randNums !== null) {
            randContainer.removeChild(randNums);
        }
        randContainer.append(createContainerRandNums(generatedNums));
    }
}

function validate() {
    let result = true;

    let inputs = {
        amountGenerated: document.getElementById('rand-nums-amount'),
        leftRange: document.getElementById('rand-left-range'),
        rightRange: document.getElementById('rand-right-range'),
    }

    for (let key in inputs) {
        let input = inputs[key];

        if (
            input.type !== 'number' || input.value === '' ||
            (input === inputs.amountGenerated && (/[^\d]/.test(input.value) || /^0/.test(input.value))) ||
            (input !== inputs.amountGenerated && /[^\d-]/.test(input.value))
        ) {
            input.classList.add('border-danger');
            result = false;
        } else if (input.classList.contains('border-danger')) {
            input.classList.remove('border-danger');
        }
    }

    return result;
}

function getRandomIntegers(min, max, amount, repeat) {
    if (min > max) {
        let temp = max;
        max = min;
        min = temp;
    }

    if (!repeat) {
        let maxAmount = Math.abs(max - min) + 1;
        if (amount > maxAmount) {
            amount = maxAmount;
        }
    }

    let result = [];

    for (let i = 0; i < amount; i++) {
        let random = Math.random() * Math.abs(max - min + 1) + min;
        random = Math.floor(random);

        if (repeat === false && result.includes(random)) {
            i--;
            continue;
        }

        result[i] = random;
    }

    return result;
}

function createContainerRandNums(generatedNums) {
    let randContainer = document.createElement('div');
    let randNumsClassList = [
        'mx-auto',
        'text-center',
        'mt-3',
        'col-7',
    ];
    for (let randNumsClass of randNumsClassList) {
        randContainer.classList.add(randNumsClass);
    }
    randContainer.id = 'rand-nums-container';

    let randNumsDesc = document.createElement('div');
    randNumsDesc.classList.add('fs-3');
    if (generatedNums.length > 1) {
        randNumsDesc.append('Случайные числа:');
    } else {
        randNumsDesc.append('Случайное число:');
    }

    randContainer.append(randNumsDesc);

    let randNumsContainer = document.createElement('div');
    randNumsContainer.classList.add('d-flex');
    randNumsContainer.classList.add('flex-wrap');
    randNumsContainer.classList.add('justify-content-center');

    for (let generatedNum of generatedNums) {
        let randNum = document.createElement('span');
        randNum.classList.add('fs-1');
        randNum.classList.add('pe-4');
        randNum.append(generatedNum);

        randNumsContainer.append(randNum);
    }

    randContainer.append(randNumsContainer);

    return randContainer;
}