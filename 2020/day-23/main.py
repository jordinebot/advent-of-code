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
		print('\n-- move %d --' % (i + 1))
		print('cups:', '  '.join([f'{k}' if j != p else f'({k})' for j, k in enumerate(cups)]))
		c = cups[p]
		N = next3(cups, p)
		print('pick up:', ', '.join([str(n) for n in N]))
		d = c - 1
		if d < m:
			d = M
		while d in N:
			d -= 1
			if d < m:
				d = M
		print('destination:', d)

		for n in N:
			cups.remove(n)

		di = cups.index(d) + 1
		for j in range(len(N)):
			cups.insert(di, [*reversed(N)][j])

		while cups[p] != c:
			cups = rotate(cups)

		p = (p + 1) % len(cups)


	print('\n-- final--')
	print('cups:', '  '.join([f'{k}' if j != p else f'({k})' for j, k in enumerate(cups)]))
	return cups


mix = crab_cups(input, 100)
while mix[0] != 1:
	mix = rotate(mix)
print('Part 1: The labels on the cups after cup 1 are %s' % ''.join([str(m) for m in mix[1:]]))
