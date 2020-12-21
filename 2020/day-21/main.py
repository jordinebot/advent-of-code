from copy import deepcopy
f = open('./input', 'rt')
data = f.read().splitlines()

menu = {}
allergens = set()
ingredients = set()
for line in data:
	dish, info = line.split(' (contains ')

	dish_ingredients = dish.split()
	ingredients.update(dish_ingredients)

	dish_allergens = info.replace(')', '').split(', ')
	allergens.update(dish_allergens)
	menu[dish] = set(dish_allergens)


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
		else:
			suspects = []
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

count = 0
safe_ingredients = ingredients - set(found.values())
for ingredient in safe_ingredients:
	for recipe in original_menu:
		if ingredient in recipe.split():
			count += 1

print("Part 1: The number of times the safe ingredients appear in recipes is", count)
