import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Button, FormRow, Alert, FormRowSelect } from "../../components";
import {
  displayAlert,
  clearAlert,
  
} from "../../features/user/userSlice";
import { handleChange, CreateJob,EditJob } from "../../features/Job/JobSlice";
const AddJob = () => {
  const {
    isLoading,
    isEditing,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    editJobId,
  } = useSelector((store) => store.Job);

  const { showAlert} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const inputhandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      dispatch(displayAlert());
      return;
    }
     if (isEditing) {
       dispatch(
         EditJob({
           jobId: editJobId,
           job: { position, company, jobLocation, jobType, status },
         })
       );
       return;
     }
    dispatch(CreateJob({ position, company, jobLocation, status, jobType }));
  };
  setTimeout(() => {
    dispatch(clearAlert());
  }, 3000);
  return (
    <Wrapper>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            name="position"
            labelText="Position"
            className="form-input"
            labelClass="form-label"
            handleChange={inputhandler}
            value={position}
          />
          <FormRow
            name="company"
            labelText="company"
            className="form-input"
            labelClass="form-label"
            handleChange={inputhandler}
            value={company}
          />
          <FormRow
            name="jobLocation"
            labelText="job Location"
            className="form-input"
            labelClass="form-label"
            handleChange={inputhandler}
            value={jobLocation}
          />
          <FormRowSelect
            name="status"
            value={status}
            handleChange={inputhandler}
            list={statusOptions}
            labelText="status"
            labelClass="form-label"
          />
          <FormRowSelect
            name="status"
            value={status}
            handleChange={inputhandler}
            list={jobTypeOptions}
            labelText="job Type"
            labelClass="form-label"
          />
          {/* <FormRow
            name="job Type"
            labelText="jobType"
            className="form-input"
            labelClass="form-label"
            handleChange={inputhandler}
            value={status}
          /> */}
          <div className="btn-container">
            <Button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
              handleChange={submitHandler}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
