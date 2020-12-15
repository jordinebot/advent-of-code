import time as T
input = [1,0,16,5,17,4]

def spoken(seq, n):
    mem = { x: i + 1 for i, x in enumerate(seq) }
    spoken = seq[-1]
    for t in range(len(seq) + 1, n + 1):
        last_spoken = spoken
        spoken = 0 if not last_spoken in mem else t - 1 - mem[last_spoken]
        mem[last_spoken] = t - 1
        seq.append(spoken)
    return seq[n - 1]


t0 = T.time()
spoken_2020 = spoken(input, 2020)
t1 = T.time()
print("Part 1: The 2020th number spoken will be %d (%fms)" % (spoken_2020, (t1 - t0) * 1000))

t0 = T.time()
spoken_30M = spoken(input, 30000000)
t1 = T.time()
print("Part 2: The 30000000th number spoken will be %d (%fms)" % (spoken_30M, (t1 - t0) * 1000))

