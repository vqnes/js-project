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

    let amountGenerated = document.getElementById('rand-nums-amount');
    let range = {
        left: document.getElementById('rand-left-range'),
        right: document.getElementById('rand-right-range'),
    };

    for (let key in range) {
        if (
            range[key].type !== 'number' ||
            range[key].value === '' ||
            /[^\d-]/.test(range[key].value)
        ) {
            range[key].classList.add('border-danger');
            result = false;
        } else if (range[key].classList.contains('border-danger')) {
            range[key].classList.remove('border-danger');
        }
    }

    if (
        amountGenerated.type !== 'number' ||
        amountGenerated.value === '' ||
        /^0|[^\d]/.test(amountGenerated.value)
    ) {
        amountGenerated.classList.add('border-danger');
        result = false;
    } else if (amountGenerated.classList.contains('border-danger')) {
        amountGenerated.classList.remove('border-danger');
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
    let randContainerClassList = [
        'mx-auto',
        'text-center',
        'mt-3',
        'col-7',
    ];
    for (let randContainerClass of randContainerClassList) {
        randContainer.classList.add(randContainerClass);
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
    let randNumsContainerClassList = [
        'd-flex',
        'flex-wrap',
        'justify-content-center',
    ];
    for (let randNumsContainerClass of randNumsContainerClassList) {
        randNumsContainer.classList.add(randNumsContainerClass);
    }

    let randNumClassList = [
        'fs-1',
        'pe-4',
    ];
    for (let generatedNum of generatedNums) {
        let randNum = document.createElement('span');
        for (let randNumClass of randNumClassList) {
            randNum.classList.add(randNumClass);
        }
        randNum.append(generatedNum);

        randNumsContainer.append(randNum);
    }

    randContainer.append(randNumsContainer);

    return randContainer;
}