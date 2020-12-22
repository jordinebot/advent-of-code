f = open('./input', 'rt')
player1, player2 = [p.splitlines()[1:] for p in f.read().strip().split('\n\n')]

player1 = [*map(lambda x: int(x), player1)]
player2 = [*map(lambda x: int(x), player2)]

def play(p1, p2):
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
	return play(p1, p2)

def score(deck):
	return sum([(len(deck) - i) * deck[i] for i in range(len(deck))])

winner = play(player1, player2)
print("Part 1: The score of the winner is", score(winner))

