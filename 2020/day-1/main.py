'''
Part 1: Find the two entries that sum to 2020 and then multiply those two numbers together
Part 2: What is the product of the three entries that sum to 2020?
'''

f = open("input", "rt")
data = list(f)

def product_of_two():
	for i in data:
		for j in data:
			if int(i) + int(j) == 2020:
				return int(i) * int(j)

def product_of_three():
	for i in data:
		for j in data:
			for k in data:
				if int(i) + int(j) + int(k) == 2020:
					return int(i) * int(j) * int(k)



print(product_of_two())

print(product_of_three())
