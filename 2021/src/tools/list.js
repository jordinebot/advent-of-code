export class ListNode {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class List {
	constructor(head = undefined) {
		this.head = head !== undefined ? new ListNode(head) : null;
	}

	static fromArray(array) {
		const instance = new List();
		for (const item of array) {
			instance.append(item);
		}
		return instance;
	}

	get length() {
		let current = this.head;
		let count = current ? 1 : 0;
		while (current !== null && current.next !== null) {
			count++;
			current = current.next;
		}
		return count;
	}

	clone() {
		const instance = new List();
		let current = this.head;
		while (current !== null) {
			instance.append(current.data);
			current = current.next;
		}
		return instance;
	}

	toArray() {
		let current = this.head;
		const data = [];
		while (current) {
			data.push(current.data);
			current = current.next;
		}
		return data;
	}

	slice(start, end) {
		return List.fromArray(this.toArray().slice(start, end));
	}

	toString(glue = '') {
		return this.toArray().join(glue);
	}

	prepend(data) {
		const node = new ListNode(data);
		node.next = this.head;
		this.head = node;
		return this;
	}

	append(data) {
		const node = new ListNode(data);
		if (this.head === null) {
			this.head = node;
		} else {
			let current = this.head;
			while (current.next !== null) {
				current = current.next;
			}
			current.next = node;
		}
		return this;
	}

	at(index) {
		if (index < 0) {
			return undefined;
		}

		let current = this.head;
		while (index-- > 0 && current !== null) current = current.next;
		return current?.data ?? undefined;
	}

	insertAt(index, data) {
		const node = new ListNode(data);
		if (index < 0 && Math.abs(index) < this.length) {
			let current = this.head;
			let i = 0;
			while (current.next !== null && i < this.length + index - 1) {
				current = current.next;
				i++;
			}
			node.next = current.next;
			current.next = node;
		} else if (index < 0 && Math.abs(index) >= this.length) {
			this.prepend(data);
			let nulls = Math.abs(index + this.length - 1);
			while (nulls-- > 0) {
				this.insertAt(1, null);
			}
		} else if (index === 0) {
			this.prepend(data);
		} else if (index > 0 && index < this.length) {
			let current = this.head;
			let i = 0;
			while (current.next !== null && i < index - 1) {
				current = current.next;
				i++;
			}
			node.next = current.next;
			current.next = node;
		} else {
			let nulls = index - this.length;
			while (nulls-- > 0) {
				this.append(null);
			}
			this.append(data);
		}
		return this;
	}
}

export default List;
