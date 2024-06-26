import { gameMode2 as gController } from "./memory_mode2.js";

$(document).ready(function() {
    const game = $('#game');
    const scoreElement = $('#score');

    const default_options = {
        pairs: 2,
        difficulty_mode2: 'normal'
    };
    const options = JSON.parse(localStorage.getItem('options') || JSON.stringify(default_options));

    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    if (mode === '2') {
        startGameMode2(options);
    }

    function startGameMode2(options) {
        let level = 1;
        let score = 0;
        const initialDifficulty = options.difficulty_mode2;

        function nextLevel() {
            const difficulty = increaseDifficulty(initialDifficulty, level);
            const pairs = calculatePairs(level);
            const cards = gController.init(updateSRC, pairs, initialDifficulty);
            gController.setPoints(100);l
            game.empty();
            initializeGame(cards, () => {
                score += 100;
                scoreElement.text("Puntuació: " + score);
                level++;
                alert("Has guanyat amb " + gController.getPoints() + " punts de vida restants!");
                nextLevel();
            }, () => {
                alert("Has perdut amb " + gController.getPoints() + " punts de vida restants.");
                saveScore(score);
                window.location.replace("../html/scores.html");
            });
        }

        nextLevel();

        function calculatePairs(level) {
            return Math.min(6, 2 + Math.floor(level / 2));
        }

        function increaseDifficulty(baseDifficulty, level) {
            const difficulties = {
                easy: { pairs: 2, pointDeduction: 10, showTime: 1500 },
                normal: { pointDeduction: 25, showTime: 1000 },
                hard: { pointDeduction: 50, showTime: 500 }
            };
            const difficulty = { ...difficulties[baseDifficulty] };
            difficulty.pairs = Math.min(6, difficulty.pairs + Math.floor(level / 2));
            difficulty.pointDeduction += level * 5;
            difficulty.showTime = Math.max(300, difficulty.showTime - level * 100);
            return difficulty;
        }

        function initializeGame(cards, onWin, onLose) {
            cards.forEach(function(card, indx) {
                game.append('<img id="c' + indx + '" class="card" title="card">');
                card.pointer = $('#c' + indx);
                card.pointer.on('click', () => gController.click(card, onWin, onLose));
                card.pointer.attr("src", card.current);
            });

            gController.showAllCards(cards, options.difficulty_mode2);
        }

        function updateSRC() {
            this.pointer.attr("src", this.current);
        }
        
        function saveScore(score) {
            let scores = JSON.parse(localStorage.getItem('scores')) || [];
            scores.push(score);
            scores.sort((a, b) => b - a);
            localStorage.setItem('scores', JSON.stringify(scores));
        }
    }
});
