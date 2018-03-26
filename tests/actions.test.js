import * as actions from '../frontend/actions';
import * as types from '../frontend/actions/types';

describe('actions', () => {
	it('should something', () => {
		const example = 'something';
		const exampleAction = {
			type: types.UPDATE_SOMETHING,
			example,
		};
		expect(actions.updateExample(example)).toEqual(exampleAction);
	});
});
