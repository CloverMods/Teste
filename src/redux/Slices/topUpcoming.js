import { createSlice } from "@reduxjs/toolkit";
import { apiCallStart } from "../middleware/apiActions";

const topupcomingSlice = createSlice({
    name:"topUpcoming",
    initialState:{
        data:[],
        loading:false,
    },
    reducers:{
        dataRequested:(state)=>{
            state.loading = true;
        },

        dataReceived:(state,action)=>{
            state.data=action.payload
            state.loading = false;
        },

        dataRequestFailed:(state)=>{
            state.loading = false;  
        },
        
        
    }
});

export default topupcomingSlice.reducer;

const {dataRequested,dataReceived,dataRequestFailed} = topupcomingSlice.actions;


export const fetchTopUpcoming = (status) => (dispatch) =>{
    const baseURL= "https://api.aniapi.com";
    const url=`/v1/anime?status=${status}`
    return dispatch(
        apiCallStart({
            baseURL,
            url,
            onStart:dataRequested.type,
            onSuccess:dataReceived.type,
            onError:dataRequestFailed.type,
        })

    );
}
