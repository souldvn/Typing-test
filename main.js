const popup = document.querySelector(".popup");
const startButton = document.querySelector(".start-button");
const gameIsStarted = document.querySelector(".action");
const timer = document.querySelector(".timer");
const input = document.getElementById('input')
const resultPopup = document.getElementById('luck')




let intervalId;

let variants = [
    `<span>Ты </span><span>в </span><span>безопасности, </span><span>пока </span><span>ничего </span><span>не </span><span>знаешь</span>`,
    `<span>Если </span><span>я </span><span>не </span><span>буду </span><span>так </span><span>громко </span><span>кричать, </span><span>никто </span><span>не </span><span>обрадуется, </span><span>когда </span><span>я </span><span>наконец </span><span>сделаю </span><span>паузу!</span>`,
    `<span>Сильные </span><span>люди </span><span>не </span><span>любят </span><span>свидетелей </span><span>своей </span><span>слабости</span>`,
    `<span>Жизнь </span><span>состоит </span><span>не </span><span>в </span><span>том, </span><span>чтобы </span><span>найти </span><span>себя.</span><span> Жизнь </span><span>состоит </span><span>в </span><span>том, </span><span>чтобы </span><span>создать </span><span>себя</span>`,
    `<span>Безвыходным </span><span>мы </span><span>называем </span><span>положение,</span><span> выход </span><span>из </span><span>которого </span><span>нам </span><span>не </span><span>нравится</span>`,
    `<span>Несчастным </span><span>или </span><span>счастливым </span><span>человека </span><span>делают </span><span>только </span><span>его </span><span>мысли,</span><span> а </span><span>не </span><span>внешние </span><span>обстоятельства.</span><span> Управляя </span><span>своими </span><span>мыслями,</span><span> он </span><span>управляет </span><span>своим </span><span>счастьем</span>`,
    `<span>Уважай </span><span>себя </span><span>настолько,</span><span> чтобы </span><span>не </span><span>отдавать </span><span>всех </span><span>сил </span><span>души </span><span>и </span><span>сердца </span><span>тому,</span><span> кому </span><span>они </span><span>не </span><span>нужны </span><span>и </span><span>в </span><span>ком </span><span>это </span><span>вызвало </span><span>бы </span><span>только </span><span>пренебрежение</span>`,
    `<span>Если </span><span>тебе </span><span>тяжело,</span><span> значит </span><span>ты </span><span>поднимаешься </span><span>в </span><span>гору.</span><span> Если </span><span>тебе </span><span>легко,</span><span> значит </span><span>ты </span><span>летишь </span><span>в </span><span>пропасть</span>`,
    `<span>Мы </span><span>находимся </span><span>здесь,</span><span> чтобы </span><span>внести </span><span>свой </span><span>вклад </span><span>в </span><span>этот </span><span>мир.</span><span> Иначе </span><span>зачем </span><span>мы </span><span>здесь?</span>`,
    `<span>Сражение </span><span>выигрывает </span><span>тот,</span><span> кто </span><span>твердо </span><span>решил </span><span>его </span><span>выиграть</span>`,
    `<span>Избегайте </span><span>тех,</span><span> кто </span><span>старается </span><span>подорвать </span><span>вашу </span><span>веру </span><span>в </span><span>себя.</span><span> Эта </span><span>черта </span><span>свойственна </span><span>мелким </span><span>людям.</span><span> Великий </span><span>человек,</span><span> наоборот,</span><span> внушает </span><span>вам </span><span>чувство,</span><span> что </span><span>и </span><span>вы </span><span>можете </span><span>стать </span><span>великим</span>`
];

function startGame() {
    let defaultValues = {
        timer:0
    }
    input.disabled = false
    resultPopup.innerHTML=''
    input.value=''

    const text = document.querySelector(".action-text"); // обновляем ссылку на элемент с текстом
    let randomIndex = Math.floor(Math.random() * variants.length);
    text.innerHTML = variants[randomIndex];
    variants.splice(randomIndex, 1); // удаляем использованный текст из массива

    popup.classList.add("close");
    gameIsStarted.classList.remove("close");

    input.focus()
  
    intervalId = setInterval(() => {
      defaultValues.timer++
  
      timer.textContent = defaultValues.timer
    }, 1000);

    function checkOnLive() {
        const words = text.textContent.trim().split(' ');
        const inputWords = input.value.trim().split(' ');
        const wordElements = text.querySelectorAll('.action-text span');
        let isIncorrect = false; // добавили переменную для проверки на наличие неверных слов
        
        wordElements.forEach((el, i) => {
          if (inputWords[i] === undefined) {
            el.classList.remove('correct');
            el.classList.remove('incorrect');
            return;
          }
          if (words[i] === inputWords[i]) {
            el.classList.add('correct');
            el.classList.remove('incorrect');
          } else {
            el.classList.remove('correct');
            el.classList.add('incorrect');
            isIncorrect = true;
          }
        });
        if (!isIncorrect && words.length === inputWords.length) { // если нет неверных слов и все слова введены
            finishGame();
          }
      }


      

      function finishGame() {
        clearInterval(intervalId); // останавливаем таймер
        input.disabled = true; // делаем инпут неактивным
        const time = timer.textContent;

        
        // resultPopup.classList.remove('close')
        
        resultPopup.innerHTML = `<div class="popup result">
                            <p class="start-subtitle">
                                Ты справился за ${time} секунд!
                            </p>
                            <button class="result-button button">Еще раз</button>
                        </div>`
        const restartButton = resultPopup.querySelector('.result-button')
        restartButton.addEventListener('click', function(){
            startGame()
        })

        // alert(`Вы закончили за ${time} секунд`);
    }
    
    input.addEventListener('input', checkOnLive);

    // document.addEventListener('keydown', (event) => {
    //   if(event.code === 'Enter'){
    //     finishGame(); // вызываем функцию finishGame() по нажатию на Enter
    //   }
    // });
  }
  

function start() {
  startButton.addEventListener("click", startGame);
}


start();
