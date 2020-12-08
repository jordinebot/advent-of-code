import copy

f = open("input", "rt")
program = [*map(lambda x: x.split(" "), list(f.read().strip().split("\n")))]

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