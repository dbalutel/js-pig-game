class Player {

    constructor(number) {
        this.number = number;
        this.name = document.getElementById('name-' + this.number);
        this.currentScore = document.getElementById('current-' + this.number);
        this.globalScore = document.getElementById('score-' + this.number);
        this.classList = document.querySelector('.player-' + this.number + '-panel').classList;
    }

    isActive() {
        return this.classList.contains('active');
    }
}

var player0 = new Player(0);
var player1 = new Player(1);

var dice = document.querySelector('.dice');

var roll = document.querySelector('.btn-roll');
var hold = document.querySelector('.btn-hold');
var newGame = document.querySelector('.btn-new');

var game = {
    players: new Array(player0, player1),

    resetGame: function() {
        dice.style.display = 'none';
        this.players.forEach(p => {
            p.currentScore.innerHTML = '0' ;
            p.globalScore.innerHTML = '0';
            p.classList.remove('active')
            roll.style.display = 'none';
            hold.style.display = 'none';
        })
    },
    newGame: function() {
        this.chooseActivePlayer();    
        roll.style.display = 'block';
        hold.style.display = 'block';
        this.players.forEach(p => {
            p.classList.remove('winner');
            p.name.innerHTML = p.name.innerHTML.replace(' WINS!', '');
        })
    },
    chooseActivePlayer: function() {
        var firstTurnPlayer = Math.floor(Math.random() * 2); 
        this.players[firstTurnPlayer].classList.add('active');
    },
    getActivePlayer: function() {
        return this.players.filter(p => p.isActive())[0];
    },
    switchPlayer: function() {
        this.players.forEach(p => {
            p.classList.toggle('active')
        })
    },
    rollDice: function() {
        var rolled = Math.floor(Math.random() * 6) + 1; 
        dice.src = 'dice-' + rolled + '.png'
        dice.style.display = 'block';
    
        var activePlayer = this.getActivePlayer();

        if (rolled === 1) {
            activePlayer.currentScore.innerHTML = 0;
        } else {
            activePlayer.currentScore.innerHTML = Number(activePlayer.currentScore.innerHTML) + rolled;
        }

        if (Number(activePlayer.currentScore.innerHTML) + Number(activePlayer.globalScore.innerHTML) >= 10) {
            activePlayer.classList.add('winner');
            activePlayer.name.innerHTML += ' WINS!';
            this.stopGame();
        } else {
            this.switchPlayer();
        }
    },
    holdScore: function() {
        var activePlayer = this.getActivePlayer();
        activePlayer.globalScore.innerHTML = Number(activePlayer.globalScore.innerHTML) + Number(activePlayer.currentScore.innerHTML);
        activePlayer.currentScore.innerHTML = '0';
        this.switchPlayer();
    },
    stopGame: function() {
        roll.style.display = 'none';
        hold.style.display = 'none';
    }
}

newGame.addEventListener('click', function() {
    game.resetGame();
    game.newGame();
})

roll.addEventListener('click', function() {
    game.rollDice();
})

hold.addEventListener('click', function() {
    game.holdScore();
})

game.resetGame();



