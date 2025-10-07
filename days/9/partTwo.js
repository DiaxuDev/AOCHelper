import run from "../../run.js";

run(
	(input) => {
		input = input[0];

		let disk = [];

		let id = 0;
		for (const i in input) {
			const len = parseInt(input[i]);

			if (Number(i) % 2 === 0) {
				disk.push({ id, len });
				id++;
			} else {
				// Id of -1 indicates free space
				disk.push({ id: -1, len });
			}
		}

		const maxId = disk.toSorted((a, b) => b.id - a.id)[0].id;

		for (let id = maxId; id >= 0; id--) {
			const fragment = disk.find(({ id: _id }) => _id === id);
			const fragmentIndex = disk.indexOf(fragment);

			const space = disk.find(
				({ id: _id, len }, i) =>
					_id === -1 && i < fragmentIndex && len >= fragment.len
			);

			if (!space) continue;

			const spaceIndex = disk.indexOf(space);

			if (space.len - fragment.len === 0) {
				disk[fragmentIndex] = { id: -1, len: fragment.len };
				disk[spaceIndex] = fragment;
			} else {
				disk[fragmentIndex] = { id: -1, len: fragment.len };
				disk[spaceIndex] = fragment;
				disk.splice(spaceIndex + 1, 0, {
					id: -1,
					len: space.len - fragment.len,
				});
			}
		}

		let sum = 0;
		let i = 0;

		for (const fragment of disk) {
			if (fragment.id < 0) {
				i += fragment.len;
				continue;
			}

			for (let j = i; j < i + fragment.len; j++) {
				sum += j * fragment.id;
			}

			i += fragment.len;
		}

		return sum;
	},
	9,
	2,
	false
);
