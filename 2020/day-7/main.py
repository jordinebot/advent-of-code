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

def parse_content_with_qty(content):
    if content == 'no other':
        return
    else:
        return ( content[2:], content[:1] )

def parse_rule(rule, parse_content):
    container, content = rule.split(" contain ")
    content = content.split(', ')
    content = [bag for bag in map(parse_content, content) if bag != None]
    return (container, content)

bags = {}
bags_qty = {}
for rule in data:
    container, content = parse_rule(rule, parse_content)
    bags[container] = content
    container, content = parse_rule(rule, parse_content_with_qty)
    bags_qty[container] = content


def find_containers(target):
    containers = [bag for bag, content in bags.items() if target in content]
    return containers

containers = set()
check = set(["shiny gold"])
while len(check) > 0:
    found = find_containers(check.pop())
    containers.update(found)
    check.update(found)

print("Part 1: A total of %d bags can finally contain a shiny gold bag" % len(containers))

def find_content(bag):
    count = 0
    content = bags_qty[bag]
    for (content_bag, qty) in content:
        count += int(qty) + int(qty) * find_content(content_bag)
    return int(count)


count = find_content("shiny gold")

print("Part 2: A shiny gold bag contains %d total bags" % count)
