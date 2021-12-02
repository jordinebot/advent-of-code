f = open('./input', 'rt')
lines = [line.replace(' ', '') for line in f.read().splitlines()]


ADD = '+'
MUL = '*'
OPN = '('
CLO = ')'

def operate(operator, operand1, operand2):
	if operator == ADD:
		return int(operand1) + int(operand2)
	else:
		return int(operand1) * int(operand2)

def solve2(expr):
	depth = 0
	stack = {
		'o0': [],
		'n0': []
	}
	for t in expr:
		if t == ADD or t == MUL:
			stack[f"o{depth}"].append(t)
		elif t == OPN:
			depth += 1
			stack[f"o{depth}"] = []
			stack[f"n{depth}"] = []
		elif t == CLO:
			r = stack[f"n{depth}"].pop()
			depth -= 1
			stack[f"n{depth}"].append(r)
			if len(stack[f"o{depth}"]) > 0:
				o = stack[f"o{depth}"].pop()
				a = stack[f"n{depth}"].pop()
				b = stack[f"n{depth}"].pop()
				stack[f"n{depth}"].append(operate(o, a, b))
		else:
			stack[f"n{depth}"].append(int(t))
			if len(stack[f"o{depth}"]) > 0:
				o = stack[f"o{depth}"].pop()
				a = stack[f"n{depth}"].pop()
				b = stack[f"n{depth}"].pop()
				stack[f"n{depth}"].append(operate(o, a, b))

	return int(stack[f"n{depth}"].pop())



results = []
for line in lines:
	results.append(solve2(line))

print("Part 1: The sum of all results is %d" % sum(results))
