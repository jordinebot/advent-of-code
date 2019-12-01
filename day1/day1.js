const fs = require("fs");
const readline = require("readline");

function calculateRequiredFuel(mass) {
	if (isNaN(mass) || mass <= 0) return 0;
	const fuel = Math.max(0, Math.floor(mass / 3) - 2);
	return fuel + calculateRequiredFuel(fuel);
}

let totalFuel = 0;
readline
	.createInterface({
		input: fs.createReadStream("./input")
	})
	.on("line", function(mass) {
		totalFuel += calculateRequiredFuel(+mass);
	})
	.on("close", function() {
		console.log(totalFuel);
	});
