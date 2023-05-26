import {configureStore} from "@reduxjs/toolkit"
import applicantSlice from "./applicantSlice"
import updateApplicantSlice from "./updateApplicantSlice"
import adminListSlice from "./adminListSlice"
const store=configureStore({
    reducer:{
        applicantList:applicantSlice,
        singleApplicant:updateApplicantSlice,
        adminList:adminListSlice
    }
})
export default store
