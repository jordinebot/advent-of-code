f = open("input", "rt")
boarding_passes = f.read().strip().split("\n")

def get_seat(boarding_pass):
	row = [i for i in range(128)]
	for r in boarding_pass[:7]:
		if r == "F": row = row[:len(row) // 2]
		if r == "B": row = row[len(row) // 2:]

	col = [i for i in range(8)]
	for c in boarding_pass[7:]:
		if c == "L": col = col[:len(col) // 2]
		if c == "R": col = col[len(col) // 2:]

	return row[0] * 8 + col[0]


seats = sorted([*map(get_seat, boarding_passes)])
print("Part 1: The highest seat ID from the list of boarding passes is %d" % seats[-1])

my_boarding_pass = [i for i in range(seats[0], seats[-1]) if not i in seats]
print("Part 2: My boarding pass is %d" % my_boarding_pass[0])

