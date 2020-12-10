import copy

f = open("test1", "rt")
test1 = map( lambda x: int(x), f.read().strip().split("\n"))

f = open("test2", "rt")
test2 = map( lambda x: int(x), f.read().strip().split("\n"))

f = open("input", "rt")
data = map( lambda x: int(x), f.read().strip().split("\n"))

max_diff = 3

def adapt(data):
	joltage = 0
	adapters = set(data)
	builtin = max(adapters) + max_diff
	differences = {3: 1}
	while len(adapters):
		candidates = sorted([adapter for adapter in adapters if adapter > joltage and adapter <= joltage + max_diff])
		adapters.difference_update(candidates)
		for candidate in candidates:
			difference = candidate - joltage
			if not difference in differences:
				differences[difference] = 0
			differences[difference] += 1
			joltage = candidate
	print(differences)
	return differences

differences = adapt(data)
part1 = int(differences[1]) * int(differences[3])
print("Part 1: The number of 1-jolt differences multiplied by 3-jolt differences is %d" % part1)
