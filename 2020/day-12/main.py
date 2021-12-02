from math import sin, cos, radians

f = open("input", "rt")
instructions  = f.read().splitlines()

N = "N"
E = "E"
S = "S"
W = "W"
L = "L"
R = "R"
F = "F"

position = [0, 0, 0]
for instruction in instructions:
	action = instruction[0]
	value = int(instruction[1:])

	if action == N:
		position[1] += value
	elif action == S:
		position[1] -= value
	elif action == E:
		position[0] += value
	elif action == W:
		position[0] -= value

	elif action == R:
		position[2] = (position[2] - value) % 360
	elif action == L:
		position[2] = (position[2] + value) % 360
	elif action == F:
		if position[2] == 0:
			position[0] += value
		elif position[2] == 180:
			position[0] -= value
		elif position[2] == 90:
			position[1] += value
		elif position[2] == 270:
			position[1] -= value

print("Part 1: Manhattan distance from starting position is %d" % (abs(position[0]) + abs(position[1])))


def rotate(point, angle):
	s = sin(radians(angle))
	c = cos(radians(angle))

	return [round(point[0] * c - point[1] * s), round(point[1] * c + point[0] * s)]

position = [0, 0]
waypoint = [10, 1]

for instruction in instructions:
	action = instruction[0]
	value = int(instruction[1:])

	if action == N:
		waypoint[1] += value
	elif action == S:
		waypoint[1] -= value
	elif action == E:
		waypoint[0] += value
	elif action == W:
		waypoint[0] -= value

	elif action == R:
		waypoint = rotate(waypoint, -value)
	elif action == L:
		waypoint = rotate(waypoint, value)
	elif action == F:
		position = [position[0] + value * waypoint[0], position[1] + value * waypoint[1]]

print("Part 2: Manhattan distance from starting position is %d" % (abs(position[0]) + abs(position[1])))

