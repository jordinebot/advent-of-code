input = [1,0,16,5,17,4]

def spoken(seq, n):
	while len(seq) <= n:
		prev_spoken = seq[-1]
		if not prev_spoken in seq[:-1]:
			seq.append(0)
		else:
			last_index = len(seq)
			prev_index = len(seq) - 1 - seq[:-1][::-1].index(prev_spoken)
			seq.append(last_index - prev_index)
	return seq[n - 1]

print("Part 1: The 2020th number spoken will be %d" % spoken(input, 2020))
