import React, { memo, useState } from 'react';
import Modals from '../../../components/common/Modal/Modals';

const ChangePasswordModal = ({ onPasswordChange }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState({
    new_password: '',
  });

  const onChange = (e) => {
    setState((previousState) => ({ ...previousState, [e.target.name]: e.target.value }));
  };
  const handleChangePassword = () => {
    onPasswordChange(state);
  };
  return (
    <div>
      <button type="button" className="btn btn-info" onClick={handleShow}>
        Change Password
      </button>
      <Modals
        title="Update character"
        show={show}
        handleClose={handleClose}
        onSubmit={handleChangePassword}
      >
        <form>
          <div className="form-group">
            <label>New password</label>
            <input type="text" className="form-control" name="name" onChange={onChange} />
          </div>
        </form>
      </Modals>
    </div>
  );
};
export default memo(ChangePasswordModal);
