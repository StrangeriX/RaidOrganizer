import React, { memo } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import Request from '../../api/Request';
import Spinner from '../../components/common/Spinner/Spinner';
import CreateCharacterModal from './CreateCharacterModal/CreateCharacterModal';

const CharactersList = ({ characters, refetch }) => {
  const handleDelete = (mutate) => () => {
    mutate().then(() => {
      refetch();
    });
  };
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>
              <CreateCharacterModal />
            </th>
          </tr>
        </thead>
        <tbody>
          {characters?.map((character) => (
            <tr key={character.name}>
              <td>{character.name}</td>
              <td>{character.position_name}</td>
              <td>
                <Request
                  url={`http://localhost:8000/api/char/delete/${character.id}`}
                  method="DELETE"
                >
                  {({ mutate, loading }) => {
                    if (loading) return <Spinner />;
                    return (
                      <button
                        type="button"
                        className="btn btn-warning"
                        title="delete"
                        onClick={handleDelete(mutate)}
                      >
                        <AiFillDelete />
                      </button>
                    );
                  }}
                </Request>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default memo(CharactersList);
