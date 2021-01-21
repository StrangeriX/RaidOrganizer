import React, { memo } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import Request from '../../api/Request';
import Spinner from '../../components/common/Spinner/Spinner';
import CreateCharacterModal from './CreateCharacterModal/CreateCharacterModal';

const CharactersList = () => {
  const username = localStorage.getItem('username');
  const handleCreateCharacter = (mutate, refetch) => (state) => {
    mutate({
      username,
      position: state.position,
      name: state.name,
    }).then(() => {
      refetch();
    });
  };
  const handleDeleteCharacter = (mutate, refetch) => () => {
    mutate().then(() => {
      refetch();
    });
  };
  const handleUpdateCharacter = (mutate, refetch) => (state) => {
    mutate({
      position: state.position,
      name: state.name,
    }).then(() => {
      refetch();
    });
  };

  return (
    <Request url={`http://127.0.0.1:8000/api/char/username/${username}`}>
      {({ data, loading, refetch }) => {
        if (loading) {
          return <Spinner />;
        }
        return (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>
                    <Request url="http://127.0.0.1:8000/api/char/create" method="POST">
                      {({ mutate, loading: isSaving }) => {
                        if (isSaving) return <Spinner />;
                        return (
                          <CreateCharacterModal
                            refetch={refetch}
                            onCreateCharacter={handleCreateCharacter(mutate, refetch)}
                          />
                        );
                      }}
                    </Request>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((character) => (
                  <tr key={character.name}>
                    <td>{character.name}</td>
                    <td>{character.position_name}</td>
                    <td>
                      <Request
                        url={`http://localhost:8000/api/char/mutate/${character.id}`}
                        method="DELETE"
                      >
                        {({ mutate, loading: isSaving }) => {
                          if (isSaving) return <Spinner />;
                          return (
                            <button
                              type="button"
                              className="btn btn-warning"
                              title="delete"
                              onClick={handleDeleteCharacter(mutate, refetch)}
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
      }}
    </Request>
  );
};
export default memo(CharactersList);
