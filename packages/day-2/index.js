const fs = require("fs");

const EOS = ",";
const OPCODE_SIZE = 4;

const OP_1 = 1;
const OP_2 = 2;
const REGISTER = 3;

const opcodes = {
	ADD: 1,
	MUL: 2,
	HALT: 99
};

function read(address) {
	if (typeof cpu.program[address] === "undefined") {
		throw new Error(
			`Memory Access Violation. Cannot read from address ${address}`
		);
	}
	return +cpu.program[address];
}

function write(address, value) {
	if (typeof cpu.program[address] === "undefined") {
		throw new Error(
			`Memory Access Violation. Cannot write to address ${address}`
		);
	}
	if (!/\d+/.test(value)) {
		throw new Error(
			`Memory Access Denied. Cannot write invalid value ${value}`
		);
	}
	return (cpu.program[address] = value);
}

function addr1() {
	return cpu.program[cpu.pc + OP_1];
}

function addr2() {
	return cpu.program[cpu.pc + OP_2];
}

function register() {
	return cpu.program[cpu.pc + REGISTER];
}

function execute() {
	const opcode = cpu.program[cpu.pc];
	if (typeof opcode === "undefined") {
		throw new Error("Invalid Program Counter");
	}
	switch (opcode) {
		case opcodes.ADD:
			write(register(), read(addr1()) + read(addr2()));
			break;
		case opcodes.MUL:
			write(register(), read(addr1()) * read(addr2()));
			break;
		default:
			throw new Error("Unknown opcode");
	}
	cpu.pc += OPCODE_SIZE;
}

function run() {
	while (cpu.program[cpu.pc] !== opcodes.HALT) execute(cpu);
}

function compile(code) {
	return code.split(EOS).map(opcode => +opcode);
}

function applyFix(program) {
	program[1] = 12;
	program[2] = 2;
	return program;
}

const cpu = {
	pc: 0,
	program: []
};

fs.readFile("./input", "utf8", (err, code) => {
	if (err) throw new Error(err.message);

	cpu.program = applyFix(compile(code));
	run(cpu);

	console.log(`[day-2] Answer: ${cpu.program[0]}`);
});
