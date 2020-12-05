f = open("input", "rt")
boarding_passes = f.read().strip().split("\n")

def get_seat(boarding_pass):
	seat = [i for i in range(1024)]
	for x in boarding_pass:
		if x in ["F", "L"]: seat = seat[:len(seat) // 2]
		if x in ["B", "R"]: seat = seat[len(seat) // 2:]
	return seat[0]

seats = sorted([*map(get_seat, boarding_passes)])
print("Part 1: The highest seat from the list of boarding passes is %d" % seats[-1])

my_seat = [i for i in range(seats[0], seats[-1]) if not i in seats]
print("Part 2: My seat is %d" % my_seat[0])

