$(document).ready(function() {
    console.log('Document is ready');

    $('#play').click(function() {
        console.log('Play button clicked');
        sessionStorage.removeItem("save");
        window.location.assign("./html/game.html");
    });

    $('#ranking').click(function() {
        console.log('Ranking button clicked');
        console.warn("Opció no implementada");
    });

    $('#options').click(function() {
        console.log('Options button clicked');
        window.location.assign("./html/options.html");
    });

    $('#saves').click(function() {
        fetch("./php/load.php", {
            method: "POST",
            body: "",
            headers: { "content-type": "application/json; charset=UTF-8" }
        })
        .then(response => {
            if (response.ok) return response.text();
            else throw new Error("PHP connection fail");
        })
        .then(partida => {
            sessionStorage.save = partida;
        })
        .catch(err => {
            sessionStorage.save = localStorage.save; // fallback to localStorage if fetch fails
        })
        .finally(() => {
            window.location.assign("./html/game.html");
        });
    });

    
});