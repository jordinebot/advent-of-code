from copy import deepcopy

f = open('./test', 'rt')
player1, player2 = [p.splitlines()[1:] for p in f.read().strip().split('\n\n')]

player1 = [*map(lambda x: int(x), player1)]
player2 = [*map(lambda x: int(x), player2)]

def crab_combat(p1, p2):
	if len(p1) == 0:
		return p2
	if len(p2) == 0:
		return p1

	c1 = p1.pop(0)
	c2 = p2.pop(0)

	if c1 > c2:
		p1.extend([c1, c2])
	else:
		p2.extend([c2, c1])
	return crab_combat(p1, p2)

def score(deck):
	return sum([(len(deck) - i) * deck[i] for i in range(len(deck))])

winner = crab_combat(deepcopy(player1), deepcopy(player2))
print("Part 1: The score of the winner is", score(winner))


def recursive_combat(p1, p2, played):
	if (p1, p2) in played:
		return (1, p1) # Player 1 wins due to repeated hands
	else:
		played.append((p1, p2))

	if len(p1) == 0:
		return (2, p2)
	if len(p2) == 0:
		return (1, p1)

	c1 = p1.pop(0)
	c2 = p2.pop(0)
	if len(p1) >= c1 and len(p2) >= c2:
		subgame_winner, _winning_deck = recursive_combat(deepcopy(p1), deepcopy(p2), [])
		if subgame_winner == 1:
			p1.extend([c1, c2])
		else:
			p2.extend([c2, c1])
	elif c1 > c2:
		p1.extend([c1, c2])
	else:
		p2.extend([c2, c1])

	return recursive_combat(p1, p2, played)

player, winner = recursive_combat(deepcopy(player1), deepcopy(player2), [])
print("Part 2: The score of the winner is", score(winner))
