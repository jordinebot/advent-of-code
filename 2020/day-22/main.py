from time import time
from copy import deepcopy

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

t0 = time()
winner = crab_combat(deepcopy(player1), deepcopy(player2))
t1 = time()
print("Part 1: The score of the winner is %d (%fms)" % (score(winner), (t1 - t0) * 100))

def hash_round(p1, p2):
    return hash((tuple(p1), tuple(p2)))

def iterative_combat(p1, p2, played):
    while len(p1) > 0 and len(p2) > 0:
        round_hash = hash_round(p1, p2)
        if round_hash in played:
            return (1, p1)
        else:
            played.append(round_hash)

        c1 = p1.pop(0)
        c2 = p2.pop(0)

        if len(p1) >= c1 and len(p2) >= c2:
            subgame_winner, _winning_deck = iterative_combat(p1[0:c1], p2[0:c2], [])
            if subgame_winner == 1:
                p1.extend([c1, c2])
            else:
                p2.extend([c2, c1])
        elif c1 > c2:
            p1.extend([c1, c2])
        else:
            p2.extend([c2, c1])

    if len(p1) == 0:
        return (2, p2)
    else:
        return (1, p1)


t0 = time()
player, deck = iterative_combat(deepcopy(player1), deepcopy(player2), [])
t1 = time()
print("Part 2: The score of the winner is %d (%fms)" % (score(deck), (t1 - t0) * 100))

