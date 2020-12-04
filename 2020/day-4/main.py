import re

f = open("input", "rt")
passports = f.read().split("\n\n")

def split_field(field):
	key, value = field.split(":")
	return (key, value)


def normalize_passport(passport):
	return dict(map(split_field, passport.replace("\n", " ").strip().split(" ")))


def has_required_fields(passport, required_fields):
	for required in required_fields:
		if not required in passport:
			return False
	return True


required_fields = [ "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid" ]
passports = list(map(normalize_passport, passports))
valid_passports = [passport for passport in passports if has_required_fields(passport, required_fields)]

print("Part 1: There are %d valid passports out of %d" % (len(valid_passports), len(passports)))
