const fs = require("fs");
const readline = require("readline");

const { wire, wireIntersections, getLowerDistance } = require("./wires");

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
		const lowerDistance = getLowerDistance(intersections);
		console.log("[day-3] Answer:", lowerDistance);
	});
