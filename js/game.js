import { game as gController } from "./memory.js";

//Afegim elements
var game = $('#game');

items.forEach(function(value, indx){
    game.append('<img id="c'+indx+'"title="card">');
    var c = $ ('#c'+indx);
    c.on('click', function() { gController(value) });
    c.attr("src", value);
})

game.append('<img id="c1" title="card" >');
game.append('<img id="c2" title="card" >');
game.append('<img id="c3" title="card" >');
game.append('<img id="c4" title="card" >');
game.append('<img id="c5" title="card" >');
game.append('<img id="c6" title="card" >');

//Obtenim valors
var c1 = $('#c1');
var c2 = $('#c2');
var c3 = $('#c3');
var c4 = $('#c4');
var c5 = $('#c5');
var c6 = $('#c6');


//Detectem canvis
c1.on('click', function () { gController("cb") });
c2.on('click', function () { gController("co") });
c3.on('click', function () { gController("sb") });
c4.on('click', function () { gController("so") });
c5.on('click', function () { gController("tb") });
c6.on('click', function () { gController("to") });


//Modifiquem valors
c1.attr("src","../resources/cb.png");
c2.attr("src","../resources/co.png");
c3.attr("src","../resources/sb.png");
c4.attr("src","../resources/so.png");
c5.attr("src","../resources/tb.png");
c6.attr("src","../resources/to.png");


gController.init(updateSRC).forEach(function(card, indx){
    game.append('<img id="c'+indx+'" class="card" title="card">');
    card.pointer = $('#c'+indx);
    card.pointer.on('click', () => gController.click(card));
    card.pointer.attr("src", card.current);
});

function updateSRC(){
    this.pointer.attr("src", this.current);
}