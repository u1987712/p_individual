import { game as gController } from "./memory.js";

var cb = $('#cb');
var co = $('#co');
var sb = $('#sb');
var so = $('#so');
var tb = $('#tb');
var to = $('#to');

cb.on('click', function () { gController("cb") });
co.on('click', function () { gController("co") });
sb.on('click', function () { gController("sb") });
so.on('click', function () { gController("so") });
tb.on('click', function () { gController("tb") });
to.on('click', function () { gController("to") });

cb.attr("src","../resources/cb.png");
co.attr("src","../resources/co.png");
sb.attr("src","../resources/sb.png");
so.attr("src","../resources/so.png");
tb.attr("src","../resources/tb.png");
to.attr("src","../resources/to.png");

var game = $('#game');

gController.init(updateSRC).forEach(function(card, indx){
    game.append('<img id="c'+indx+'" class="card" title="card">');
    card.pointer = $('#c'+indx);
    card.pointer.on('click', () => gController.click(card));
    card.pointer.attr("src", card.current);
});

function updateSRC(){
    this.pointer.attr("src", this.current);
}