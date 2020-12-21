from copy import deepcopy
f = open('./input', 'rt')
data = f.read().splitlines()

allergens = {}
menu = {}
ingredients = set()
for line in data:
	dish, info = line.split(' (')
	dish_ingredients = dish.split()
	dish_allergens = info.replace(')', '').replace('contains ', '').split(', ')
	for allergen in dish_allergens:
		if not allergen in allergens:
			allergens[allergen] = set()
		allergens[allergen].update(dish_ingredients)
	menu[dish] = set(dish_allergens)
	ingredients.update(dish_ingredients)


found = {}
original_menu = deepcopy(menu)

while len(found) < len(allergens):
	found_allergen = None
	found_ingredient = None
	for allergen in allergens:
		recipes = [set(recipe.split()) for recipe, recipe_allergens in menu.items() if allergen in recipe_allergens]
		if len(recipes) > 1:
			suspects = recipes[0].intersection(*recipes)
		elif len(recipes) == 1:
			suspects = recipes[0]
		if len(suspects) == 1:
			found_allergen = allergen
			found_ingredient = suspects.pop()
			found[allergen] = found_ingredient

	new_menu = {}
	found_allergens = set(found.keys())
	found_ingredients = set(found.values())
	for recipe, recipe_allergens in menu.items():
		new_recipe = ' '.join([*set(recipe.split()) - found_ingredients])
		new_allergens = recipe_allergens - found_allergens
		new_menu[new_recipe] = new_allergens

	menu = new_menu


safe_ingredients = ingredients - set(found.values())

recipes = original_menu.keys()
counts = {}
for ingredient in safe_ingredients:
	counts[ingredient] = 0
	for recipe in recipes:
		if ingredient in recipe:
			counts[ingredient] += 1

count = sum(counts.values())

print("Part 1: The number of times the safe ingredients appear in recipes is", count)
