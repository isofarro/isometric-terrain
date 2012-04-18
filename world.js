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
    start = { x: 392, y: 240 },
    tileSize = { x:48, y:24, h:16 };

    function drawMap(map) {
        var i, j, k, l,
            height, pos;
        for(i = 0, j = map.length - 1; i < j; i++) {
            for(k = 0, l = map[i].length - 1; k < l; k++) {
                height = {
                    top:    map[i][k],
                    right:  map[i][k+1],
                    bottom: map[i+1][k+1],
                    left:   map[i+1][k]
                };
                pos = {
                    x: k,
                    y: i
                };
                drawTile(pos, height);
            }
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