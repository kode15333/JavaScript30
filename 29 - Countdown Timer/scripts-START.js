let countDown;
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
function timer(seconds) {
    clearInterval(countDown)
    const now = Date.now()
    const then = now + seconds * 1000;
    displayTimeLeft(seconds)
    displayEndTime(then)
    countDown = setInterval(() => {
        const secondLeft = Math.round((then - Date.now()) / 1000)
        if(secondLeft < 0){
            clearInterval(countDown)
            return;
        }

        displayTimeLeft(secondLeft)
    },1000)
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSecond = seconds % 60;
    const display = `${minutes} : ${remainderSecond < 10 ? '0' : ''}${remainderSecond}`;
    timerDisplay.textContent = display
    document.title = display
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustHour = hour > 12 ? hour - 12 : hour
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustHour}:${minutes < 10 ? '0' : ''}${minutes}`
}

function startTimer(){
    const seconds = this.dataset.time;
    timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function (e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60)
    this.reset();
})
