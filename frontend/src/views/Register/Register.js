/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuthentication from '../../api/withAuthentication';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  onSubmit = (e) => {
    const { history, setIsAuthenticated } = this.props;
    e.preventDefault();
    const { username, email, password } = this.state;

    if (this.password === this.passwordConfirm) {
      console.log('Good passwords');
      // fetch
      fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((json) => {
          const { token } = json;
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          setIsAuthenticated({ isAuthenticated: true });
          history.push('/home');
        });
    } else {
      // alert
      console.log('Bad confirm pasword');
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, email, password, passwordConfirm } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
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
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
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
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="passwordConfirm"
                onChange={this.onChange}
                value={passwordConfirm}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuthentication(Register);
