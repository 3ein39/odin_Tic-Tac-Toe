// player module

var player = (function() {
    var player = {};

    player.name = '';
    player.symbol = '';

    player.setName = function(name) {
        this.name = name;
    };

    player.setSymbol = function(symbol) {
        this.symbol = symbol;
    };

    player.getName = function() {
        return this.name;
    };

    player.getSymbol = function() {
        return this.symbol;
    };

    player.getInput = function() {
        let input = prompt('Enter your name: ');
        this.setName(input);
        input = prompt('Enter your symbol: ');
        this.setSymbol(input);
    }

    return player;
})();


