import re

MASK = "mask"

f = open("input", "rt")
program = f.read().splitlines()

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


mem = {}
mask = ''

for ins in program:
	cmd, val = ins.split(" = ")
	if cmd == MASK:
		mask = val
	else:
		set_addr(cmd_addr(cmd), val)

print("Part 1: The sum of all values in memory is %d" % sum(mem.values()))


def unmask(masked, unmasked):
	index = masked.index("X") if "X" in masked else None
	if index == None:
		unmasked.append(masked)
	else:
		a = [*masked]
		a[index] = "0"
		b = [*masked]
		b[index] = "1"
		a = "".join(a)
		b = "".join(b)
		unmask(a, unmasked)
		unmask(b, unmasked)
	return unmasked





def cmd_addr_v2(cmd):
	addr = cmd_addr(cmd)
	bin_addr = [*reversed(to_bin(addr).zfill(len(mask)))]
	masked = "".join(reversed([m if m == "X" else bin_addr[i] if m == "0" else "1" for i, m in enumerate(reversed(mask))]))
	return unmask(masked, [])


mem = {}
mask = ''

for ins in program:
	cmd, val = ins.split(" = ")
	if cmd == MASK:
		mask = val
	else:
		addrs = cmd_addr_v2(cmd)
		for addr in addrs:
			mem[to_dec(addr)] = int(val)


print("Part 1: The sum of all values in memory is %d" % sum(mem.values()))
