import { combineReducers } from 'redux';

// Reducers
import { commonReducer } from './reducers/commonReducer';
import { subjectReducer } from './reducers/subjectReducer';
import { competitionReducer } from './reducers/competitionReducer';
import { skillReducer } from './reducers/skillReducer';
import { workshopReducer } from './reducers/workshopReducer';
import { userReducer } from './reducers/userReducer';
import { tutorReducer } from './reducers/tutorReducer';
import { registrationReducer } from './reducers/registrationReducer';
import { chatReducer } from './reducers/chatReducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['subjectsData'],
};

const rootReducer = combineReducers({
	subjectsData: subjectReducer,
	commonData: commonReducer,
	competitionsData: competitionReducer,
	skillsData: skillReducer,
	workshopsData: workshopReducer,
	usersData: userReducer,
	tutorsData: tutorReducer,
	registrationsData: registrationReducer,
	chatsData: chatReducer,
});

export default persistReducer(persistConfig, rootReducer);
