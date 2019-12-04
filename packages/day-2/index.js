const fs = require("fs");

const EOS = ",";
const MAX_NOUN = 100;
const MAX_VERB = 100;
const GRAVITY_ASSIST = 19690720;

const OP_1 = 1;
const OP_2 = 2;
const REGISTER = 3;

const opcodes = {
	ADD: 1,
	MUL: 2,
	HALT: 99
};

const instructionSizes = {
	[opcodes.ADD]: 4,
	[opcodes.MUL]: 4,
	[opcodes.HALT]: 1
};

function read(address) {
	if (typeof computer.memory[address] === "undefined") {
		throw new Error(
			`Memory Access Violation. Cannot read from address ${address}`
		);
	}
	return +computer.memory[address];
}

function write(address, value) {
	if (typeof computer.memory[address] === "undefined") {
		throw new Error(
			`Memory Access Violation. Cannot write to address ${address}`
		);
	}
	if (!/\d+/.test(value)) {
		throw new Error(
			`Memory Access Denied. Cannot write invalid value ${value}`
		);
	}
	return (computer.memory[address] = value);
}

function addrParam1() {
	return computer.memory[computer.ip + OP_1];
}

function addrParam2() {
	return computer.memory[computer.ip + OP_2];
}

function register() {
	return computer.memory[computer.ip + REGISTER];
}

function execute() {
	const opcode = computer.memory[computer.ip];
	if (typeof opcode === "undefined") {
		throw new Error("Invalid memory Counter");
	}
	switch (opcode) {
		case opcodes.ADD:
			write(register(), read(addrParam1()) + read(addrParam2()));
			break;
		case opcodes.MUL:
			write(register(), read(addrParam1()) * read(addrParam2()));
			break;
		default:
			throw new Error("Unknown opcode");
	}
	computer.ip += instructionSizes[opcode];
}

function run() {
	while (computer.memory[computer.ip] !== opcodes.HALT) execute(computer);
	return computer.memory[0];
}

function compile(code) {
	return code.split(EOS).map(opcode => +opcode);
}

function applyFix(program, noun, verb) {
	program[1] = noun;
	program[2] = verb;
	return program;
}

function load(program = []) {
	computer.ip = 0;
	computer.memory = program;
}

const computer = {
	ip: 0,
	memory: []
};

fs.readFile("./input", "utf8", (err, code) => {
	if (err) throw new Error(err.message);

	let noun = 0;
	let verb = -1;
	let gravity = null;
	do {
		if (++verb === MAX_VERB) {
			noun++;
			verb = 0;
		}
		const program = applyFix(compile(code), noun, verb);
		load(program);
		gravity = run(computer);
	} while (gravity !== GRAVITY_ASSIST && noun < MAX_NOUN);

	console.log(`[day-2] Answer: ${100 * noun + verb}`);
});
