'''
Part 1: Find the two entries that sum to 2020 and then multiply those two numbers together
Part 2: What is the product of the three entries that sum to 2020?
'''
import time

f = open("input", "rt")
data = list(f)

def product_of_two():
	for x in data:
		for y in data:
			if int(x) + int(y) == 2020:
				return int(x) * int(y)

def product_of_three():
	for x in data:
		for y in data:
			for z in data:
				if int(x) + int(y) + int(z) == 2020:
					return int(x) * int(y) * int(z)

t1 = time.time()
part1 = product_of_two()
t2 = time.time()
print("Part 1: %d calculated in %fs" % (part1, t2 - t1))

t1 = time.time()
part2 = product_of_three()
t2 = time.time()
print("Part 2: %d calculated in %fs" % (part2, t2 - t1))

