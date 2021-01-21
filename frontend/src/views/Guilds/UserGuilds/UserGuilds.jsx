import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Request from '../../../api/Request';
import Spinner from '../../../components/common/Spinner/Spinner';
import CreateGuildModal from '../GuildModals/CreateGuildModal/CreateGuildModal';

function UserGuilds() {
  const username = localStorage.getItem('username');
  const handleCreateGuild = (mutate, refetch) => (state) => {

    mutate({
      guild_name: state.name,
      user_name: state.user,
    }).then(() => {
      refetch();
    });
  };
  return (
    <Request url={`http://127.0.0.1:8000/api/usertoguild/username/${username}`}>
      {({ data, loading, refetch }) => {
        if (loading) {
          return <Spinner />;
        }
        return (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Guild Name</th>
                  <th>Actions</th>
                  <th>
                    <Request url="http://127.0.0.1:8000/api/guild/create" method="POST">
                      {({ mutate, loading: isSaving }) => {
                        if (isSaving) return <Spinner />;
                        return (
                          <CreateGuildModal
                            refetch={refetch}
                            onCreateGuild={handleCreateGuild(mutate, refetch)}
                          />
                        );
                      }}
                    </Request>
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
                    <td>{date.guild_position_name}</td>
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
