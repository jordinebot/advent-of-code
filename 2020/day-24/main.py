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





