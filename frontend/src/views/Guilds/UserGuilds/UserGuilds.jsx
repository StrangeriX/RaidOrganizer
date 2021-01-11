import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Request from '../../../api/Request';
import Spinner from '../../../components/common/Spinner/Spinner';
import CreateGuildModal from '../CreateGuildModal/CreateGuildModal';

function UserGuilds() {
  const username = localStorage.getItem('username');

  return (
    <Request url={`http://127.0.0.1:8000/api/userto/${username}`}>
      {({ data, loading, refetch }) => {
        if (loading) {
          return <Spinner />;
        }
        console.log(data);
        return (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Guild Name</th>
                  <th>Actions</th>
                  <th>
                    <CreateGuildModal />
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((date) => (
                  <tr key={date.id}>
                    <td>{date.guild_name}</td>
                    <td>
                      <Link to={`/guild/${date.guild}`} className="btn btn-success">
                        Info
                      </Link>
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
}
export default memo(UserGuilds);
