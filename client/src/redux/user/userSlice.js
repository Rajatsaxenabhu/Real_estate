import {createSlice} from '@reduxjs/toolkit';
const initialState={
    currentUser:null,
    error:null,
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
        },
        updateuserstart:(state)=>{
            state.loading=true;
        },
        updateusersuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateuserfail:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        deleteuserstart:(state)=>{
            state.loading=true;
        },
        deleteusersuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        deleteuserfail:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
          },
          signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
          },
          signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
    },
});
export const{signStart,
    signSuccess,
    signFail,
    updateuserfail,
    updateuserstart,
    updateusersuccess,
    deleteuserfail,
    deleteuserstart,
    deleteusersuccess,
    signOutUserFailure,
    signOutUserSuccess,
    signOutUserStart,}=userSlice.actions;
export default userSlice.reducer;