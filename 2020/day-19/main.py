import re
f = open('./input', 'rt')
rules, strings = f.read().replace('"', '').strip().split('\n\n')

rules = rules.splitlines()
strings = strings.splitlines()

loops = {
	'8': '( 42 + )',
	'11': '( 42 31 | 42 {2} 31 {2} | 42 {3} 31 {3} | 42 {4} 31 {4} | 42 {5} 31 {5} | 42 {6} 42 {6} )'
}

data = {}
repl = {}
for rule in rules:
	index, pattern = rule.split(': ')
	if pattern in 'ab':
		repl[index] = pattern
	else:
		data[index] = pattern if not '|' in pattern else f"( {pattern} )"


for key, pattern in loops.items():
	data[key] = pattern


def is_replaceable(pattern):
	valid = set(['a', 'b', '|', '(', ')', '+'])
	valid.update(repl.keys())
	pattern = re.sub(r'\{\d\}', '', pattern)
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
