import axios from "axios";
import { baseUrl } from "../components/baseUl";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
    status: 'idle',
    adminList: [],
    err: ""
}
export const fetchAdminList = createAsyncThunk("adminListSlice", async()=>{
    try {
       const data= await axios.get(`${baseUrl}/admins/list`).then(res=>res.data)
       return data
    } catch (error) {
        console.log(error.message)
    }
})
const adminListSlice = createSlice({ 
    name: "adminListSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAdminList.pending,(state,action)=>{
            state.status="loading"
        }).addCase(fetchAdminList.fulfilled,(state,action)=>{
            state.status="success"
            state.adminList=action.payload
        }).addCase(fetchAdminList.rejected,(state,action)=>{
            state.status="error"
        })
    }
})
export default adminListSlice.reducer