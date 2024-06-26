class options_scene extends Phaser.Scene {
    constructor() {
        super({ key: 'options_scene' });
    }

    preload() {
        // Preload any assets if necessary
    }

    create() {
        const default_options = {
            pairs: 2,
            difficulty: 'normal'
        };

        let options = JSON.parse(localStorage.getItem('options') || JSON.stringify(default_options));

        this.add.text(400, 50, 'Opcions', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.add.text(250, 150, 'Número de cartes', { fontSize: '24px', fill: '#fff' });
        const pairsInput = this.add.dom(550, 150, 'input', {
            type: 'number',
            value: options.pairs,
            min: 2,
            max: 6,
            style: 'font-size: 24px; width: 60px; text-align: center;'
        });

        this.add.text(250, 200, 'Dificultat', { fontSize: '24px', fill: '#fff' });
        const difficultySelect = this.add.dom(550, 200, 'select', {
            style: 'font-size: 24px;'
        });
        difficultySelect.setInnerHTML(`
            <option value="easy" ${options.difficulty === 'easy' ? 'selected' : ''}>Baixa</option>
            <option value="normal" ${options.difficulty === 'normal' ? 'selected' : ''}>Normal</option>
            <option value="hard" ${options.difficulty === 'hard' ? 'selected' : ''}>Alta</option>
        `);

        const applyButton = this.add.text(400, 300, 'Aplicar', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => {
                const pairs = parseInt(pairsInput.node.value);
                if (pairs >= 2 && pairs <= 6) {
                    options.pairs = pairs;
                } else {
                    alert("El número de cartes ha de ser entre 2 i 6!");
                    pairsInput.node.value = options.pairs;
                }
                options.difficulty = difficultySelect.node.value;
                localStorage.setItem('options', JSON.stringify(options));
                alert('Opcions aplicades!');
            });

        const defaultButton = this.add.text(400, 350, 'Per defecte', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => {
                options = { ...default_options };
                pairsInput.node.value = options.pairs;
                difficultySelect.node.value = options.difficulty;
                alert('Opcions restablertes per defecte!');
            });

        const backButton = this.add.text(400, 400, 'Tornar al menú', { fontSize: '24px', fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('menu_scene');
            });

        [applyButton, defaultButton, backButton].forEach(button => {
            button.setOrigin(0.5);
        });
    }
}

window.options_scene = options_scene;