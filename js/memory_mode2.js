export var gameMode2 = (function() {
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png', '../resources/sb.png','../resources/so.png', '../resources/tb.png', '../resources/to.png'];
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
    let canClick = true;

    const difficultySettings = {
        easy: { pointDeduction: 10, showTime: 1500 },
        normal: { pointDeduction: 25, showTime: 1000 },
        hard: { pointDeduction: 50, showTime: 500 }
    };

    return {
        init: function(call, pairs, difficultyLevel) {
            let items = resources.slice();
            items.sort(() => Math.random() - 0.5);
            items = items.slice(0, pairs);
            items = items.concat(items);
            items.sort(() => Math.random() - 0.5);
            this.pairs = pairs;
            this.difficulty = difficultySettings[difficultyLevel];
            points = 100;
            return items.map(item => Object.create(card, { front: { value: item }, callback: { value: call } }));
        },
        setPoints: function(initialPoints) {
            points = initialPoints;
        },
        click: function(card, onWin, onLose) {
            if (!card.clickable || card.matched || !canClick) return;
            card.goFront();
            if (lastCard) {
                canClick = false;
                if (card.front === lastCard.front) {
                    card.matched = true;
                    lastCard.matched = true;
                    this.pairs--;
                    if (this.pairs <= 0) {
                        console.log("Has guanyat amb " + points + " punts!");
                        onWin();
                    }
                    lastCard = null;
                    canClick = true;
                } else {
                    setTimeout(() => {
                        card.goBack();
                        lastCard.goBack();
                        lastCard = null;
                        canClick = true;
                    }, 1000);
                    if (!this.difficulty) {
                        console.error("Error: this.difficulty not defined");
                        return;
                    }
                    points -= this.difficulty.pointDeduction;
                    if (points <= 0) {
                        onLose();
                    }
                }
            } else {
                lastCard = card;
            }
        },
        showAllCards: function(cards, difficultyLevel) {
            cards.forEach(card => card.goFront());
            setTimeout(() => {
                cards.forEach(card => card.immediateGoBack());
            }, difficultySettings[difficultyLevel].showTime);
        },
        getPoints: function() {
            return points;
        }
    };
})();
