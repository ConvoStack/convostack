import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './slice';

const store = configureStore({
  reducer: {
    conversation: conversationReducer,
  },
});

export default store;
