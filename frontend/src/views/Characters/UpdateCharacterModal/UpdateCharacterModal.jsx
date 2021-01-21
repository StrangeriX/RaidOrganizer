import React, { memo, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Modals from '../../../components/common/Modal/Modals';

const UpdateCharacterModal = ({ onCreateCharacter, variables }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState({
    name: variables.name,
    position: variables.position,
  });

  const onChange = (e) => {
    setState((previousState) => ({ ...previousState, [e.target.name]: e.target.value }));
  };
  const handleUpdateCharacter = () => {
    onCreateCharacter(state);
  };

  return (
    <div>
      <button type="button" className="btn btn-info" onClick={handleShow}>
        <IoIosAddCircleOutline />
      </button>
      <Modals
        title="Create Character"
        show={show}
        handleClose={handleClose}
        onSubmit={handleCreateCharacter}
      >
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" name="name" onChange={onChange} />
          </div>
          <div className="form-group">
            <label>Position</label>
            <select className="form-control" id="position" name="position" onChange={onChange}>
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
