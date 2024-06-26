import { gameMode1 as gController } from "./memory_mode1.js";

$(document).ready(function() {
    const game = $('#game');

    const default_options = {
        pairs: 2,
        difficulty: 'normal',
    };
    const options = JSON.parse(localStorage.getItem('options') || JSON.stringify(default_options));

    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    if (mode === '1') {
        startGameMode1(options);
    }

    function startGameMode1(options) {
        const cards = gController.init(updateSRC, options.pairs, options.difficulty);
        gController.setPoints(100);
        initializeGame(cards);
    }

    function initializeGame(cards, onWin) {
        cards.forEach(function(card, indx) {
            game.append('<img id="c' + indx + '" class="card" title="card">');
            card.pointer = $('#c' + indx);
            card.pointer.on('click', () => gController.click(card, onWin));
            card.pointer.attr("src", card.current);
        });

        gController.showAllCards(cards, options.difficulty); 
    }

    function updateSRC() {
        this.pointer.attr("src", this.current);
    }
});