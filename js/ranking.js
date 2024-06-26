$(document).ready(function() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    const scoresList = $('#scores-list');

    scores.forEach(score => {
        scoresList.append('<div>' + score + '</div>');
    });

    $('#back').on('click', function() {
        window.location.href = '../index.html';
    });
});
