import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../Utils/axios";
const result = localStorage.getItem("user") || "";
const user = result ? JSON.parse(result) : "";
const initialState = {
  isEditing: false,
  isLoading: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: user.location || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  showAlert: false,
  alertText: "",
  alertType: "",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
};

export const CreateJob = createAsyncThunk(
  "user/Job",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/jobs", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const GetAllJob = createAsyncThunk("user/Jobs", async (_, thunkAPI) => {
  let {search, searchStatus, searchType, sort } = thunkAPI.getState().Stats;
  let { page } = thunkAPI.getState().Job;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if(search){
      url = url + `&search=${search}`;
    }
  try {
    const resp = await customFetch(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});
export const DeleteJob = createAsyncThunk(
  "user/deleteJobs",
  async (jobId, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`);
      thunkAPI.dispatch(GetAllJob());
      return resp.data.msg;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const EditJob = createAsyncThunk(
  "EditJob",
  async ({ jobId, job }, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/jobs/${jobId}`, job);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
const JobSlice = createSlice({
  name: "Job",
  initialState,
  reducers: {
    displayAlert: (state) => {
      state.showAlert = true;
      state.alertText = "Please enter all the values";
      state.alertType = "danger";
    },
    clearAlert: (state) => {
      state.showAlert = false;
      state.alertText = "";
      state.alertType = "";
    },
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
    changePage:(state,{payload})=>{
      state.page=payload
    },
  },
  extraReducers: {
    [CreateJob.pending]: (state) => {
      state.isLoading = true;
    },
    [CreateJob.fulfilled]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = "Job Created successfully";
      state.alertType = "success";
    },
    [CreateJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.alertText = payload;
      state.alertType = "danger";
    },
    [GetAllJob.pending]: (state) => {
      state.isLoading = true;
    },
    [GetAllJob.fulfilled]: (state, { payload }) => {
      const { jobs, numOfPages, totalJobs } = payload;

      state.isLoading = false;
      state.jobs = jobs;
      state.numOfPages = numOfPages;
      state.totalJobs = totalJobs;
    },
    [GetAllJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.alertText = payload;
      state.alertType = "danger";
    },
    [DeleteJob.fulfilled]: (state, { payload }) => {
      console.log("delete payload", payload);
      state.isLoading = false;
      state.alertText = "job deleted successfully";
    },
    [DeleteJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.alertText = "some error";
    },
    [EditJob.pending]: (state) => {
      state.isLoading = true;
    },
    [EditJob.fulfilled]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = "successfully updated ";
      state.alertType = "success";
    },
    [EditJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = "some error";
      state.alertType = "danger";
    },
  },
});
export const {
         displayAlert,
         clearAlert,
         handleChange,
         setEditJob,
         deleteJob,
         ShowLoading,
         hideLoading,
         changePage,
       } = JobSlice.actions;
export default JobSlice.reducer;
