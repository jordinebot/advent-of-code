from time import time
from collections import deque

test = deque([3,8,9,1,2,5,4,6,7])
input = deque([7,9,2,8,4,5,1,3,6])

def next3(cups, index):
	t = []
	index += 1
	while len(t) < 3:
		t.append(cups[index % len(cups)])
		index += 1
	return t

def crab_cups(cups, moves):
	p = 0
	m = min(cups)
	M = max(cups)
	for i in range(moves):
		c = cups[p]
		N = next3(cups, p)
		d = c - 1
		if d < m:
			d = M
		while d in N:
			d -= 1
			if d < m:
				d = M

		for n in N:
			cups.remove(n)

		di = cups.index(d) + 1
		for j in range(len(N)):
			cups.insert(di, [*reversed(N)][j])

		while cups[p] != c:
			cups.rotate(1)

		p = (p + 1) % len(cups)

	return cups


mix = crab_cups(input.copy(), 100)
while mix[0] != 1:
	mix.rotate(1)
mix.remove(1)
print('Part 1: The labels on the cups after cup 1 are %s' % ''.join([str(m) for m in list(mix)]))


def crab_cups_2(cups, moves):
	M = max(cups)
	cups.extend([*range(M, 1000001)])
	return crab_cups(cups, moves)

t0 = time()
mix = crab_cups_2(input.copy(), 10000000)
t1 = time()
index_1 = mix.index(1)

print('Part 2: Multiplying together %d and %d gives %d (%fs)' %(mix[index_1 + 1], mix[index_1 + 2], (mix[index_1 + 1] * mix[index_1 + 2]), (t1 - t0)))
