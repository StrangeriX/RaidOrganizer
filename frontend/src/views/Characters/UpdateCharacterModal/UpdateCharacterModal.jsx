import React, { memo, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Modals from '../../../components/common/Modal/Modals';

const UpdateCharacterModal = ({ onUpdateCharacter, variables }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState({
    name: variables.name,
    position: '1',
  });

  const onChange = (e) => {
    setState((previousState) => ({ ...previousState, [e.target.name]: e.target.value }));
  };
  const handleUpdateCharacter = () => {
    onUpdateCharacter(state);
  };
  return (
    <div>
      <button type="button" className="btn btn-info" onClick={handleShow}>
        Update
      </button>
      <Modals
        title="Update character"
        show={show}
        handleClose={handleClose}
        onSubmit={handleUpdateCharacter}
      >
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={onChange}
              value={state.name}
            />
          </div>
          <div className="form-group">
            <label>Position</label>
            <select
              className="form-control"
              id="position"
              name="position"
              onChange={onChange}
              value={state.position}
            >
              <option value="1">Damage Dealer</option>
              <option value="2">Tank</option>
              <option value="3">Healer</option>
            </select>
          </div>
        </form>
      </Modals>
    </div>
  );
};
export default memo(UpdateCharacterModal);
