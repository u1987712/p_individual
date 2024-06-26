$(document).ready(function() {
    var options = function() {
        const default_options = {
            pairs: 2,
            difficulty: 'normal'
        };

        var pairs = $('#pairs');
        var difficulty = $('#dif');

        var options = JSON.parse(localStorage.options || JSON.stringify(default_options));
        pairs.val(options.pairs);
        difficulty.val(options.difficulty);
        pairs.on('change', () => options.pairs = pairs.val());
        difficulty.on('change', () => options.difficulty = difficulty.val());

        return {
            applyChanges: function() {
                localStorage.options = JSON.stringify(options);
            },
            defaultValues: function() {
                options.pairs = default_options.pairs;
                options.difficulty = default_options.difficulty;
                pairs.val(options.pairs);
                difficulty.val(options.difficulty);
            }
        }
    }();

    $('#default').click(function() {
        options.defaultValues();
    });

    $('#apply').click(function() {
        options.applyChanges();
        window.location.assign("../");
    });
});