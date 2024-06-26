$(document).ready(function() {
    console.log('Document is ready');

    $('#play').click(function() {
        console.log('Play button clicked');
        window.location.assign("./html/game.html");
    });

    $('#options').click(function() {
        console.log('Options button clicked');
        window.location.assign("./html/options.html");
    });

    $('#saves').click(function() {
        console.log('Saves button clicked');
        console.error("Opció no implementada");
    });

    $('#exit').click(function() {
        console.log('Exit button clicked');
        console.warn("No es pot sortir!");
    });
});