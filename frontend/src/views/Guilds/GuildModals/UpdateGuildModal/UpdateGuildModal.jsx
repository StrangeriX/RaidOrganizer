import React, { useState } from 'react';
import Modals from '../../../../components/common/Modal/Modals';

const UpdateGuildModal = ({ onUpdateGuild, name }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState({
    name,
  });

  const onChange = (e) => {
    setState((previousState) => ({ ...previousState, [e.target.name]: e.target.value }));
  };
  const handleUpdateGuild = () => {
    onUpdateGuild(state);
  };

  return (
    <div>
      <button type="button" className="btn btn-info" onClick={handleShow} title="create">
        Update
      </button>
      <Modals show={show} handleClose={handleClose} onSubmit={handleUpdateGuild}>
        <form>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={state.name}
            onChange={onChange}
          />
        </form>
      </Modals>
    </div>
  );
};
export default UpdateGuildModal;
