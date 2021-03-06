import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import { useIsAuthenticated } from '../../api/AuthenticationProvider';
import Spinner from '../../components/common/Spinner/Spinner';
import Request from '../../api/Request';

const GuildList = ({ guilds, refetch }, props) => {
  const { isAuthenticated } = useIsAuthenticated();
  const { history } = props;
  const username = localStorage.getItem('username');

  const onGuildJoin = (mutate, guild) => () => {
    mutate({
      user: username,
      guild_position: '3',
      guild,
    }).then(() => {
      refetch();
    });
  };
  return (
    <div className="col-md-10 m-auto">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Guild name</th>
              <th>Guild members</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {guilds?.map((guild) => (
              <tr key={guild.id}>
                <td>{guild.guild_name}</td>
                <td>{guild.guild_members_count}</td>
                <td>
                  <div className="btn-group" role="group">
                    {isAuthenticated ? (
                      <Request
                        url={`http://127.0.0.1:8000/api/usertoguild/mutate/${guild.guild_name}/${username}`}
                        method="POST"
                      >
                        {({ mutate, loading }) => {
                          if (loading) return <Spinner />;
                          return (
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={onGuildJoin(mutate, guild.guild_name)}
                            >
                              Join
                            </button>
                          );
                        }}
                      </Request>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withRouter(memo(GuildList));
