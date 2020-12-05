f = open("input", "rt")
boarding_passes = f.read().strip().split("\n")

def get_seat_id(boarding_pass):
	row_code = boarding_pass[:7]
	col_code = boarding_pass[7:]

	row = [i for i in range(128)]
	for r in row_code:
		if r == "F": row = row[:len(row) // 2]
		if r == "B": row = row[len(row) // 2:]

	col = [i for i in range(8)]
	for c in col_code:
		if c == "L": col = col[:len(col) // 2]
		if c == "R": col = col[len(col) // 2:]

	return row[0] * 8 + col[0]


seat_ids = sorted([*map(get_seat_id, boarding_passes)])
print("Part 1: The highest seat ID from the list of boarding passes is %d" % seat_ids[-1])
