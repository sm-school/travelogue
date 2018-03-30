import * as actions from '../src/actions';
import * as types from '../src/constants/action-types';

describe('actions', () => {
	it('should something', () => {
		const example = 'something';
		const exampleAction = {
			type: types.UPDATE_ZOOM,
			zoom:example,
		};
		expect(actions.updateZoom(example)).toEqual(exampleAction);
	});
});
