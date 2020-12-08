f = open("input", "rt")
program = list(f.read().strip().split("\n"))

i = 0
acc = 0
ran = []

while not i in ran:
	ran.append(i)
	ins, val = program[i].split(" ")
	if ins == "nop": i += 1
	elif ins == "jmp": i += int(val)
	elif ins == "acc":
		i += 1
		acc += int(val)

print("Part 1: The value of acc before jumping into the second infinite loop iteration is %d" % acc)

