import { readStrings } from '../common/helpers';
import { getNeighbors } from '../common/matrix';
import { colors } from '../common/colors';

export const day11 = async () => {
	const data = await readStrings('src/inputs/input11');
	let octopuses = data.map((row) => row.split('').map((x) => parseInt(x, 10)));

	const print = (o) => {
		o.forEach((row) =>
			console.log('\t', row.join('').replaceAll('0', `${colors.reverse}0${colors.reset}`))
		);
		console.log('\n');
	};

	const DAYS = 400;
	let flashes = 0;
	let wave = [];
	let flashed = [];
	let allFlash = 0;

	const increaseEnergy = ([x, y], o) => {
		o[x][y] = o[x][y] + 1;
	};

	const isFlashing = ([x, y], o) => o[x][y] > 9;

	const id = ([x, y]) => [x, y].join(',');
	const coord = (id) => id.split(',').map((x) => parseInt(x, 10));

	function octoStep(octopuses) {
		// const 
	}

	for (let day = 0; day < DAYS; day++) {
		flashed = [];
		wave = [];
		// First, increase energy level by 1
		for (let x = 0; x < octopuses.length; x++) {
			for (let y = 0; y < octopuses[x].length; y++) {
				increaseEnergy([x, y], octopuses);
			}
		}

		// Flash and increase adjacent energy level
		for (let x = 0; x < octopuses.length; x++) {
			for (let y = 0; y < octopuses[x].length; y++) {
				if (isFlashing([x, y], octopuses)) {
					flashes++;
					flashed.push(id([x, y]));
					wave = [...wave, ...getNeighbors([x, y], octopuses)];
				}
			}
		}

		while (wave.length) {
			let newWave = [];
			wave.forEach(([x, y]) => increaseEnergy([x, y], octopuses));
			wave.forEach(([x, y]) => {
				if (isFlashing([x, y], octopuses) && !flashed.includes(id([x, y]))) {
					flashes++;
					flashed.push(id([x, y]));
					newWave = [...newWave, ...getNeighbors([x, y], octopuses)];
				}
			});
			wave = newWave;
		}

		// Finally, set energy to 0 if flashed in this octopuses
		flashed.forEach((f) => {
			const [x, y] = coord(f);
			octopuses[x][y] = 0;
		});

		if (flashed.length === 100 && allFlash === 0) {
			allFlash = day + 1; 
		}
	}
	console.log('>>> Day 11');
	console.log('\tpart1:', flashes);
	console.log('\tpart2:', allFlash);
};
