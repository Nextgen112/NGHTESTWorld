<script>
(function() {
    console.log('[GAME] Initializing...');
    
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #2d3436;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        font-family: Arial, sans-serif;
        color: white;
        min-width: 300px;
    `;
    
    const title = document.createElement('h2');
    title.textContent = 'Guess the Number!';
    title.style.color = '#00d2ff';
    
    const description = document.createElement('p');
    description.textContent = 'I\'m thinking of a number between 0 and 100';
    description.style.margin = '10px 0';
    
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Enter your guess...';
    input.min = '0';
    input.max = '100';
    input.style.cssText = `
        padding: 10px;
        font-size: 18px;
        border: 2px solid #00d2ff;
        border-radius: 5px;
        background: #1a1a2e;
        color: white;
        width: 150px;
        margin: 10px 0;
    `;
    
    const guessBtn = document.createElement('button');
    guessBtn.textContent = 'Guess!';
    guessBtn.style.cssText = `
        background: #00d2ff;
        border: none;
        padding: 10px 30px;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        margin: 10px;
        color: #1a1a2e;
    `;
    
    const result = document.createElement('p');
    result.style.margin = '10px 0';
    result.style.fontSize = '18px';
    
    const attemptsDisplay = document.createElement('p');
    attemptsDisplay.style.fontSize = '14px';
    attemptsDisplay.style.color = '#8899aa';
    
    let secretNumber = 0;
    let attempts = 0;
    let gameOver = false;
    
    function checkGuess() {
        if (gameOver) {
            result.textContent = 'Game already over! Click "New Game" to play again.';
            result.style.color = '#ffd93d';
            return;
        }
        
        const guess = parseInt(input.value);
        if (isNaN(guess) || guess < 0 || guess > 100) {
            result.textContent = 'Please enter a valid number between 0 and 100!';
            result.style.color = '#ff6b6b';
            return;
        }
        
        attempts++;
        attemptsDisplay.textContent = 'Attempts: ' + attempts;
        
        if (guess === secretNumber) {
            result.textContent = 'Correct! You got it in ' + attempts + ' tries!';
            result.style.color = '#00ff88';
            gameOver = true;
            guessBtn.disabled = true;
            guessBtn.style.opacity = '0.5';
            
            const newGameBtn = document.createElement('button');
            newGameBtn.textContent = 'New Game';
            newGameBtn.style.cssText = `
                background: #ffd93d;
                border: none;
                padding: 10px 30px;
                border-radius: 5px;
                font-weight: bold;
                cursor: pointer;
                margin: 10px;
                color: #1a1a2e;
            `;
            newGameBtn.onclick = function() {
                secretNumber = 0;
                attempts = 0;
                gameOver = false;
                guessBtn.disabled = false;
                guessBtn.style.opacity = '1';
                result.textContent = 'New game started! Guess a number.';
                result.style.color = '#00d2ff';
                attemptsDisplay.textContent = 'Attempts: 0';
                input.value = '';
                newGameBtn.remove();
            };
            container.appendChild(newGameBtn);
        } else if (guess < secretNumber) {
            result.textContent = 'Too low! Try a higher number.';
            result.style.color = '#ffd93d';
        } else {
            result.textContent = 'Too high! Try a lower number.';
            result.style.color = '#ffd93d';
        }
    }
    
    guessBtn.onclick = checkGuess;
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkGuess();
    });
    
    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(input);
    container.appendChild(guessBtn);
    container.appendChild(result);
    container.appendChild(attemptsDisplay);
    
    document.body.appendChild(container);
    
    console.log('Number guessing game loaded!');
})();
</script>
