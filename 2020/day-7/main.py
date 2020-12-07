import re

f = open("input", "rt")
data = f.read().strip()
data = re.sub(" bags?\.?", "",  data)
data = data.split("\n")

def parse_content(content):
	if content == 'no other':
		return
	else:
		return content[2:]

def parse_rule(rule):
	container, content = rule.split(" contain ")
	content = content.split(', ')
	content = [*map(parse_content, content)]
	return (container, content)

bags = {}
for rule in data:
	container, content = parse_rule(rule)
	bags[container] = content

def find_containers(target):
	containers = [bag for bag, content in bags.items() if target in content]
	return containers

containers = set(find_containers("shiny gold"))
check = set(containers)

while len(check) > 0:
	found = find_containers(check.pop())
	containers.update(found)
	check.update(found)

print("Part 1: A total of %d bags can finally contain a shiny gold bag" % len(containers))

