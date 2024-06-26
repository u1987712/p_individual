class game_scene extends Phaser.Scene {
    constructor() {
        super({ key: 'game_scene' });
    }

    init(data) {
        this.mode = data.mode;
    }

    preload() {
        this.load.image('back', '../resources/back.png');
        this.load.image('cb', '../resources/cb.png');
        this.load.image('co', '../resources/co.png');
        this.load.image('sb', '../resources/sb.png');
        this.load.image('so', '../resources/so.png');
        this.load.image('tb', '../resources/tb.png');
        this.load.image('to', '../resources/to.png');
    }

    create() {
        this.score = 0;
        this.points = 100;
        this.level = 1;
        this.lastCard = null;
        this.canClick = true;

        const default_options = {
            pairs: 2,
            difficulty: 'normal',
            difficulty_mode2: 'normal'
        };
        const options = JSON.parse(localStorage.getItem('options') || JSON.stringify(default_options));

        this.resources = ['cb', 'co', 'sb', 'so', 'tb', 'to'];
        this.difficultySettings = {
            easy: { pointDeduction: 10, showTime: 1500 },
            normal: { pointDeduction: 25, showTime: 1000 },
            hard: { pointDeduction: 50, showTime: 500 }
        };

        if (this.mode === 1) {
            this.pairs = options.pairs;
            this.difficulty = this.difficultySettings[options.difficulty];
        } else if (this.mode === 2) {
            this.pairs = 2;
            this.difficulty = this.difficultySettings[options.difficulty_mode2];
        }

        this.createCards();
        this.createScoreText();
    }

    createCards() {
        let items = Phaser.Utils.Array.Shuffle(this.resources.slice()).slice(0, this.pairs);
        items = items.concat(items);
        items = Phaser.Utils.Array.Shuffle(items);

        this.cards = items.map((item, index) => {
            const x = 100 + (index % 4) * 150;
            const y = 100 + Math.floor(index / 4) * 200;
            const card = this.add.image(x, y, 'back').setInteractive();
            card.front = item;
            card.matched = false;
            card.on('pointerdown', () => this.onCardClick(card));
            return card;
        });

        this.showAllCards();
    }

    createScoreText() {
        this.scoreText = this.add.text(16, 16, 'Puntuació: ', { fontSize: '32px', fill: '#fff' });
    }

    showAllCards() {
        this.cards.forEach(card => card.setTexture(card.front));
        this.time.delayedCall(this.difficulty.showTime, () => {
            this.cards.forEach(card => card.setTexture('back'));
        });
    }

    onCardClick(card) {
        if (!this.canClick || card.matched || card.texture.key === card.front) return;

        card.setTexture(card.front);

        if (this.lastCard) {
            if (this.lastCard.front === card.front) {
                card.matched = true;
                this.lastCard.matched = true;
                this.pairs--;
                this.lastCard = null;
                if (this.pairs === 0) {
                    this.score += 100;
                    this.scoreText.setText('Puntuació: ' + this.score);
                    if (this.mode === 2) {
                        this.level++;
                        this.time.delayedCall(1000, () => this.nextLevel());
                    } else {
                        this.time.delayedCall(1000, () => this.endGame());
                    }
                }
            } else {
                this.canClick = false;
                this.time.delayedCall(1000, () => {
                    card.setTexture('back');
                    this.lastCard.setTexture('back');
                    this.lastCard = null;
                    this.canClick = true;
                });
                this.points -= this.difficulty.pointDeduction;
                this.pointsText.setText('Puntos de vida: ' + this.points);
                if (this.points <= 0) {
                    this.endGame();
                }
            }
        } else {
            this.lastCard = card;
        }
    }

    nextLevel() {
        this.pairs = Math.min(6, 2 + Math.floor(this.level / 2));
        this.points = 100;
        this.difficulty = this.difficultySettings['normal'];
        this.cards.forEach(card => card.destroy());
        this.createCards();
    }

    endGame() {
        if (this.mode === 2) {
            let scores = JSON.parse(localStorage.getItem('scores')) || [];
            scores.push(this.score);
            scores.sort((a, b) => b - a);
            localStorage.setItem('scores', JSON.stringify(scores));
            this.scene.start('ranking_scene');
        } else {
            this.scene.start('menu_scene');
        }
    }
}

window.game_scene = game_scene;