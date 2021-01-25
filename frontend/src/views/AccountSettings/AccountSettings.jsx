import React, { memo } from 'react';
import Request from '../../api/Request';
import Spinner from '../../components/common/Spinner/Spinner';
import ChangePasswordModal from './ChangePasswordModal/ChangePasswordModal';

function AccountSettings() {
  const handlePasswordChange = (mutate, refetch) => (state) => {
    mutate({
      newpassword: state.new_password,
    }).then(() => {
      refetch();
    });
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Option</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Password</td>
            <td>
              <Request url="http://127.0.0.1:8000/auth/user" method="PUT">
                {({ mutate, loading, refetch }) => {
                  if (loading) return <Spinner />;
                  return (
                    <ChangePasswordModal onPasswordChange={handlePasswordChange(mutate, refetch)} />
                  );
                }}
              </Request>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default memo(AccountSettings);
