import { Injectable } from '@angular/core';
import { GoogleMapsAPIWrapper }  from '@agm/core';
import { } from '@types/googlemaps';

@Injectable()
export class RouteBoxerService {
    private R: number = 6371;
    private grid_: any;
    private latGrid_: any;
    private lngGrid_: any;
    private boxesX_: any;
    private boxesY_: any;

    constructor() { }

    /**
     * Generates boxes for a given route and distance
     *
     * @param {google.maps.LatLng[] | google.maps.Polyline} path The path along
     *           which to create boxes. The path object can be either an Array of
     *           google.maps.LatLng objects or a Maps API v2 or Maps API v3
     *           google.maps.Polyline object.
     * @param {Number} range The distance in kms around the route that the generated
     *           boxes must cover.
     * @return {google.maps.LatLngBounds[]} An array of boxes that covers the whole
     *           path.
     */
    box(path: (google.maps.LatLng[] | google.maps.Polyline), range: number): google.maps.LatLngBounds[] {
        // Two dimensional array representing the cells in the grid overlaid on the path
        this.grid_ = null;

        // Array that holds the latitude coordinate of each vertical grid line
        this.latGrid_ = [];

        // Array that holds the longitude coordinate of each horizontal grid line
        this.lngGrid_ = [];

        // Array of bounds that cover the whole route formed by merging cells that
        //  the route intersects first horizontally, and then vertically
        this.boxesX_ = [];

        // Array of bounds that cover the whole route formed by merging cells that
        //  the route intersects first vertically, and then horizontally
        this.boxesY_ = [];

        // The array of LatLngs representing the vertices of the path
        let vertices = null;

        // If necessary convert the path into an array of LatLng objects
        if (path instanceof Array) {
            // already an arry of LatLngs (eg. v3 overview_path)
            vertices = path;
        } else if (path instanceof google.maps.Polyline) {
            if (path.getPath) {
                // v3 Maps API Polyline object
                vertices = new Array(path.getPath().getLength());
                for (let i = 0; i < vertices.length; i++) {
                    vertices[i] = path.getPath().getAt(i);
                }
            } else {
                // v2 Maps API Polyline object
                // vertices = new Array(path.getVertexCount());
                // for (let j = 0; j < vertices.length; j++) {
                //     vertices[j] = path.getVertex(j);
                // }
            }
        }

        // Build the grid that is overlaid on the route
        this.buildGrid(vertices, range);

        // Identify the grid cells that the route intersects
        this.findIntersectingCells(vertices);

        // Merge adjacent intersected grid cells (and their neighbours) into two sets
        //  of bounds, both of which cover them completely
        this.mergeIntersectingCells();

        // Return the set of merged bounds that has the fewest elements
        return (this.boxesX_.length <= this.boxesY_.length ?
                this.boxesX_ :
                this.boxesY_);
    }

    /**
     * Generates boxes for a given route and distance
     *
     * @param {google.maps.LatLng[]} vertices The vertices of the path over which to lay the grid
     * @param {Number} range The spacing of the grid cells.
     */
    private buildGrid(vertices: google.maps.LatLng[], range: number): void {

        // Create a LatLngBounds object that contains the whole path
        let routeBounds = new google.maps.LatLngBounds();
        for (let i = 0; i < vertices.length; i++) {
            routeBounds.extend(vertices[i]);
        }

        // Find the center of the bounding box of the path
        let routeBoundsCenter = routeBounds.getCenter();

        // Starting from the center define grid lines outwards vertically until they
        //  extend beyond the edge of the bounding box by more than one cell
        this.latGrid_.push(routeBoundsCenter.lat());

        // Add lines from the center out to the north
        this.latGrid_.push(this.rhumbDestinationPoint(routeBoundsCenter, 0, range).lat());
        for (let i = 2; this.latGrid_[i - 2] < routeBounds.getNorthEast().lat(); i++) {
            this.latGrid_.push(this.rhumbDestinationPoint(routeBoundsCenter, 0, range * i).lat());
        }

        // Add lines from the center out to the south
        for (let i = 1; this.latGrid_[1] > routeBounds.getSouthWest().lat(); i++) {
            this.latGrid_.unshift(this.rhumbDestinationPoint(routeBoundsCenter, 180, range * i).lat());
        }

        // Starting from the center define grid lines outwards horizontally until they
        //  extend beyond the edge of the bounding box by more than one cell
        this.lngGrid_.push(routeBoundsCenter.lng());

        // Add lines from the center out to the east
        this.lngGrid_.push(this.rhumbDestinationPoint(routeBoundsCenter, 90, range).lng());
        for (let i = 2; this.lngGrid_[i - 2] < routeBounds.getNorthEast().lng(); i++) {
            this.lngGrid_.push(this.rhumbDestinationPoint(routeBoundsCenter, 90, range * i).lng());
        }

        // Add lines from the center out to the west
        for (let i = 1; this.lngGrid_[1] > routeBounds.getSouthWest().lng(); i++) {
            this.lngGrid_.unshift(this.rhumbDestinationPoint(routeBoundsCenter, 270, range * i).lng());
        }

        // Create a two dimensional array representing this grid
        this.grid_ = new Array(this.lngGrid_.length);
        for (let i = 0; i < this.grid_.length; i++) {
            this.grid_[i] = new Array(this.latGrid_.length);
        }
    }

    /**
     * Find all of the cells in the overlaid grid that the path intersects
     *
     * @param {google.maps.LatLng[]} vertices The vertices of the path
     */
    private findIntersectingCells(vertices: google.maps.LatLng[]): void {
        // Find the cell where the path begins
        let hintXY = this.getCellCoords(vertices[0]);

        // Mark that cell and it's neighbours for inclusion in the boxes
        this.markCell(hintXY);

        // Work through each vertex on the path identifying which grid cell it is in
        for (let i = 1; i < vertices.length; i++) {
            // Use the known cell of the previous vertex to help find the cell of this vertex
            let gridXY = this.getGridCoordsFromHint(vertices[i], vertices[i - 1], hintXY);

            if (gridXY[0] === hintXY[0] && gridXY[1] === hintXY[1]) {
            // This vertex is in the same cell as the previous vertex
            // The cell will already have been marked for inclusion in the boxes
            continue;

            } else if ((Math.abs(hintXY[0] - gridXY[0]) === 1 && hintXY[1] === gridXY[1]) ||
                (hintXY[0] === gridXY[0] && Math.abs(hintXY[1] - gridXY[1]) === 1)) {
            // This vertex is in a cell that shares an edge with the previous cell
            // Mark this cell and it's neighbours for inclusion in the boxes
            this.markCell(gridXY);

            } else {
            // This vertex is in a cell that does not share an edge with the previous
            //  cell. This means that the path passes through other cells between
            //  this vertex and the previous vertex, and we must determine which cells
            //  it passes through
            this.getGridIntersects(vertices[i - 1], vertices[i], hintXY, gridXY);
            }

            // Use this cell to find and compare with the next one
            hintXY = gridXY;
        }
    }

    /**
     * Find the cell a path vertex is in by brute force iteration over the grid
     *
     * @param {google.maps.LatLng} latlng The latlng of the vertex
     * @return {Number[]} The cell coordinates of this vertex in the grid
     */
    private getCellCoords(latlng: google.maps.LatLng): number[] {
        let x = 0;
        let y = 0;
        while (this.lngGrid_[x] < latlng.lng()) {
            x++;
        }
        while (this.lngGrid_[y] < latlng.lng()) {
            y++;
        }
        return ([x - 1, y - 1]);
    }

    /**
     * Find the cell a path vertex is in based on the known location of a nearby
     *  vertex. This saves searching the whole grid when working through vertices
     *  on the polyline that are likely to be in close proximity to each other.
     *
     * @param {google.maps.LatLng} latlng The latlng of the vertex to locate in the grid
     * @param {google.maps.LatLng} hintlatlng The latlng of the vertex with a known location
     * @param {Number[]} hint The cell containing the vertex with a known location
     * @return {Number[]} The cell coordinates of the vertex to locate in the grid
     */
    private getGridCoordsFromHint(latlng: google.maps.LatLng, hintlatlng: google.maps.LatLng, hint: number[]): number[] {
        let x, y;
        if (latlng.lng() > hintlatlng.lng()) {
            for (x = hint[0]; this.lngGrid_[x + 1] < latlng.lng(); x++) {}
        } else {
            for (x = hint[0]; this.lngGrid_[x] > latlng.lng(); x--) {}
        }

        if (latlng.lat() > hintlatlng.lat()) {
            for (y = hint[1]; this.latGrid_[y + 1] < latlng.lat(); y++) {}
        } else {
            for (y = hint[1]; this.latGrid_[y] > latlng.lat(); y--) {}
        }

        return ([x, y]);
    }


    /**
     * Identify the grid squares that a path segment between two vertices
     * intersects with by:
     * 1. Finding the bearing between the start and end of the segment
     * 2. Using the delta between the lat of the start and the lat of each
     *    latGrid boundary to find the distance to each latGrid boundary
     * 3. Finding the lng of the intersection of the line with each latGrid
     *     boundary using the distance to the intersection and bearing of the line
     * 4. Determining the x-coord on the grid of the point of intersection
     * 5. Filling in all squares between the x-coord of the previous intersection
     *     (or start) and the current one (or end) at the current y coordinate,
     *     which is known for the grid line being intersected
     *
     * @param {google.maps.LatLng} start The latlng of the vertex at the start of the segment
     * @param {google.maps.LatLng} end The latlng of the vertex at the end of the segment
     * @param {Number[]} startXY The cell containing the start vertex
     * @param {Number[]} endXY The cell containing the vend vertex
     */
    private getGridIntersects(start: google.maps.LatLng, end: google.maps.LatLng, startXY: number[], endXY: number[]): void {
        let edgePoint, edgeXY, i;
        let brng = this.rhumbBearingTo(start, end);

        let hint = start;
        let hintXY = startXY;

        // Handle a line segment that travels south first
        if (end.lat() > start.lat()) {
            // Iterate over the east to west grid lines between the start and end cells
            for (i = startXY[1] + 1; i <= endXY[1]; i++) {
                // Find the latlng of the point where the path segment intersects with
                //  this grid line (Step 2 & 3)
                edgePoint = this.getGridIntersect(start, brng, this.latGrid_[i]);

                // Find the cell containing this intersect point (Step 4)
                edgeXY = this.getGridCoordsFromHint(edgePoint, hint, hintXY);

                // Mark every cell the path has crossed between this grid and the start,
                //   or the previous east to west grid line it crossed (Step 5)
                this.fillInGridSquares(hintXY[0], edgeXY[0], i - 1);

                // Use the point where it crossed this grid line as the reference for the
                //  next iteration
                hint = edgePoint;
                hintXY = edgeXY;
            }

            // Mark every cell the path has crossed between the last east to west grid
            //  line it crossed and the end (Step 5)
            this.fillInGridSquares(hintXY[0], endXY[0], i - 1);

        } else {
            // Iterate over the east to west grid lines between the start and end cells
            for (i = startXY[1]; i > endXY[1]; i--) {
                // Find the latlng of the point where the path segment intersects with
                //  this grid line (Step 2 & 3)
                edgePoint = this.getGridIntersect(start, brng, this.latGrid_[i]);

                // Find the cell containing this intersect point (Step 4)
                edgeXY = this.getGridCoordsFromHint(edgePoint, hint, hintXY);

                // Mark every cell the path has crossed between this grid and the start,
                //   or the previous east to west grid line it crossed (Step 5)
                this.fillInGridSquares(hintXY[0], edgeXY[0], i);

                // Use the point where it crossed this grid line as the reference for the
                //  next iteration
                hint = edgePoint;
                hintXY = edgeXY;
            }

            // Mark every cell the path has crossed between the last east to west grid
            //  line it crossed and the end (Step 5)
            this.fillInGridSquares(hintXY[0], endXY[0], i);
        }
    }

    /**
     * Find the latlng at which a path segment intersects with a given
     *   line of latitude
     *
     * @param {google.maps.LatLng} start The vertex at the start of the path segment
     * @param {Number} brng The bearing of the line from start to end
     * @param {Number} gridLineLat The latitude of the grid line being intersected
     * @return {google.maps.LatLng} The latlng of the point where the path segment intersects
     *                    the grid line
     */
    private getGridIntersect(start: google.maps.LatLng, brng: number, gridLineLat: number): google.maps.LatLng {
        let d = this.R * ((this.toRad(gridLineLat) - this.toRad(start.lat())) / Math.cos(this.toRad(brng)));
        return this.rhumbDestinationPoint(start, brng, d);
    }

    /**
     * Mark all cells in a given row of the grid that lie between two columns
     *   for inclusion in the boxes
     *
     * @param {Number} startx The first column to include
     * @param {Number} endx The last column to include
     * @param {Number} y The row of the cells to include
     */
    private fillInGridSquares(startx: number, endx: number, y: number): void {
        let x;
        if (startx < endx) {
            for (x = startx; x <= endx; x++) {
                this.markCell([x, y]);
            }
        } else {
            for (x = startx; x >= endx; x--) {
                this.markCell([x, y]);
            }
        }
    }

    /**
     * Mark a cell and the 8 immediate neighbours for inclusion in the boxes
     *
     * @param {Number[]} square The cell to mark
     */
    private markCell(cell: number[]): void {
        let x = cell[0];
        let y = cell[1];
        this.grid_[x - 1][y - 1] = 1;
        this.grid_[x][y - 1] = 1;
        this.grid_[x + 1][y - 1] = 1;
        this.grid_[x - 1][y] = 1;
        this.grid_[x][y] = 1;
        this.grid_[x + 1][y] = 1;
        this.grid_[x - 1][y + 1] = 1;
        this.grid_[x][y + 1] = 1;
        this.grid_[x + 1][y + 1] = 1;
    }

    /**
     * Create two sets of bounding boxes, both of which cover all of the cells that
     *   have been marked for inclusion.
     *
     * The first set is created by combining adjacent cells in the same column into
     *   a set of vertical rectangular boxes, and then combining boxes of the same
     *   height that are adjacent horizontally.
     *
     * The second set is created by combining adjacent cells in the same row into
     *   a set of horizontal rectangular boxes, and then combining boxes of the same
     *   width that are adjacent vertically.
     *
     */
    private mergeIntersectingCells(): void {
        // The box we are currently expanding with new cells
        let currentBox = null;

        // Traverse the grid a row at a time
        for (let y = 0; y < this.grid_[0].length; y++) {
            for (let x = 0; x < this.grid_.length; x++) {

                if (this.grid_[x][y]) {
                    // This cell is marked for inclusion. If the previous cell in this
                    //   row was also marked for inclusion, merge this cell into it's box.
                    // Otherwise start a new box.
                    let box = this.getCellBounds([x, y]);
                    if (currentBox) {
                        currentBox.extend(box.getNorthEast());
                    } else {
                        currentBox = box;
                    }

                } else {
                    // This cell is not marked for inclusion. If the previous cell was
                    //  marked for inclusion, merge it's box with a box that spans the same
                    //  columns from the row below if possible.
                    this.mergeBoxesY(currentBox);
                    currentBox = null;
                }

            }
            // If the last cell was marked for inclusion, merge it's box with a matching
            //  box from the row below if possible.
            this.mergeBoxesY(currentBox);
            currentBox = null;
        }

        // Traverse the grid a column at a time
        for (let x = 0; x < this.grid_.length; x++) {
            for (let y = 0; y < this.grid_[0].length; y++) {
                if (this.grid_[x][y]) {

                    // This cell is marked for inclusion. If the previous cell in this
                    //   column was also marked for inclusion, merge this cell into it's box.
                    // Otherwise start a new box.
                    if (currentBox) {
                    let box = this.getCellBounds([x, y]);
                        currentBox.extend(box.getNorthEast());
                    } else {
                        currentBox = this.getCellBounds([x, y]);
                    }

                } else {
                    // This cell is not marked for inclusion. If the previous cell was
                    //  marked for inclusion, merge it's box with a box that spans the same
                    //  rows from the column to the left if possible.
                    this.mergeBoxesX(currentBox);
                    currentBox = null;

                }
            }
            // If the last cell was marked for inclusion, merge it's box with a matching
            //  box from the column to the left if possible.
            this.mergeBoxesX(currentBox);
            currentBox = null;
        }
    }

    /**
     * Search for an existing box in an adjacent row to the given box that spans the
     * same set of columns and if one is found merge the given box into it. If one
     * is not found, append this box to the list of existing boxes.
     *
     * @param {google.maps.LatLngBounds}  The box to merge
     */
    private mergeBoxesX(box: google.maps.LatLngBounds): void {
        if (box !== null) {
            for (let i = 0; i < this.boxesX_.length; i++) {
                if (this.boxesX_[i].getNorthEast().lng() === box.getSouthWest().lng() &&
                    this.boxesX_[i].getSouthWest().lat() === box.getSouthWest().lat() &&
                    this.boxesX_[i].getNorthEast().lat() === box.getNorthEast().lat()) {
                    this.boxesX_[i].extend(box.getNorthEast());
                    return;
                }
            }
            this.boxesX_.push(box);
        }
    }

    /**
     * Search for an existing box in an adjacent column to the given box that spans
     * the same set of rows and if one is found merge the given box into it. If one
     * is not found, append this box to the list of existing boxes.
     *
     * @param {LatLngBounds}  The box to merge
     */
    private mergeBoxesY(box: google.maps.LatLngBounds): void {
        if (box !== null) {
            for (let i = 0; i < this.boxesY_.length; i++) {
                if (this.boxesY_[i].getNorthEast().lat() === box.getSouthWest().lat() &&
                    this.boxesY_[i].getSouthWest().lng() === box.getSouthWest().lng() &&
                    this.boxesY_[i].getNorthEast().lng() === box.getNorthEast().lng()) {
                    this.boxesY_[i].extend(box.getNorthEast());
                    return;
                }
            }
            this.boxesY_.push(box);
        }
    };

    /**
     * Obtain the LatLngBounds of the origin of a cell on the grid
     *
     * @param {Number[]} cell The cell to lookup.
     * @return {LatLngBounds} The latlng of the origin of the cell.
     */
    private getCellBounds(cell: number[]): google.maps.LatLngBounds {
        return new google.maps.LatLngBounds(
            new google.maps.LatLng(this.latGrid_[cell[1]], this.lngGrid_[cell[0]]),
            new google.maps.LatLng(this.latGrid_[cell[1] + 1], this.lngGrid_[cell[0] + 1]));
    }

    /* Based on the Latitude/longitude spherical geodesy formulae & scripts
    at http://www.movable-type.co.uk/scripts/latlong.html
    (c) Chris Veness 2002-2010
    */
    private rhumbDestinationPoint(coord: google.maps.LatLng, brng: number, dist: number): google.maps.LatLng {
        let d = dist / this.R;  // d = angular distance covered on earth's surface
        let lat1 = this.toRad(coord.lat()), lon1 = this.toRad(coord.lng());
        brng = this.toRad(brng);

        let lat2 = lat1 + d * Math.cos(brng);
        let dLat = lat2 - lat1;
        let dPhi = Math.log(Math.tan(lat2 / 2 + Math.PI / 4) / Math.tan(lat1 / 2 + Math.PI / 4));
        let q = (Math.abs(dLat) > 1e-10) ? dLat / dPhi : Math.cos(lat1);
        let dLon = d * Math.sin(brng) / q;
        // check for going past the pole
        if (Math.abs(lat2) > Math.PI / 2) {
            lat2 = lat2 > 0 ? Math.PI - lat2 : - (Math.PI - lat2);
        }
        let lon2 = (lon1 + dLon + Math.PI) % (2 * Math.PI) - Math.PI;

        if (isNaN(lat2) || isNaN(lon2)) {
            return null;
        }
        return new google.maps.LatLng(this.toDeg(lat2), this.toDeg(lon2));
    }

    private rhumbBearingTo(coord: google.maps.LatLng, dest: google.maps.LatLng): number {
        let dLon = this.toRad(dest.lng() - coord.lng());
        let dPhi = Math.log(Math.tan(this.toRad(dest.lat()) / 2 + Math.PI / 4) / Math.tan(this.toRad(coord.lat()) / 2 + Math.PI / 4));
        if (Math.abs(dLon) > Math.PI) {
            dLon = dLon > 0 ? -(2 * Math.PI - dLon) : (2 * Math.PI + dLon);
        }
        return this.toBrng(Math.atan2(dLon, dPhi));
    }

    /**
     * Extend the Number object to convert degrees to radians
     *
     * @return {Number} Bearing in radians
     * @ignore
     */
    // Number.prototype.toRad = function () {
    //     return this * Math.PI / 180;
    // }
    private toRad(num: number): number {
        return num * Math.PI / 180;
    }

    /**
     * Extend the Number object to convert radians to degrees
     *
     * @return {Number} Bearing in degrees
     * @ignore
     */
    // Number.prototype.toDeg = function () {
    //     return this * 180 / Math.PI;
    // }
    private toDeg(num: number): number {
        return num * 180 / Math.PI;
    }

    /**
     * Normalize a heading in degrees to between 0 and +360
     *
     * @return {Number} Return
     * @ignore
     */
    // Number.prototype.toBrng = function () {
    //     return (this.toDeg() + 360) % 360;
    // }
    private toBrng(num: number): number {
        return (this.toDeg(num) + 360) % 360;
    }
}

