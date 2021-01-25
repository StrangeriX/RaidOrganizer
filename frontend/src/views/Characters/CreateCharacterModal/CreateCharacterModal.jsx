import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Modals from '../../../components/common/Modal/Modals';

const CreateCharacterModal = ({ onCreateCharacter }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState({
    name: '',
    position: '1',
  });

  const onChange = (e) => {
    setState((previousState) => ({ ...previousState, [e.target.name]: e.target.value }));
  };
  const handleCreateCharacter = () => {
    onCreateCharacter(state);
  };

  return (
    <div>
      <button type="button" className="btn btn-info" onClick={handleShow} title="create">
        Create Character
      </button>
      <Modals show={show} handleClose={handleClose} onSubmit={handleCreateCharacter}>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" name="name" onChange={onChange} />
          </div>
          <div className="form-group">
            <label>Position</label>
            <select className="form-control" name="position" onChange={onChange}>
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
export default CreateCharacterModal;
