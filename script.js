// script.js

// Menginisialisasi variabel game
let score = 0;
let level = 1;
let currentProblem = {};
const MAX_NUMBER = 100;
const COLLECTION_MILESTONE = 5; // Dapatkan hewan baru setiap 5 jawaban benar

// Daftar hewan yang bisa dikoleksi
const animalList = [
    { name: "Sapi", emoji: "🐄", unlocked: false },
    { name: "Domba", emoji: "🐑", unlocked: false },
    { name: "Ayam", emoji: "🐔", unlocked: false },
    { name: "Bebek", emoji: "🦆", unlocked: false },
    { name: "Kelinci", emoji: "🐇", unlocked: false },
    { name: "Kuda", emoji: "🐎", unlocked: false },
    { name: "Babi", emoji: "🐖", unlocked: false },
    { name: "Kucing", emoji: "🐈", unlocked: false },
];
let collectedAnimals = [];

// Mengambil elemen-elemen DOM
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const feedbackMessage = document.getElementById('feedback-message');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const momoCharacter = document.getElementById('momo-character');
const animalCollectionDiv = document.getElementById('animal-collection');
const collectionMessage = document.getElementById('collection-message');

/**
 * Mengatur ulang UI dan memulai masalah matematika baru.
 */
function generateProblem() {
    let operation, num1, num2, answer;
    const operations = ['+', '-'];
    
    // Tambahkan perkalian dan pembagian saat level mencapai 4
    if (level >= 4) {
        operations.push('*', '/');
    }

    // Pilih operasi secara acak dari array operations
    operation = operations[Math.floor(Math.random() * operations.length)];

    if (operation === '+') {
        num1 = Math.floor(Math.random() * (MAX_NUMBER / 2)) + 1;
        num2 = Math.floor(Math.random() * (MAX_NUMBER / 2)) + 1;
        answer = num1 + num2;
    } else if (operation === '-') {
        num1 = Math.floor(Math.random() * MAX_NUMBER) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
    } else if (operation === '*') {
        // Batasi angka untuk perkalian agar tidak terlalu sulit
        num1 = Math.floor(Math.random() * 9) + 1;
        num2 = Math.floor(Math.random() * 9) + 1;
        answer = num1 * num2;
    } else if (operation === '/') {
        // Pastikan hasil pembagian adalah bilangan bulat
        num2 = Math.floor(Math.random() * 9) + 2; // Mulai dari 2 agar tidak dibagi 1
        answer = Math.floor(Math.random() * 9) + 1;
        num1 = num2 * answer;
    }

    // Menyimpan masalah saat ini dan menampilkannya di UI
    currentProblem = { num1, num2, operation, answer };
    questionText.textContent = `Berapa ${num1} ${operation} ${num2}?`;
    answerInput.value = '';
    feedbackMessage.textContent = '';
    feedbackMessage.classList.remove('opacity-100', 'text-green-500', 'text-red-500');
    momoCharacter.style.transform = 'scale(1)';
}

/**
 * Memeriksa jawaban yang dimasukkan oleh pengguna.
 */
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value, 10);
    
    if (isNaN(userAnswer)) {
        showFeedback("Masukkan angka, ya!", "text-red-500");
        return;
    }

    if (userAnswer === currentProblem.answer) {
        // Jawaban benar
        score++;
        if (score % 5 === 0) {
            level++;
            showFeedback("🎉 Selamat! Levelmu naik!", "text-green-500");
            collectNewAnimal(); // Panggil fungsi untuk mengumpulkan hewan baru
        } else {
            showFeedback("Jawabanmu benar! 👍", "text-green-500");
            momoCharacter.style.transform = 'scale(1.1) rotate(10deg)';
        }
        updateUI();
        setTimeout(generateProblem, 1500);
    } else {
        // Jawaban salah
        showFeedback("Oops, salah. Coba lagi! 😥", "text-red-500");
    }
}

/**
 * Mengumpulkan hewan baru dan memperbarui tampilan koleksi.
 */
function collectNewAnimal() {
    const unlockedAnimal = animalList.find(animal => !animal.unlocked);
    if (unlockedAnimal) {
        unlockedAnimal.unlocked = true;
        collectedAnimals.push(unlockedAnimal);
        updateCollectionDisplay();
        showCollectionMessage(`Selamat! Kamu mendapatkan ${unlockedAnimal.name}!`);
    } else {
        showCollectionMessage("Koleksimu sudah penuh! Hebat!");
    }
}

/**
 * Memperbarui tampilan koleksi hewan.
 */
function updateCollectionDisplay() {
    animalCollectionDiv.innerHTML = ''; // Hapus tampilan lama
    animalList.forEach(animal => {
        const animalElement = document.createElement('div');
        animalElement.className = 'text-center';
        const emoji = animal.unlocked ? `<span class="text-4xl md:text-5xl">${animal.emoji}</span>` : `<span class="text-4xl md:text-5xl opacity-30">❓</span>`;
        const text = animal.unlocked ? `<p class="mt-1 text-sm text-gray-700">${animal.name}</p>` : `<p class="mt-1 text-sm text-gray-400">Terkunci</p>`;
        animalElement.innerHTML = `${emoji}${text}`;
        animalCollectionDiv.appendChild(animalElement);
    });
}

/**
 * Menampilkan pesan feedback kepada pengguna.
 * @param {string} message - Pesan yang akan ditampilkan.
 * @param {string} colorClass - Kelas warna Tailwind CSS (misalnya 'text-green-500').
 */
function showFeedback(message, colorClass) {
    feedbackMessage.textContent = message;
    feedbackMessage.classList.add('opacity-100', colorClass);
}

/**
 * Menampilkan pesan di area koleksi.
 * @param {string} message - Pesan yang akan ditampilkan.
 */
function showCollectionMessage(message) {
    collectionMessage.textContent = message;
    collectionMessage.classList.add('opacity-100');
    setTimeout(() => {
        collectionMessage.classList.remove('opacity-100');
    }, 3000);
}

/**
 * Memperbarui tampilan skor dan level.
 */
function updateUI() {
    scoreElement.textContent = score;
    levelElement.textContent = level;
}

// Menambahkan event listener ke tombol "Cek"
submitBtn.addEventListener('click', checkAnswer);

// Menambahkan event listener untuk tombol 'Enter' pada input
answerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkAnswer();
    }
});

// Memulai permainan saat halaman dimuat
generateProblem();
updateCollectionDisplay(); // Tampilkan koleksi kosong di awal
