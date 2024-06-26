$(document).ready(function() {
    var options = function() {
        const default_options = {
            pairs: 2,
            difficulty: 'normal' // default difficulty is normal
        };

        var pairs = $('#pairs');
        var difficulty = $('#dif');

        var options = JSON.parse(localStorage.options || JSON.stringify(default_options));
        
        // Ensure pairs are within the allowed range (2 to 6)
        if (options.pairs < 2 || options.pairs > 6) {
            options.pairs = default_options.pairs;
        }

        pairs.val(options.pairs);
        difficulty.val(options.difficulty);

        pairs.on('change', function() {
            var selectedPairs = parseInt(pairs.val());
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

        return {
            applyChanges: function() {
                localStorage.options = JSON.stringify(options);
            },
            defaultValues: function() {
                options.pairs = default_options.pairs;
                options.difficulty = default_options.difficulty;
                pairs.val(options.pairs);
                difficulty.val(options.difficulty);
            },
            getOptions: function() {
                return options;
            }
        };
    }();

    $('#default').click(function() {
        options.defaultValues();
    });

    $('#apply').click(function() {
        options.applyChanges();
        alert("Canvis aplicats!");
        window.location.assign("../");
    });

    // Initialize options display
    var currentOptions = options.getOptions();
    pairs.val(currentOptions.pairs);
    difficulty.val(currentOptions.difficulty);
});