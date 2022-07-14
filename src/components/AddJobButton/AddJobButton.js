import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import './AddJobButton.scss';

const AddJobButton = ({ handleShowForm }) => {

  return (
    <Fragment>
      <div className='buttons-container'>
        <div>
        </div>
        <div>
        <Button className="add-job-button" onClick={() => handleShowForm()}>
          <b>Add Job</b>
        </Button>
        </div>
      </div>
    </Fragment>
  )
};

export default AddJobButton;
