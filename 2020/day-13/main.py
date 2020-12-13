import re
import math
from sympy import mod_inverse

f = open("input", "rt")
t, buses = f.read().splitlines()

t = int(t)
ids = [*map(lambda x: int(x), re.sub(",x", "", buses).split(","))]

delta = -1
found = False
while not found:
	delta += 1
	for id in ids:
		if (t + delta) % id == 0:
			found = True
			break

print("Part 1: Bus ID multiplied by waiting time is %d" % (delta * id))

buses = buses.split(",")
schedule = {}
for i in range(len(buses)):
	if buses[i] != "x":
		schedule[i] = int(buses[i])

def crt(schedule):
	a = [*schedule.keys()]
	m = [*schedule.values()]
	M = math.prod(m)
	z = [M // mi for mi in m]
	y = [mod_inverse(zi, m[i]) for i, zi in enumerate(z)]
	w = [y[i] * z[i] % M for i in range(len(y))]
	return sum([m[i] * w[i] for i in range(len(w))]) % M

print("Part 2: Earliest timestamp with offsets matching positions is %d" % crt(schedule))

