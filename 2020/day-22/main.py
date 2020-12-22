from copy import deepcopy

import sys
sys.setrecursionlimit(10000)

f = open('./input', 'rt')
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
print("\nPart 1: The score of the winner is", score(winner))


def recursive_combat(p1, p2, played, game, r):
	print('\n-- Round %d (Game %d) --' % (r, game))
	if (p1, p2) in played:
		print('The winner of game %d is player 1 (repeated hands)' % game)
		return (1, p1) # Player 1 wins due to repeated hands

	if r == 1:
		played.append((deepcopy(p1), deepcopy(p2)))

	print('Player 1 deck:', p1)
	print('Player 2 deck:', p2)

	c1 = p1.pop(0)
	c2 = p2.pop(0)

	print('Player 1 plays', c1)
	print('Player 2 plays', c2)

	if len(p1) >= c1 and len(p2) >= c2:
		print('Playing a sub-game to determine the winner...')
		subgame_winner, _winning_deck = recursive_combat(deepcopy(p1), deepcopy(p2), [], game + 1, 1)
		print('\n...anyway, back to game %d' % game)
		if subgame_winner == 1:
			p1.extend([c1, c2])
			print('Player 1 wins round %d of game %d' % (r, game))
		else:
			p2.extend([c2, c1])
			print('Player 2 wins round %d of game %d' % (r, game))
	elif c1 > c2:
		print('Player 1 wins round %d of game %d' % (r, game))
		p1.extend([c1, c2])
	elif c1 < c2:
		print('Player 2 wins round %d of game %d' % (r, game))
		p2.extend([c2, c1])

	if len(p1) == 0:
		print('The winner of game %d is player 2' % game)
		return (2, p2)
	elif len(p2) == 0:
		print('The winner of game %d is player 1' % game)
		return (1, p1)
	else:
		return recursive_combat(p1, p2, played, game, r + 1)

player, deck = recursive_combat(deepcopy(player1), deepcopy(player2), [], 1, 1)
print('\nPlayer %d WINS with deck %s' % (player, deck))
print("\nPart 2: The score of the winner is", score(deck))
