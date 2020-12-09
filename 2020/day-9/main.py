import time

f = open("input", "rt")
data = [*map( lambda x: int(x), f.read().strip().split("\n"))]

preamble = 25

def check(i):
	if i < preamble:
		return True
	else:
		n = data[i]
		for x in range(i - preamble, i):
			for y in range(i - preamble + 1, i):
				if data[x] + data[y] == n:
					return True
		return False

t0 = time.time()
for i in range(preamble, len(data)):
	if not check(i):
		t1 = time.time()
		print("Part 1: The first number that is not the sum of two previous ones is %d (%fms)" % (data[i], (t1-t0)*1000))
		break

