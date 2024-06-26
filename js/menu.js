$(document).ready(function() {
    console.log('Document is ready');

    $('#mode1').on('click', function() {
        window.location.assign("./index.html?mode=1");
    });

    $('#mode2').on('click', function() {
        window.location.assign("./index.html?mode=2");
    });

    $('#options').on('click', function() {
        window.location.assign("./html/options.html");
    });

    $('#scores').on('click', function() {
        window.location.assign("./html/ranking.html");
    });

    $('#exit').on('click', function() {
        console.warn("No se puede salir!");
    });

});