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


def check_byr(value):
	if not re.match("^\d{4}$", value):
		return False
	return 1920 <= int(value) <= 2002


def check_iyr(value):
	if not re.match("^\d{4}$", value):
		return False
	return 2010 <= int(value) <= 2020


def check_eyr(value):
	if not re.match("^\d{4}$", value):
		return False
	return 2020 <= int(value) <= 2030


def check_hgt(value):
	if re.match("^\d+in$", value):
		height = re.findall("^(\d+)in$", value)[0]
		return 59 <= int(height) <= 76
	elif re.match("^\d+cm$", value):
		height = re.findall("^(\d+)cm$", value)[0]
		return 150 <= int(height) <= 193
	else:
		return False


def check_hcl(value):
	return re.match("^#[a-f0-9]{6}$", value) != None


def check_ecl(value):
	return value in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]


def check_pid(value):
	return re.match("^\d{9}$", value)


def is_valid_passport(passport, required_fields):
	if not has_required_fields(passport, required_fields):
		return False
	else:
		validations = {
			"byr": check_byr,
			"iyr": check_iyr,
			"eyr": check_eyr,
			"hgt": check_hgt,
			"hcl": check_hcl,
			"ecl": check_ecl,
			"pid": check_pid,
		}
		for key in passport.keys():
			if key in validations:
				is_valid_key = validations[key](passport[key])
				if not is_valid_key:
					return False
		return True


required_fields = [ "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid" ]
passports = list(map(normalize_passport, passports))

valid_passports = [passport for passport in passports if has_required_fields(passport, required_fields)]
print("Part 1: There are %d valid passports out of %d" % (len(valid_passports), len(passports)))

valid_passports = [passport for passport in passports if is_valid_passport(passport, required_fields)]
print("Part 2: There are %d valid passports out of %d" % (len(valid_passports), len(passports)))
