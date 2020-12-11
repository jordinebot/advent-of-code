from time import time
from copy import deepcopy

EMPTY = 'L'
OCCUPIED = '#'

f = open("input", "rt")
grid = f.read().splitlines()
grid = [[*row] for row in grid]

def adjacent(x, y, grid):
	count = 0
	for r in range(y - 1, y + 2):
		if r in range(len(grid)):
			for c in range(x - 1, x + 2):
				if c in range(len(grid[r])) and not (r == y and c == x) and grid[r][c] == OCCUPIED:
					count += 1
	return count

def nice_print(grid):
	print("")
	for row in grid:
		print("".join(row))

def occupied_part1(grid):
	changed = True
	while changed:
		changed = False
		occupied = 0
		update = deepcopy(grid)
		for y in range(len(update)):
			for x in range(len(grid[y])):
				count = adjacent(x, y, grid)
				seat = grid[y][x]
				if seat == EMPTY and count == 0:
					changed = True
					update[y][x] = OCCUPIED
				elif seat == OCCUPIED and count >= 4:
					changed = True
					update[y][x] = EMPTY
				if seat == OCCUPIED:
					occupied += 1
		grid = update
	return occupied

t0 = time()
occupied = occupied_part1(grid)
t1 = time()


print("Part 1: There are %d occupied seats after stabilization (%fms)" % (occupied, (t1 - t0) * 1000))
