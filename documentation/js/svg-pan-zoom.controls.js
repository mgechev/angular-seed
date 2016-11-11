document.getElementById('demo-svg').addEventListener('load', function() {
    panZoom = svgPanZoom('#demo-svg', {
        zoomEnabled: true,
        minZoom: 1,
        maxZoom: 5
    });

    document.getElementById('zoom-in').addEventListener('click', function(ev) {
        ev.preventDefault()
        panZoom.zoomIn()
    });

    document.getElementById('zoom-out').addEventListener('click', function(ev) {
        ev.preventDefault()
        panZoom.zoomOut()
    });

    document.getElementById('reset').addEventListener('click', function(ev) {
        ev.preventDefault()
        panZoom.resetZoom();
        panZoom.resetPan();
    });
});
