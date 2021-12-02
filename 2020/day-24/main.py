f = open('./input', 'rt')
steps = f.read().strip().splitlines()

_E = 'e'
_W = 'w'
NE = 'ne'
NW = 'nw'
SE = 'se'
SW = 'sw'

WHITE = 'white'
BLACK = 'black'

def parse_steps(steps):
	parsed_steps = []
	for step in steps:
		parsed_step = []
		chars = list(step)
		while len(chars):
			c = chars.pop(0)
			if c == 'e' or c == 'w':
				parsed_step.append(c)
			else:
				n = chars.pop(0)
				parsed_step.append(f'{c}{n}')
		parsed_steps.append(parsed_step)
	return parsed_steps

steps = parse_steps(steps)

def flip(tile):
	if tile == WHITE:
		return BLACK
	else:
		return WHITE

def get_neighbours(coord):
	x, y = coord
	return [
		(x + 1, y),
		(x - 1, y),
		(x + 0.5, y + 1),
		(x - 0.5, y + 1),
		(x + 0.5, y - 1),
		(x - 0.5, y - 1)
	]


floor = {
	(0,0): WHITE
}

for step in steps:
	x = 0
	y = 0
	for direction in step:
		if direction == _E:
			x += 1
		elif direction == _W:
			x -= 1
		elif direction == NE:
			x += 0.5
			y += 1
		elif direction == NW:
			x -= 0.5
			y += 1
		elif direction == SE:
			x += 0.5
			y -= 1
		elif direction == SW:
			x -= 0.5
			y -= 1
	coord = (x, y)

	if coord in floor:
		floor[coord] = flip(floor[coord])
	else:
		floor[coord] = BLACK

black_tiles = [floor[coord] for coord in floor if floor[coord] == BLACK]
print('Part 1: The number of black tiles is', len(black_tiles))


for day in range(100):
	to_add = []
	for coord in floor:
		N = get_neighbours(coord)
		for n in N:
			if not n in floor:
				to_add.append(n)

	for a in to_add:
		floor[a] = WHITE

	to_flip = []
	for coord, color in floor.items():
		N = get_neighbours(coord)
		black_n = 0
		for n in N:
			if n in floor and floor[n] == BLACK:
				black_n += 1
		if color == BLACK and (black_n == 0 or black_n > 2):
			to_flip.append(coord)
		if color == WHITE and black_n == 2:
			to_flip.append(coord)


	for coord in to_flip:
		floor[coord] = flip(floor[coord])


black_tiles = [floor[coord] for coord in floor if floor[coord] == BLACK]
print('Part 2: The number of black tiles is', len(black_tiles))
