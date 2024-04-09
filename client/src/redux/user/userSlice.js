import {createSlice} from '@reduxjs/toolkit';
const initialState={
    currentUser:null,
    error:false,
    loading:false,
};
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signStart:(state)=>{
            state.loading=true;
        },
        signSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.currentUser=action.payload;
        },
        signFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            
        }
    }
});
export const{signStart,signSuccess,signFail}=userSlice.actions;
export default userSlice.reducer;