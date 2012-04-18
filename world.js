(function(){
    var nodes = [
        [ 5, 5, 4, 2, 0, 2, 4, 5 ],
        [ 5, 5, 2, 2, 0, 1, 4, 4 ],
        [ 2, 2, 2, 2, 0, 1, 1, 1 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 1, 1, 1, 1, 0, 1, 1, 0 ],
        [ 1, 0, 0, 1, 0, 2, 2, 1 ],
        [ 1, 1, 0, 1, 0, 2, 2, 1 ],
        [ 1, 1, 0, 1, 0, 2, 2, 1 ]
    ],
    viewport,
    viewContext,
    start = { x: 392, y: 120 },
    tileSize = { x:48, y:24, h:16 };

    function drawMap(map) {
        var x, y,
            width = map[0].length,
            current_node = map.length * width;
        while (current_node--) {
            x = current_node % width;
            y = ~~(current_node / width);
            drawTile({
                x: x,
                y: y
            }, {
                top:    map[y-1][x-1],
                right:  map[y-1][x],
                bottom: map[y][x],
                left:   map[y][x-1]
            });
        }
    }

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
        viewContext.stroke();
        viewContext.closePath();
    }

    function init() {
        var tx = tileSize.x,
            ty = tileSize.y;
        viewport    = document.getElementById('viewport');
        viewContext = viewport.getContext('2d');

        viewContext.strokeStyle = '#aaa';
        viewContext.lineWidth   = 1;

        drawMap(nodes);
    }

    document.body.onload = init;
}());