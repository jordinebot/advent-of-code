f = open("./input", "rt")
raw_rules, raw_my_ticket, raw_nearby_tickets = f.read().strip().split("\n\n")

rules = {}
for rule in raw_rules.splitlines():
	key, ranges = rule.split(": ")
	rules[key] = []
	for r in ranges.split(" or "):
		start, end = r.split("-")
		rules[key].append(range(int(start), int(end) + 1))

my_ticket = [int(x) for x in raw_my_ticket.splitlines()[1].split(",")]

nearby_tickets = []
for nearby in raw_nearby_tickets.splitlines()[1:]:
	nearby_tickets.append([int(x) for x in nearby.split(",")])


def in_range(value):
	for r in rules.values():
		if value in r[0] or value in r[1]:
			return True
	return False


def is_valid_ticket(ticket):
	for t in ticket:
		if in_range(t):
			return True
	return False


def scanning_error_rate(ticket):
	out_of_range = [t for t in ticket if not in_range(t)]
	return sum(out_of_range)


nearby_tickets_scanning_error_rate = sum([scanning_error_rate(t) for t in nearby_tickets])
print("Part 1: The sum of scanning error rate for nearby tickets is %d" % nearby_tickets_scanning_error_rate)


# valid_nearby_tickets = [*map(lambda t: is_valid_ticket(t), nearby_tickets)]
