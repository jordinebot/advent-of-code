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

