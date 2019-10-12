import { createStore } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import toggleFavorite from './reducers/favoriteReducer';
import setAvatar from './reducers/avatarReducer';

const rootPersistConfig = {
	key: 'root',
	storage: storage
};

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar}));