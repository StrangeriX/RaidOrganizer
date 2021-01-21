import React, { useState } from 'react';
import Modals from '../../../../components/common/Modal/Modals';

const UpdateRaidModal = ({ onCreateRaid, raidName }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState({
    name: raidName,
    damage_slots: '',
    tank_slots: '',
    healer_slots: '',
  });

  const onChange = (e) => {
    setState((previousState) => ({ ...previousState, [e.target.name]: e.target.value }));
  };
  const handleCreateRaid = () => {
    onCreateRaid(state);
  };

  return (
    <div>
      <button type="button" className="btn btn-info" onClick={handleShow} title="create">
        Create new Raid
      </button>
      <Modals show={show} handleClose={handleClose} onSubmit={handleCreateRaid}>
        <form>
          <label>Name</label>
          <input type="text" className="form-control" name="name" onChange={onChange} />
          <label>Damage Dealers slots</label>
          <input
            type="number"
            className="form-control"
            name="damage_slots"
            min="0"
            onChange={onChange}
          />
          <label>Tanks slots</label>
          <input
            type="number"
            className="form-control"
            name="tank_slots"
            min="0"
            onChange={onChange}
          />
          <label>Healers slots</label>
          <input
            type="number"
            className="form-control"
            name="healer_slots"
            min="0"
            onChange={onChange}
          />
        </form>
      </Modals>
    </div>
  );
};
export default UpdateRaidModal;
