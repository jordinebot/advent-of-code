import time

f = open("input", "rt")
data = [*map( lambda x: int(x), f.read().strip().split("\n"))]

preamble = 25

def check(i, data):
	if i < preamble:
		return True
	else:
		n = data[i]
		subset = data[:i]
		for x in range(0, len(subset)):
			for y in range(x + 1, len(subset)):
				if data[x] + data[y] == n:
					return True
		return False

t0 = time.time()
for i in range(preamble, len(data)):
	if not check(i, data):
		t1 = time.time()
		print("Part 1: The first number that is not the sum of two previous ones is %d (%fms)" % (data[i], (t1-t0)*1000))
		break
