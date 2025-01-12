let timeLeft;
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isWorkTime = true;
let timerId = null;

const modeBtns = document.querySelectorAll('.mode-btn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update browser tab title
    document.title = `${timeString} - ${isWorkTime ? 'Focus' : 'Break'} Time`;
}

function updateStartButtonIcon() {
    const icon = startButton.querySelector('i');
    icon.className = timerId === null ? 'fas fa-play' : 'fas fa-pause';
}

function setActiveMode(isWork) {
    modeBtns.forEach(btn => {
        btn.classList.remove('active');
        if ((isWork && btn.dataset.mode === 'work') || 
            (!isWork && btn.dataset.mode === 'break')) {
            btn.classList.add('active');
        }
    });
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? workTime : breakTime;
                setActiveMode(isWorkTime);
                updateDisplay();
                // Reset title when timer completes
                document.title = isWorkTime ? 'Time to Focus!' : 'Take a Break!';
                alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
            }
        }, 1000);
    } else {
        clearInterval(timerId);
        timerId = null;
    }
    updateStartButtonIcon();
}

// Initialize
timeLeft = workTime;
setActiveMode(true);
updateDisplay();
updateStartButtonIcon();

// Event listeners
modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const isWork = btn.dataset.mode === 'work';
        if (isWork !== isWorkTime) {
            clearInterval(timerId);
            timerId = null;
            isWorkTime = isWork;
            timeLeft = isWork ? workTime : breakTime;
            setActiveMode(isWork);
            updateDisplay();
            updateStartButtonIcon();
        }
    });
});

resetButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? workTime : breakTime;
    setActiveMode(isWorkTime);
    updateDisplay();
    updateStartButtonIcon();
    document.title = 'Pomodoro Timer'; // Reset title on reset
});

startButton.addEventListener('click', startTimer); 