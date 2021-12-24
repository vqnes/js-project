document.getElementById('result-sum').append(sessionStorage.getItem('winSum') + '$');

let resultTitle = document.getElementById('result-title');
if (sessionStorage.getItem('isWin') === 'true') {
    resultTitle.append('Поздравляем с выигрышом!');
} else {
    resultTitle.append('К сожалению, Вы проиграли :(');
}