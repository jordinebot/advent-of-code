import List, { ListNode } from '../list';

describe('List', () => {
	function getList(length = 0) {
		return !length
			? new List()
			: List.fromArray(
					Array(length)
						.fill(0)
						.map((_, index) => index)
			  );
	}

	describe('Construction', () => {
		it('should provide an instance of List', () => {
			const list = new List();
			expect(list instanceof List).toBeTruthy();
		});

		it('should create an empty List', () => {
			const list = new List();
			expect(list.head).toBe(null);
		});

		it('should create a List with a ListNode', () => {
			const data = { key: 'value' };
			const list = new List(data);
			expect(list.head).toEqual(new ListNode(data));
		});

		it('should be able to create a List from an Array', () => {
			const array = [1, 2, 3];
			const list = List.fromArray(array);
			expect(list).toEqual({
				head: { data: 1, next: { data: 2, next: { data: 3, next: null } } }
			});
		});

		it('should create an empty List from an empty Array', () => {
			expect(List.fromArray([])).toEqual(new List());
		});

		it('should be able to handle null data', () => {
			expect(new List(null)).toEqual({ head: { data: null, next: null } });
			expect(new List(null).length).toBe(1);
		});
	});

	describe('Getters', () => {
		describe('length', () => {
			it('should return 0 for empty List', () => {
				expect(new List().length).toBe(0);
				expect(List.fromArray([]).length).toBe(0);
			});

			it('should return 1 for Lists with 1 node', () => {
				expect(new List('abc').length).toBe(1);
				expect(List.fromArray(['abc']).length).toBe(1);
			});

			it('should return N for Lists of N nodes', () => {
				const N = 10;
				expect(getList(N).length).toBe(N);
			});
		});
	});

	describe('Methods', () => {
		describe('clone()', () => {
			it('should return a new instance that is a shallow copy of List', () => {
				expect(getList(7).clone()).toEqual(getList(7).clone());
				expect(getList(13).clone()).not.toBe(getList(13).clone());
			});
		});

		describe('toArray()', () => {
			it('should return an empty Array for an empty List', () => {
				expect(new List().toArray()).toEqual([]);
			});

			it('should return an array with the data of all nodes', () => {
				const array = [1, 2, 3];
				expect(List.fromArray(array).toArray()).toEqual(array);
			});
		});

		describe('slice()', () => {
			it('should return a shallow copy of a portion of an List into a new List', () => {
				const N = 10;
				const array = Array(N)
					.fill(0)
					.map((_, i) => i);
				const list = getList(N);
				expect(list.slice(3)).toEqual(List.fromArray(array.slice(3)));
				expect(list.slice(4, 7)).toEqual(List.fromArray(array.slice(4, 7)));
			});
		});

		describe('toString()', () => {
			it('should return an empty string for an empty List', () => {
				expect(new List().toString()).toBe('');
			});
			it('should return all nodes joined as a string with the given glue', () => {
				expect(getList(3).toString()).toBe('012');
				expect(getList(5).toString('-')).toBe('0-1-2-3-4');
			});
		});

		describe('prepend()', () => {
			it('should set an element to the head for an empty List', () => {
				const list = new List();
				list.prepend(42);
				expect(list.length).toBe(1);
				expect(list.head.data).toBe(42);
			});

			it('should add an element at the head without breaking the list', () => {
				expect(getList(4).prepend(42).toArray()).toEqual([42, 0, 1, 2, 3]);
			});

			it('should be chainable', () => {
				const list = new List();
				list.prepend('a');
				list.prepend('b');
				expect(list).toEqual(new List().prepend('a').prepend('b'));
			});
		});

		describe('append()', () => {
			it('should set an element to the head for an empty List', () => {
				const list = new List();
				list.append(42);
				expect(list.length).toBe(1);
				expect(list.head.data).toBe(42);
			});

			it('should add a node to the last position of the list', () => {
				const list = getList(2);
				list.append(42);
				expect(list.toArray()).toEqual([0, 1, 42]);
			});

			it('should be chainable', () => {
				const list = new List();
				list.append('a');
				list.append('b');
				expect(list).toEqual(new List().append('a').append('b'));
			});
		});

		describe('at()', () => {
			it('should return the value of the node at the given position', () => {
				const array = [0, 1, 2, 3, 4, 5, 6];
				const list = List.fromArray(array);
				array.forEach((_, index) => expect(list.at(index)).toBe(index));
			});

			it('should return `undefined` if there is no data at a given index', () => {
				expect(getList(10).at(11)).not.toBeDefined();
				expect(getList(10).at(-1)).not.toBeDefined();
			});
		});

		describe('insertAt()', () => {
			it('should allow inserting at the head of the List', () => {
				const list = getList(3);
				expect(list.insertAt(0, 'here').toArray()).toEqual(['here', 0, 1, 2]);
			});

			it('should insert a new node at a given index without breaking the List', () => {
				const list = getList(5);
				expect(list.insertAt(3, 'here').toArray()).toEqual([0, 1, 2, 'here', 3, 4]);
			});

			it('should start counting by the end for negative index', () => {
				const list = getList(3);
				expect(list.insertAt(-1, 'here').toArray()).toEqual([0, 1, 'here', 2]);
			});

			describe('when index overflows length', () => {
				it('case 1', () => {
					expect(new List().insertAt(2, 'here').toArray()).toEqual([null, null, 'here']);
				});

				it('case 2', () => {
					expect(new List().insertAt(-3, 'here').toArray()).toEqual([
						'here',
						null,
						null,
						null
					]);
				});

				it('case 3', () => {
					expect(List.fromArray([0, 1]).insertAt(-1, 'here').toArray()).toEqual([
						0,
						'here',
						1
					]);
				});

				it('case 4', () => {
					expect(List.fromArray([0, 1]).insertAt(-2, 'here').toArray()).toEqual([
						'here',
						0,
						1
					]);
				});

				it('case 5', () => {
					expect(List.fromArray([0, 1]).insertAt(-3, 'here').toArray()).toEqual([
						'here',
						null,
						0,
						1
					]);
				});

				it('case 6', () => {
					expect(new List(0).insertAt(5, 'here').toArray()).toEqual([
						0,
						null,
						null,
						null,
						null,
						'here'
					]);
				});
			});
		});
	});
});
