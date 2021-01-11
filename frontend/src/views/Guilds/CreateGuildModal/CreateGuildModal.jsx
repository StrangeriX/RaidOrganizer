import React, { useState } from 'react';
import Modals from '../../../components/common/Modal/Modals';

const CreateGuildModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState({
    name: '',
    user: '',
  });

  const onChange = (e) => {
    setState((previousState) => ({ ...previousState, [e.target.name]: e.target.value }));
    console.log(state);
  };

  const onSubmit = (e) => {
    const username = localStorage.getItem('username');
    setState((previousState) => ({ ...previousState, user: username }));
    const { name, user } = state;
    fetch('http://127.0.0.1:8000/api/guild/create', {
      method: 'POST',
      body: JSON.stringify({ guild_name: name, user_name: user }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log();
        return response.json();
      })
      .then((json) => {
        console.log(json);
      });
  };
  return (
    <div>
      <button type="button" className="btn btn-info" onClick={handleShow}>
        Create Guild
      </button>
      <Modals title="Create Guild" show={show} handleClose={handleClose} onSubmit={onSubmit}>
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
