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

def count_stable_ocupation(grid, crowded, count_method):
	changed = True
	while changed:
		changed = False
		occupied = 0
		update = deepcopy(grid)
		for y in range(len(grid)):
			for x in range(len(grid[y])):
				count = count_method(x, y, grid)
				seat = grid[y][x]
				if seat == EMPTY and count == 0:
					changed = True
					update[y][x] = OCCUPIED
				elif seat == OCCUPIED and count >= crowded:
					changed = True
					update[y][x] = EMPTY
				if seat == OCCUPIED:
					occupied += 1
		grid = update
	return occupied

t0 = time()
occupied = count_stable_ocupation(grid, 4, adjacent)
t1 = time()
print("Part 1: There are %d occupied seats after stabilization (%fms)" % (occupied, (t1 - t0) * 1000))


def visibility(x, y, grid):
	count = 0
	# To Top
	for r in range(y - 1, -1, -1):
		if grid[r][x] == OCCUPIED:
			count += 1
			break
		if grid[r][x] == EMPTY:
			break

	# To Bottom
	for r in range(y + 1, len(grid), 1):
		if grid[r][x] == OCCUPIED:
			count += 1
			break
		if grid[r][x] == EMPTY:
			break

	# To Left
	for c in range(x - 1, -1, -1):
		if grid[y][c] == OCCUPIED:
			count += 1
			break
		if grid[y][c] == EMPTY:
			break


	# To Right
	for c in range(x + 1, len(grid[y]), 1):
		if grid[y][c] == OCCUPIED:
			count += 1
			break
		if grid[y][c] == EMPTY:
			break

	# To Top-Right
	r = y - 1
	c = x + 1
	while r >= 0 and c < len(grid[y]):
		if grid[r][c] == OCCUPIED:
			count += 1
			break
		if grid[r][c] == EMPTY:
			break
		r -= 1
		c += 1

	# To Bottom-Right
	r = y + 1
	c = x + 1
	while r < len(grid) and c < len(grid[y]):
		if grid[r][c] == OCCUPIED:
			count += 1
			break
		if grid[r][c] == EMPTY:
			break
		r += 1
		c += 1

	# To Bottom-Left
	r = y + 1
	c = x - 1
	while r < len(grid) and c >= 0:
		if grid[r][c] == OCCUPIED:
			count += 1
			break
		if grid[r][c] == EMPTY:
			break
		r += 1
		c -= 1

	# To Top-Left
	r = y - 1
	c = x - 1
	while r >= 0 and c >= 0:
		if grid[r][c] == OCCUPIED:
			count += 1
			break
		if grid[r][c] == EMPTY:
			break
		r -= 1
		c -= 1

	return count


t0 = time()
occupied = count_stable_ocupation(grid, 5, visibility)
t1 = time()
print("Part 2: There are %d occupied seats after stabilization (%fms)" % (occupied, (t1 - t0) * 1000))
