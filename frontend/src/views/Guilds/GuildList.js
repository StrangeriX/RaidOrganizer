import React, { memo } from 'react';
import { Link, useParams } from 'react-router-dom';


const GuildList = ({ guilds }) => (
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
        {guilds.map((guild) => (
          <tr key={guild.id}>
            <td>{guild.guild_name}</td>
            <td>{guild.guild_members_count}</td>
            <td>
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary ">
                  Join
                </button>
                <Link to={`/guild/${guild.id}`} className="btn btn-success">
                  AAa
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default memo(GuildList);
