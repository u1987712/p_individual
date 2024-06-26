class menu_scene extends Phaser.Scene {
    constructor() {
        super({ key: 'menu_scene' });
    }

    preload() {
    }

    create() {
        this.add.text(400, 100, 'Menú', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        const mode1Button = this.add.text(400, 200, 'Jugar - Mode 1', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('game_scene', { mode: 1 }));

        const mode2Button = this.add.text(400, 250, 'Jugar - Mode 2', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('game_scene', { mode: 2 }));

        const optionsButton = this.add.text(400, 300, 'Opcions', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => window.location.href = 'options.html');

        const rankingButton = this.add.text(400, 350, 'Ranking', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('ranking_scene'));

        [mode1Button, mode2Button, optionsButton, rankingButton].forEach(button => {
            button.setOrigin(0.5);
        });
    }
}

window.menu_scene = menu_scene;