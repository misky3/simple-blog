import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type {User} from '@supabase/supabase-js';

interface AuthState{
    user: User | null;
}

const initialState: AuthState ={
    user:null,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser(state, action: PayloadAction<User |null>){
            state.user = action.payload;
        },
        logout(state){
            state.user = null;
        },
    },
});

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;