class ranking_scene extends Phaser.Scene {
    constructor() {
        super({ key: 'ranking_scene' });
    }

    create() {
        this.add.text(400, 50, 'Ranking', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        const list = this.add.text(400, 100, '', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5, 0);

        if (scores.length === 0) {
            list.setText('No hi ha puntuacions enregistrades.');
        } else {
            list.setText(scores.map(score => score.toString()).join('\n'));
        }

        const backButton = this.add.text(400, 500, 'Tornar al menú', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('menu_scene'))
            .setOrigin(0.5);
    }
}

window.ranking_scene = ranking_scene;