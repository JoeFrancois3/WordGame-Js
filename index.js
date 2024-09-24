document.addEventListener('DOMContentLoaded', () => {
    var buttons = document.querySelectorAll('.difficultyButton-container button');
    const wordDisplay = document.querySelector('.Text-container h1');
    const userInput = document.getElementById('Input');

    // Word lists
    const words = {
        easy: ['apple', 'ball', 'cat', 'dog', 'egg', 'fish', 'goat', 'hat', 'ice', 'jam', 'kite', 'lion', 'moon', 'nose', 'owl', 'pen', 'queen', 'rat', 'sun', 'tree'],
        medium: ['banana', 'carpet', 'dragon', 'elbow', 'flower', 'giraffe', 'hammer', 'island', 'jungle', 'kettle', 'ladder', 'monkey', 'needle', 'orange', 'pillow', 'rabbit', 'school', 'turtle', 'unicorn', 'violin'],
        hard: ['aardvark', 'beautiful', 'chandelier', 'dinosaur', 'elephant', 'festival', 'gorilla', 'helicopter', 'interstellar', 'jalapeno', 'labyrinth', 'mitochondria', 'nightingale', 'orchestra', 'pineapple', 'quintessential', 'rhinoceros', 'silhouette', 'thermometer', 'ultraviolet']
    };

    let currentDifficulty = 'easy';
    let currentWord = '';  // Store the correct unscrambled word
    buttons[0].classList.add('active');

    buttons.forEach(button => {
        button.addEventListener('click', buttonBorder);
    });

    function buttonBorder(e) {
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        e.target.classList.add('active');
        currentDifficulty = e.target.id;
        console.log('Current Difficulty:', currentDifficulty); // Log the current difficulty
    
        if (words[currentDifficulty]) {
            setNewWord();
        } else {
            console.error(`No word list found for difficulty: ${currentDifficulty}`);
        }
    }

    setNewWord();

    function scramble(word) {
        var NewWord = word.split('').sort(() => Math.random() - 0.5).join('');
        while (word === NewWord){
            NewWord = word.split('').sort(() => Math.random() - 0.5).join('');
        }
        return NewWord;
    }

    function setNewWord() {
        const wordList = words[currentDifficulty];
        currentWord = wordList[Math.floor(Math.random() * wordList.length)];  // Store the word
        const scrambledWord = scramble(currentWord);
        wordDisplay.textContent = scrambledWord;
    }

    const refresh = document.getElementById('refresh');
    refresh.addEventListener('click', handleRefresh);

    function handleRefresh() {
        setNewWord();
    }

    userInput.addEventListener('input', checkInput);

    function checkInput() {
        const userGuess = userInput.value;  // Get the current value of the input field
        if (userGuess === currentWord) {  // Compare it to the current word
            setTimeout(function() {
                alert('Correct!');
                setNewWord();
                userInput.value = ''; 
            }, 1000); // 1 second delay
        }
    }
});
