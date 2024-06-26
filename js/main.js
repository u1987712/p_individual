const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [menu_scene, game_scene, ranking_scene, options_scene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);