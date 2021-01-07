import React, { memo } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';
import Request from '../../api/Request';
import Spinner from '../../components/common/Spinner/Spinner';

// const onDeleteClick = (id, callback) => () => {
//   fetch(`http://localhost:8000/api/char/delete/${id}`, {
//     method: 'DELETE',
//   }).then((res) => {
//     callback();
//     return res.text();
//   });
// };

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
              <div className="menu-bars">
                <button type="button" className="btn btn-success">
                  <IoIosAddCircleOutline />
                </button>
              </div>
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
