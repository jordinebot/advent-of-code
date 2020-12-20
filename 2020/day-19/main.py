import re
f = open('./input', 'rt')
rules, strings = f.read().replace('"', '').strip().split('\n\n')

rules = rules.splitlines()
strings = strings.splitlines()

data = {}
repl = {}
for rule in rules:
	index, pattern = rule.split(': ')
	if pattern in 'ab':
		repl[index] = pattern
	else:
		data[index] = pattern if not '|' in pattern else f"( {pattern} )"

def is_replaceable(pattern):
	valid = set(['a', 'b', '|', '(', ')'])
	valid.update(repl.keys())
	pattern_chars = set(pattern.split())
	return pattern_chars.intersection(valid) == pattern_chars

while len(data) > 0:
	for index, pattern in data.items():
		if is_replaceable(pattern):
			repl[index] = ''.join([repl[p] if p in repl else p for p in pattern.split()])
	for key in repl:
		if key in data:
			del data[key]


pattern = repl['0'].replace(' ', '')
regexp = re.compile(f"^{pattern}$")

matched = [s for s in strings if regexp.search(s)]
print("Part 1: There are %d strings that match the rules out of %d" % (len(matched), len(strings)))
