(function(global) {
    var viewport, viewContext,
        start = { x: 392, y: 120 },
        tileSize = { x:36, y:18, h:12 },
        fillColour = ['#01A611', '#018E0E', '#018E0E', '#007B0C', '#00680A', '#005C09'];

    function initGame() {
        //console.log("Initialising game");
        initViewport();
        initMapRender();
    };

    function initViewport() {
        viewport = document.getElementById('viewport');
        viewContext = viewport.getContext('2d');

        viewContext.strokeStyle = '#365722';
        viewContext.fillStyle   = '#007b0c';
        viewContext.lineWidth   = 1;
    };

    function initMapRender() {
        var chunk = global.GAME.map.getChunk(1, 1);
        renderChunk(chunk);
    };

    function renderChunk(chunk) {
        var x, y,
            width = 8,
            current_node = chunk.length;

        while (--current_node) {
            x = current_node % width;
            if (x === 0) continue;
            y = ~~(current_node / width);
            if (y === 0) continue;
            drawTile({
                x: x,
                y: y
            }, {
                top:    parseInt(chunk[current_node - width - 1]),
                right:  parseInt(chunk[current_node - width]),
                bottom: parseInt(chunk[current_node]),
                left:   parseInt(chunk[current_node - 1])
            });
        }
    };

    function drawTile(pos, height) {
        var left = start.x + (tileSize.x * pos.x) - (tileSize.x * pos.y),
            top  = start.y + (tileSize.y * pos.x) + (tileSize.y * pos.y);
        //console.log('[' + pos.x + ':' + pos.y + '] ' + left + ',' + top +
        //  ' [' + height.top + ':' + height.right + ':' + height.bottom + ':' + height.left + ']');
        viewContext.beginPath();
        viewContext.moveTo(left, top - (height.top * tileSize.h) );
        viewContext.lineTo(left + tileSize.x, top + tileSize.y - (height.right * tileSize.h) );
        viewContext.lineTo(left, top + tileSize.y + tileSize.y - (height.bottom * tileSize.h) );
        viewContext.lineTo(left - tileSize.x, top + tileSize.y - (height.left * tileSize.h) );
        viewContext.lineTo(left, top - (height.top * tileSize.h) );
        viewContext.fillStyle = fillColour[height.bottom];
        viewContext.fill();
        viewContext.stroke();
        viewContext.closePath();
    }

    global.GAME = {
        pos: {},
        init: initGame,
        map: undefined
    };

    document.body.onload = global.GAME.init;
}(window));