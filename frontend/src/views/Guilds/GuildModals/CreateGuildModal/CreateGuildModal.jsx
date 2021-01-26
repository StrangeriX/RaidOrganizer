import React, { useState } from 'react';
import Modals from '../../../../components/common/Modal/Modals';

const CreateGuildModal = ({ onCreateGuild }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const username = localStorage.getItem('username');
  const [state, setState] = useState({
    name: '',
    user: username,
  });

  const onChange = (e) => {
    setState((previousState) => ({ ...previousState, [e.target.name]: e.target.value }));
  };

  const handleCreateGuild = () => {
    onCreateGuild(state);
  };

  return (
    <div>
      <button type="button" className="btn btn-info" onClick={handleShow}>
        Create Guild
      </button>

      <Modals
        title="Create Guild"
        show={show}
        handleClose={handleClose}
        onSubmit={handleCreateGuild}
      >
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" name="name" onChange={onChange} />
          </div>
        </form>
      </Modals>
    </div>
  );
};
export default CreateGuildModal;
