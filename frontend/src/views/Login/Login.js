/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withAuthentication from '../../api/withAuthentication';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  onSubmit = (e) => {
    const { history, setIsAuthenticated } = this.props;
    e.preventDefault();
    const { username, password } = this.state;
    fetch('http://127.0.0.1:8000/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error('Bad response');
        }
        localStorage.setItem('username', username);
        return response.json();
      })
      .then((json) => {
        const { token } = json;
        localStorage.setItem('token', token);
        setIsAuthenticated({ isAuthenticated: true });
        history.push('/home');
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
              <span id="username-error" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
                Login
              </button>
            </div>
            <p>
              Don&apos;t have a account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthentication(Login));
