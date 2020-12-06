f = open("input", "rt")
groups = f.read().strip().split("\n\n")

counts = []
for group in groups:
	answers = list(set([*group.replace("\n", "")]))
	counts.append(len(answers))

print("Part 1: The sum of all counts is %d" % sum(counts))

counts = []
for group in groups:
	answers = list([*group.split("\n")])
	sets = [*map(set, answers)]
	common = sets[0].intersection(*sets[1:])
	counts.append(len(common))

print("Part 2: The sum of all counts is %d" % sum(counts))
