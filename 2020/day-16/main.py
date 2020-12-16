from numpy import prod

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
	for rule in rules.values():
		if value in rule[0] or value in rule[1]:
			return True
	return False


def is_valid_ticket(ticket):
	for v in ticket:
		if not in_range(v):
			return False
	return True


def scanning_error_rate(ticket):
	out_of_range = [v for v in ticket if not in_range(v)]
	return sum(out_of_range)


nearby_tickets_scanning_error_rate = sum([scanning_error_rate(t) for t in nearby_tickets])
print("Part 1: The sum of scanning error rate for nearby tickets is %d" % nearby_tickets_scanning_error_rate)


valid_nearby_tickets = [t for t in nearby_tickets if is_valid_ticket(t)]

def find_matching_keys(value):
	return [rule_key for rule_key, rule in rules.items() if value in rule[0] or value in rule[1]]


rosetta = {}
matches = { i: set(rules.keys()) for i in range(len(my_ticket)) }
while len(rosetta) < len(my_ticket):
	for t in valid_nearby_tickets:
		for i, v in enumerate(t):
			if i in matches:
				matching = find_matching_keys(v)
				matches[i] = matches[i].intersection(matching)
				if len(matches[i]) == 1:
					key = matches.pop(i, None).pop()
					rosetta[key] = i
					for j in matches:
						matches[j].remove(key)


departure_fields = [my_ticket[index] for key, index in rosetta.items() if "departure" in key]
print("Part 2: The product of all departure fields is %d" % prod(departure_fields))
