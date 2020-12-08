import copy

f = open("input", "rt")
program = [*map(lambda x: x.split(" "), list(f.read().strip().split("\n")))]
original = copy.deepcopy(program)

def exe(ins, val, i, acc):
    if ins == "nop":
        i += 1
    elif ins == "jmp":
        i += int(val)
    elif ins == "acc":
        i += 1
        acc += int(val)
    return (i, acc)


def run(program):
    i = 0
    acc = 0
    ran = []
    while not i in ran:
        if i >= len(program):
            return (True, acc)
        else:
            ran.append(i)
            ins, val = program[i]
            i, acc = exe(ins, val, i, acc)
    return (False, acc)

exit, acc = run(program)
print("Part 1: The value of acc before jumping into the second infinite loop iteration is %d" % acc)


def find_next_fork(forked):
    fork = copy.deepcopy(original)
    for i in range(forked[-1] + 1, len(original)):
        ins, val = fork[i]
        if ins == "nop":
            forked.append(i)
            fork[i] = ["jmp", val]
            return fork
        elif ins == "jmp":
            forked.append(i)
            fork[i] = ["nop", val]
            return fork


forked = [0]
exit, acc = run(program)
while not exit:
    program = find_next_fork(forked)
    exit, acc = run(program)

print("Part 2: The value of acc after fixing the program is %d" % acc)


