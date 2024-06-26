$(document).ready(function() {
    const scoresList = $('#scores-list');
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    if (scores.length === 0) {
        scoresList.append('<p>Encara no hi ha cap puntuació enregistrada.</p>');
    } else {
        const list = $('<ol></ol>');
        scores.forEach(score => {
            list.append('<li>' + score + '</li>');
        });
        scoresList.append(list);
    }

    $('#back').on('click', function() {
        window.location.replace("../index.html");
    });
});