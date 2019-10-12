const initialState = {
	avatar: require('../../images/ic_tag_faces.png')
};

const avatarReducer = (state = initialState, action) => {
	let nextState;
	switch (action.type) {
		case 'SET_AVATAR':
			nextState = {
				...state,
				avatar: action.value
			};
			return nextState || state;
		default:
			return state;
	}
};

export default avatarReducer;