import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useIsAuthenticated } from '../../api/AuthenticationProvider';

const GuildList = ({ guilds }) => {
  const { isAuthenticated } = useIsAuthenticated();
  return (
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
                    <button type="button" className="btn btn-primary ">
                      Join
                    </button>
                  ) : null}
                  <Link to={`/guild/${guild.id}`} className="btn btn-success">
                    Info
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(GuildList);
