from time import time

test = [3,8,9,1,2,5,4,6,7]
input = [7,9,2,8,4,5,1,3,6]

def next3(cups, index):
	t = cups[index + 1: index + 4]
	if len(t) < 3:
		t.extend(cups[0:3 - len(t)])
	return t

def rotate(cups):
	r = cups[1:]
	r.append(cups[0])
	return r

def crab_cups(cups, moves):
	cups = list(cups)
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
			cups = rotate(cups)

		p = (p + 1) % len(cups)

	return cups


mix = crab_cups(input, 100)
while mix[0] != 1:
	mix = rotate(mix)
print('Part 1: The labels on the cups after cup 1 are %s' % ''.join([str(m) for m in mix[1:]]))


def crab_cups_2(cups, moves):
	M = max(cups)
	cups = list(cups)
	cups.extend([*range(M, 1000001)])
	return crab_cups(cups, moves)

t0 = time()
mix = crab_cups_2(test, 10000000)
t1 = time()
index_1 = mix.index(1)

print('Part 2: Multiplying together %d and %d gives %d (%fs)' %(mix[index_1 + 1], mix[index_1 + 2], (mix[index_1 + 1] * mix[index_1 + 2]), (t1 - t0)))
