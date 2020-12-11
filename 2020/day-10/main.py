f = open("test1", "rt")
test1 = map( lambda x: int(x), f.read().strip().split("\n"))

f = open("test2", "rt")
test2 = map( lambda x: int(x), f.read().strip().split("\n"))

f = open("input", "rt")
data = [*map( lambda x: int(x), f.read().strip().split("\n"))]
max_diff = 3

def adapt(data):
	joltage = 0
	adapters = set(sorted(data))
	builtin = max(adapters) + max_diff
	differences = {3: 1}
	while len(adapters):
		candidates = [adapter for adapter in adapters if adapter > joltage and adapter <= joltage + max_diff]
		adapters.difference_update(candidates)
		for candidate in candidates:
			difference = candidate - joltage
			differences[difference] = differences.get(difference, 0) + 1
			joltage = candidate
	return differences

differences = adapt(data)
part1 = int(differences[1]) * int(differences[3])
print("Part 1: The number of 1-jolt multiplied by 3-jolt differences is %d" % part1)


data = sorted(data)
builtin = data[-1] + 3
adapters = [*data, builtin]
ways = {0: 1}
for a in adapters:
	ways_a = 0
	for i in range(1, 4):
		ways_a += ways.get(a - i, 0)
	ways[a] = ways_a

part2 = ways[builtin]
print("Part 2: The different arrangements is %d" % part2)
