import React from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { withRouter } from 'react-router-dom';

const GoBack = ({ history }) => (
  <button type="button" className="btn btn-info" onClick={() => history.goBack()} alt="Go back">
    <TiArrowBack />
    Back
  </button>
);

export default withRouter(GoBack);
