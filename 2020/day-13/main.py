import re
from functools import reduce

f = open("test", "rt")
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

t = 0
delta = -1
found = False

deltas = [*schedule.keys()]
while not found:
	delta +=1
	departures = [(t + delta + deltas[i]) % id for i, id in enumerate(schedule.values())]
	if not any(departures):
		found = True

print("Part 2: Earliest timestamp with offsets matching positions is %d" % (t + delta))
