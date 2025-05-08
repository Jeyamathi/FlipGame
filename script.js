// This function initializes the game when the page is loaded
function resetGame() {
    const board = document.getElementById('game-board');
    board.innerHTML = ''; // clear the board

    // Create level buttons for Easy, Medium, Hard
    const levels = ['easy', 'medium', 'hard'];
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'level-buttons'; // Wrapper for buttons

    levels.forEach(level => {
        const button = document.createElement('button');
        button.className = 'level_button';
        button.setAttribute('role', 'button');
        button.id = level;
        button.textContent = level.charAt(0).toUpperCase() + level.slice(1); // Capitalize
        buttonContainer.appendChild(button);
    });

    board.appendChild(buttonContainer); 
    // Add event listeners to level buttons
    document.getElementById('easy').addEventListener('click', function() {
        startGame(2, 4);
    });
    document.getElementById('medium').addEventListener('click', function() {startGame(3, 4);});
    document.getElementById('hard').addEventListener('click', function() {startGame(4, 4);});

}

function startGame(rows, cols) {
    const allFishes = ['bluefish', 'whitefish', 'redfish', 'yellowfish', 'clownfish', 'goldfish', 'fighterfish', 'pinkfish'];
    const allFishesCount = rows * cols / 2;
    if (allFishesCount > allFishes.length) {
        allFishesCount = allFishes.length; 
    }
    const selectedFishes = allFishes.slice(0, allFishesCount); 
    const cardFishes = shuffleArray([...selectedFishes, ...selectedFishes]); 
    
    const board = document.getElementById('game-board');
    board.innerHTML = ''; // Clear board

    let cardIndex = 0;

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'row';

        for (let j = 0; j < cols; j++) {
            const fishName = cardFishes[cardIndex++];
            const cell = document.createElement('div');
            cell.className = 'card';
            cell.textContent = 'Brain Flip';

            cell.addEventListener('click', function () {
                console.log('Clicked on cell with fish:', cell.classList, fishName);
                if (!cell.classList.contains('flip') && !cell.classList.contains('done')) {
                    cell.classList.add('flip');
                    const img = document.createElement('img');
                    img.src = './images/' + fishName + '.png';
                    img.alt = fishName;
                    img.classList.add('symbol');
                    cell.innerHTML = '';
                    cell.appendChild(img);

                    const won = checkWin(allFishesCount*2);

                    if (!won) {
                        setTimeout(() => {
                            const flippedCells = document.querySelectorAll('.flip');
                            flippedCells.forEach(c => {
                                c.classList.remove('flip');
                                c.innerHTML = '';
                                c.textContent = 'Brain Flip';
                            });
                        }, 1000);
                    }
                }
            });

            row.appendChild(cell);
        }

        board.appendChild(row);
    }
}


// Check for a win condition
function checkWin(allFishesCount) {
    const flippedCards = document.querySelectorAll('.flip');

    if (flippedCards.length === 2) {
        const firstImg = flippedCards[0].querySelector('img').src;
        const secondImg = flippedCards[1].querySelector('img').src;

        if (firstImg === secondImg) {
            flippedCards.forEach(card => {
                card.classList.add('done');
                card.classList.remove('flip');
            });
            // Check if all cards are matched
            const doneCards = document.querySelectorAll('.done');
            if (doneCards.length === allFishesCount) { // Total 8 cards for easy level
                setTimeout(() => {
                    document.getElementById('winModal').classList.remove('hidden');
                    setTimeout(() => {
                        document.getElementById('winModal').classList.add('hidden');
                    }, 3000); // Hide the modal after 3 seconds
                    resetGame(); // Restart the game after winning
                }, 300); // Delay the alert so the match is visible
            }
            return true;
        }
    }
    return false;
}

// Run resetGame when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', function () {
    resetGame();
});

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
    return arr;
}
