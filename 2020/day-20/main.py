from re import findall
from math import sqrt
from numpy import flip

f = open('./test', 'rt')
data = f.read().strip().split('\n\n')

def get_id(header):
	return findall('(\d+)', header)[0]

def p_t(tile):
	print()
	for line in tile:
		print(line)

raw = {}
for tile in data:
	lines = tile.splitlines()
	raw[get_id(lines[0])] = [[*y] for y in lines[1:]]

size = int(sqrt(len(raw)))
photo = [[None] * size for i in range(size)]

print(photo)


def get_top(tile):
	return ''.join(tile[0])

def get_bottom(tile):
	return ''.join(tile[-1])

def get_left(tile):
	return ''.join([row[0] for row in tile])

def get_right(tile):
	return ''.join([row[-1] for row in tile])
