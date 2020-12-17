import itertools
from copy import deepcopy

ACTIVE = '#'
INACTIVE = '.'

f = open('./input', 'rt')
z0 = f.read().splitlines()

space = {
	(x, y, 0) : z0[y][x] for y in range(len(z0)) for x in range(len(z0[y]))
}

deltas = {d for d in itertools.product((0, 1, -1), repeat = 3) if d != (0, 0, 0)}
def neighbours(c):
	x, y, z = c
	n = []
	for d in deltas:
		d0, d1, d2 = d
		n.append((x + d0, y + d1, z + d2))
	return n


def is_active(c):
	return space[c] == ACTIVE if c in space else False


def active_neighbours(c):
	n = neighbours(c)
	return [a for a in n if is_active(a)]

for t in range(0,6):
	explore = set()
	for c in space:
		n = neighbours(c)
		explore.update(n)

	for e in explore:
		if e not in space:
			space[e] = INACTIVE

	next_space = deepcopy(space)

	for c in space:
		an = active_neighbours(c)
		if is_active(c) and len(an) not in range(2, 4):
			next_space[c] = INACTIVE
		elif not is_active(c) and len(an) == 3:
			next_space[c] = ACTIVE
	space = next_space

active_cubes = [c for c in space if is_active(c)]

print('Part 1: Number of active cubes after 6 iterations %d' % len(active_cubes))
