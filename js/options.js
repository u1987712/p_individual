$(document).ready(function() {
    const default_options = {
        pairs: 2,
        difficulty: 'normal',
        difficulty_mode2: 'normal'
    };

    let options = JSON.parse(localStorage.getItem('options') || JSON.stringify(default_options));

    const pairs = $('#pairs');
    const difficulty = $('#dif');
    const difficulty_mode2 = $('#dif_mode2');

    pairs.val(options.pairs);
    difficulty.val(options.difficulty);
    difficulty_mode2.val(options.difficulty_mode2);

    pairs.on('change', function() {
        const selectedPairs = parseInt(pairs.val());
        if (selectedPairs >= 2 && selectedPairs <= 6) {
            options.pairs = selectedPairs;
        } else {
            alert("El número de cartes ha de ser entre 2 i 6!");
            pairs.val(options.pairs);
        }
    });

    difficulty.on('change', function() {
        options.difficulty = difficulty.val();
    });

    difficulty_mode2.on('change', function() {
        options.difficulty_mode2 = difficulty_mode2.val();
    });

    $('#apply').on('click', function() {
        localStorage.setItem('options', JSON.stringify(options));
    });

    $('#default').on('click', function() {
        options = { ...default_options };
        pairs.val(options.pairs);
        difficulty.val(options.difficulty);
        difficulty_mode2.val(options.difficulty_mode2);
        localStorage.setItem('options', JSON.stringify(options));
    });
});