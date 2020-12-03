import fileinput

TREE = '#'

f = open("input", "rt")
map = f.read().splitlines()

def get_slope_path(map, slope):
    x, y = slope
    size = len(map)
    width = len(map[0])
    path = []

    j = x
    for i in range(y, size, y):
        path.append(map[i][j])
        j += x
        j = j % width
    return path

def count_trees(path):
    return ''.join(path).count(TREE)


slope = (3, 1)
path = get_slope_path(map, slope)
print("Part 1: There are %d trees in slope %s" % (count_trees(path), slope))

slopes = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]
trees = 1
for slope in slopes:
    trees *= count_trees(get_slope_path(map, slope))


print("Part 2: Product of trees in given slopes is %d" % trees)



