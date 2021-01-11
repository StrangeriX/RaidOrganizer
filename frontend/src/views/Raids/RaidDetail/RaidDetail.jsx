import React from 'react';
import Request from '../../../api/Request';
import GoBack from '../../../components/common/GoBack/GoBack';
import Spinner from '../../../components/common/Spinner/Spinner';

function RaidDetail(props) {
  const { raidid } = props.match.params;
  console.log(raidid);
  return (
    <div className="col-md-10 m-auto">
      <Request url={`http://127.0.0.1:8000/api/raid/${raidid}`}>
        {({ data, loading }) => {
          if (loading) return <Spinner />;
          console.log(data);
          return (
            <div>
              <div className="card card-body md-12">
                <h3 className="text-center">{data?.name}</h3>
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
