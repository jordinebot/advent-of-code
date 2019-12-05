const fs = require("fs");
const readline = require("readline");
const { calculateSignalDelay, wire, wireIntersections } = require("./wires");

const wires = [];

readline
	.createInterface({
		input: fs.createReadStream("./input")
	})
	.on("line", function(instructions) {
		const steps = instructions.split(",");
		wires.push(wire(steps));
	})
	.on("close", function() {
		const intersections = wireIntersections(wires);
		const delays = intersections.map(
			intersection =>
				calculateSignalDelay(wires[0], intersection) +
				calculateSignalDelay(wires[1], intersection)
		);
		console.log(
			"[day-3] Answer:",
			delays.reduce((min, current) => (min < current ? min : current))
		);
	});
