export var gameMode1 = (function() {
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png', '../resources/sb.png', '../resources/so.png', '../resources/tb.png', '../resources/to.png'];
    const card = {
        current: back,
        clickable: true,
        matched: false, 
        goBack: function() {
            setTimeout(() => {
                if (!this.matched) {
                    this.current = back;
                    this.clickable = true;
                    this.callback();
                }
            }, 1000);
        },
        goFront: function() {
            this.current = this.front;
            this.clickable = false;
            this.callback();
        },
        immediateGoBack: function() {
            if (!this.matched) {
                this.current = back;
                this.clickable = true;
                this.callback();
            }
        }
    };

    let lastCard = null;
    let points = 100; 

    const difficultySettings = {
        easy: { pointDeduction: 10, showTime: 1500 },
        normal: { pointDeduction: 25, showTime: 1000 },
        hard: { pointDeduction: 50, showTime: 500 }
    };

    return {
        init: function(call, pairs, difficulty) {
            let items = resources.slice();
            items.sort(() => Math.random() - 0.5);
            items = items.slice(0, pairs);
            items = items.concat(items);
            items.sort(() => Math.random() - 0.5);
            this.pairs = pairs;
            this.difficulty = difficultySettings[difficulty];
            return items.map(item => Object.create(card, { front: { value: item }, callback: { value: call } }));
        },
        setPoints: function(initialPoints) {
            points = initialPoints;
        },
        click: function(card, onWin) {
            if (!card.clickable || card.matched) return; 
            card.goFront();
            if (lastCard) {
                if (card.front === lastCard.front) {
                    card.matched = true;
                    lastCard.matched = true;
                    this.pairs--;
                    if (this.pairs <= 0) {
                        alert("Has guanyat amb " + points + " punts!");
                        if (onWin) {
                            onWin();
                        } else {
                            window.location.replace("../");
                        }
                    }
                } else {
                    [card, lastCard].forEach(c => c.goBack());
                    points -= this.difficulty.pointDeduction;
                    if (points <= 0) {
                        alert("Has perdut!");
                        window.location.replace("../");
                    }
                }
                lastCard = null;
            } else {
                lastCard = card;
            }
        },
        showAllCards: function(cards, difficulty) {
            cards.forEach(card => card.goFront());
            setTimeout(() => {
                cards.forEach(card => card.immediateGoBack());
            }, difficultySettings[difficulty].showTime);
        }
    };
})();
