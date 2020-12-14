import re

MASK = "mask"

f = open("input", "rt")
program = f.read().splitlines()

mem = {}
mask = ''

def to_bin(n):
	return bin(int(n))[2:]

def to_dec(n):
	return int(n, 2)

mem_pattern = re.compile("mem\[(\d+)\]")
def cmd_addr(cmd):
	matches = mem_pattern.findall(cmd)
	return int(matches[0])

def set_addr(addr, val):
	bin_val = [*reversed(to_bin(val))]
	masked = "".join(reversed([m if m != "X" else bin_val[i] if bin_val[i:] else "0" for i, m in enumerate(reversed(mask))]))
	mem[addr] = to_dec(masked)


for ins in program:
	cmd, val = ins.split(" = ")
	if cmd == MASK:
		mask = val
	else:
		set_addr(cmd_addr(cmd), val)

print("Part 1: The sum of all values in memory is %d" % sum(mem.values()))
