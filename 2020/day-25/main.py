card_pub = 13233401
door_pub = 6552760

def get_loop_size(pub_key):
	x = 1
	subject = 7
	loop_size = 0
	while x != pub_key:
		x = x * subject
		x = x % 20201227
		loop_size += 1
	return loop_size

def transform(subject, loop_size):
	x = 1
	for i in range(loop_size):
		x = x * subject
		x = x % 20201227
	return x

card_loop_size = get_loop_size(card_pub)
encription_key = transform(door_pub, card_loop_size)
print('Part 1: Encription key is', encription_key)
