let countdown;
let timeLeft;
let isPaused = false;
const timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const timerDisplay = document.getElementById('timerDisplay');
const themeSelect = document.getElementById('themeSelect');
const alarmSound = document.getElementById('alarmSound');

// プリセットボタンのクリックイベント
document.querySelectorAll('.preset').forEach(button => {
    button.addEventListener('click', () => {
        const time = button.getAttribute('data-time');
        timeInput.value = time; // 入力フィールドにプリセット時間を設定
    });
});

// タイマーを開始する
startButton.addEventListener('click', () => {
    if (isPaused) {
        isPaused = false;
        startButton.disabled = true;
        pauseButton.disabled = false;
        startCountdown();
    } else {
        const inputTime = parseInt(timeInput.value, 10);
        if (isNaN(inputTime) || inputTime <= 0) {
            alert("正しい秒数を入力してください");
            return;
        }
        timeLeft = inputTime;
        timerDisplay.textContent = formatTime(timeLeft);
        startCountdown();
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
});

// タイマーのフォーマット
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// タイマーを開始する
function startCountdown() {
    countdown = setInterval(() => {
        if (!isPaused && timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);
        }

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alarmSound.play(); // アラーム音を鳴らす
            alert("タイムアップ！");
            resetTimer();
        }
    }, 1000);
}

// 一時停止ボタン
pauseButton.addEventListener('click', () => {
    isPaused = true;
    pauseButton.disabled = true;
    startButton.disabled = false; // スタートボタンを再度クリック可能に
});

// タイマーをリセットする
resetButton.addEventListener('click', resetTimer);

function resetTimer() {
    clearInterval(countdown);
    timeLeft = 0;
    timerDisplay.textContent = "00:00";
    isPaused = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    timeInput.value = ''; // 入力フィールドをリセット
}

// テーマを変更する
themeSelect.addEventListener('change', (event) => {
    const theme = event.target.value;
    document.body.setAttribute('data-theme', theme); // bodyにテーマを設定

    switch (theme) {
        case 'dark':
            document.documentElement.style.setProperty('--header-color', '#000'); // ダークテーマのh1色を黒に設定
            break;
        case 'colorful':
            document.documentElement.style.setProperty('--header-color', '#000'); // カラフルテーマのh1色を黒に設定
            break;
        default:
            document.documentElement.style.setProperty('--header-color', '#000'); // デフォルトのh1色
            break;
    }
});
