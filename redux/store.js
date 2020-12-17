import { applyMiddleware, createStore } from 'redux';
import thunk from'redux-thunk';
import rootReducer from './reducer/root.reducer';
import { persistReducer, persistStore} from 'redux-persist';
import {AsyncStorage} from 'react-native';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage  
};

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = createStore(rootReducer, applyMiddleware(thunk));
// export const persistor = persistStore(store);