import { features as trail } from './start_trailcoords.json';

let coords = [];

const center = [28.25, -16.58];

trail.map((point) => {
    return coords.push([
        point.geometry.coordinates[1],
        point.geometry.coordinates[0],
    ]);
});

export default { coords, center };
