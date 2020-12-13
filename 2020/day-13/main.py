import re
f = open("input", "rt")
t, buses = f.read().splitlines()

t = int(t)
buses = [*map(lambda x: int(x), re.sub(",x", "", buses).split(","))]

delta = -1
found = False
while not found:
	delta += 1
	for bus in buses:
		if (t + delta) % bus == 0:
			found = True
			break

print("Part 1: Bus ID multiplied by waiting time is %d" % (delta * bus))
