'''
For example, suppose you have the following list:

1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc

Each line gives the password policy_parser and then the password. The password policy_parser
indicates the lowest and highest number of times a given letter must appear for
the password to be valid. For example, 1-3 a means that the password must
contain a at least 1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password, cdefg, is
not; it contains no instances of b, but needs at least 1. The first and third
passwords are valid: they contain one a or nine c, both within the limits of
their respective policies.

How many passwords are valid according to their policies?
'''

import re
import time

f = open("input", "rt")
data = list(f)

def get_db_entry(sample):
	policy_parser = re.compile("(\d+)-(\d+) ([a-z]): ([a-z]+)")
	return policy_parser.findall(sample)[0]

def is_valid_password(entry):
	min, max, char, password = entry
	rule = re.compile(f"[^{char}]")
	only_valid_chars = rule.sub("", password)
	return int(min) <= len(only_valid_chars) <= int(max)


def count_valid_passwords(data):
	valid = 0
	for sample in data:
		entry = get_db_entry(sample)
		if (is_valid_password(entry)):
			valid += 1
	return valid

t0 = time.time()
valid_passwords = count_valid_passwords(data)
t1 = time.time()
print("Part 1: Finding %d valid passwords out of %d took %fms" % (valid_passwords, len(data), (t1 - t0) * 1000))

