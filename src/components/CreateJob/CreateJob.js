import React, { Fragment, useState, useEffect } from "react";
import { FormControl, OutlinedInput, InputLabel, Button, Box , MenuItem, Select} from "@mui/material";
import axios from 'axios'
import './CreateJob.scss';

const CreateProduct = ({ handleShowForm }) => {

  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [property_id, setProperty] = useState('');
  const [validationError, setValidationError] = useState({})
  const [properties, setProperties] = useState({});

  useEffect(()=>{
    fetchProperties();
  },[])

  const fetchProperties = async () => {
    await axios.get(`http://localhost:4000/api/properties`).then(({data})=>{
      setProperties(data);
    })
  }

  const createJob = async () => {
    if (!summary || !description || !property_id) {
      setValidationError({error: 'Please fill all mandatory fields.'});
      return;
    }

    const payload = {summary, description, status_id: 1, property_id};

    await axios.post(`http://localhost:4000/api/jobs`, payload).then(({data})=>{
      handleShowForm(true);
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        console.log('ERROR', response.data.message);
      }
    })
  }

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }
  const handlePropertyChange = (event) => {
    setProperty(event.target.value);
  }

  return (
    <Fragment>
      {Object.keys(properties).length > 0 && 
        <Fragment>
          <h2 className="card-header--title font-size-lg font-weight-bold">Adding a Job</h2>
          {
            Object.keys(validationError).length > 0 && (
              <div>
                <ul style={{listStyleType: 'none', color: 'red'}}>
                  {
                    Object.entries(validationError).map(([key, value])=>(
                      <li key={key}>{value}</li>   
                    ))
                  }
                </ul>
              </div>
            )
          }
          <Box className="form-container form-container__jobs-form" component="form" sx={{'& .MuiTextField-root': { m: 1},}} noValidate autoComplete="off" style={{flexDirection: 'column'}}>
            <FormControl id="job-summary" className='form-container__job-summary-input' required>
              <InputLabel htmlFor="job-summary">Summary</InputLabel>
              <OutlinedInput style={{marginBottom: '10px'}} id="job-summary-input" name="summary" value={summary} onChange={handleSummaryChange} label="Job Summary"/>
            </FormControl>

            <FormControl id="job-description" className='form-container__job-description-input' required>
              <InputLabel htmlFor="job-description">Description</InputLabel>
              <OutlinedInput style={{marginBottom: '10px'}} id="job-description-input" name="description" value={description} onChange={handleDescriptionChange} label="Job Description"/>
            </FormControl>

            <FormControl className='form-container__job-property-input'>
              <InputLabel id="property-select-label">Property</InputLabel>
              <Select
                labelId="property-select-label"
                id="property-select"
                value={property_id}
                label="Property"
                onChange={handlePropertyChange}
              >
                {properties?.map((item, key) => {
                  return <MenuItem key={key} value={item.id}>{item.name}</MenuItem>;
                })}
              </Select>
            </FormControl>

          </Box>
          <div style={{marginBottom: '10px'}}> 
            <Button className="add-job-buttons add-job-buttons__cancel" onClick={() => handleShowForm()}>Cancel</Button>
            <Button className="add-job-buttons add-job-buttons__submit" onClick={() => createJob()}>Save</Button>
          </div>
        </Fragment>
      }
    </Fragment>
  )
}

export default CreateProduct;