import React, { useState } from 'react';
import Request from '../../../api/Request';
import GoBack from '../../../components/common/GoBack/GoBack';
import Spinner from '../../../components/common/Spinner/Spinner';

function RaidDetail(props) {
  const [isInRoster, setIsInRoster] = useState(false);
  const handleJoin = (mutate, refetch, position) => () => {
    mutate({
      position_id: position,
    }).then(() => {
      refetch();
    });
  };
  const handleLeaveRaid = (mutate, refetch) => () => {
    mutate().then(() => {
      refetch();
    });
  };

  const { raidid } = props.match.params;
  const username = localStorage.getItem('username');
  return (
    <div className="col-md-10 m-auto">
      <Request url={`http://127.0.0.1:8000/api/raid/${raidid}`}>
        {({ data, loading, refetch }) => {
          if (loading) return <Spinner />;
          setIsInRoster(false);
          return (
            <div>
              <div className="card card-body md-12">
                <h3 className="text-center">{data?.name}</h3>
                <div className="row">
                  {!data?.tank_list.includes(username) && (
                    <Request
                      url={`http://127.0.0.1:8000/api/usertogroup/mutate/${raidid}/${username}`}
                      method="POST"
                    >
                      {({ mutate, loading: isJoinig }) => {
                        if (isJoinig) return <Spinner />;
                        const position = '2';
                        setIsInRoster(true);
                        return (
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={handleJoin(mutate, refetch, position)}
                          >
                            join tank
                          </button>
                        );
                      }}
                    </Request>
                  )}
                  {!data?.healer_list.includes(username) && (
                    <Request
                      url={`http://127.0.0.1:8000/api/usertogroup/mutate/${raidid}/${username}`}
                      method="POST"
                    >
                      {({ mutate, loading: isJoinig }) => {
                        if (isJoinig) return <Spinner />;
                        const position = '3';
                        setIsInRoster(true);
                        return (
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={handleJoin(mutate, refetch, position)}
                          >
                            join Healer
                          </button>
                        );
                      }}
                    </Request>
                  )}
                  {!data?.dd_list.includes(username) && (
                    <Request
                      url={`http://127.0.0.1:8000/api/usertogroup/mutate/${raidid}/${username}`}
                      method="POST"
                    >
                      {({ mutate, loading: isJoinig }) => {
                        if (isJoinig) return <Spinner />;
                        const position = '1';
                        setIsInRoster(true);
                        return (
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={handleJoin(mutate, refetch, position)}
                          >
                            join DD
                          </button>
                        );
                      }}
                    </Request>
                  )}
                  <div className="col offset-md-4">
                    {isInRoster && (
                      <Request
                        url={`http://127.0.0.1:8000/api/usertogroup/mutate/${raidid}/${username}`}
                        method="DELETE"
                      >
                        {({ mutate, loading: isLeavingRaid }) => {
                          if (isLeavingRaid) return <Spinner />;
                          return (
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={handleLeaveRaid(mutate, refetch)}
                            >
                              Leave Raid
                            </button>
                          );
                        }}
                      </Request>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-8 m-auto">
                <div className="list-group">
                  <div className="card">
                    Tanks:
                    {data?.tank_list.map((tank) => (
                      <div className="list-group-item">{tank}</div>
                    ))}
                  </div>
                </div>
                <div className="list-group">
                  <div className="card">
                    Healers:
                    {data?.healer_list.map((healer) => (
                      <div className="list-group-item">{healer}</div>
                    ))}
                  </div>
                </div>
                <div className="list-group">
                  <div className="card">
                    DD:
                    {data?.dd_list.map((dd) => (
                      <div className="list-group-item">{dd}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Request>
      <GoBack />
    </div>
  );
}
export default RaidDetail;
