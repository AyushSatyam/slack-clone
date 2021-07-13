import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import md5 from "md5";

export default class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users"),
  };

  displayError = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isFormValidate = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.ispasswordValid(this.state)) {
      // error = { message: "Password is invalid" };
      // this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  ispasswordValid = ({ password, passwordConfirmation, errors }) => {
    let error;
    if (password.length < 6 || passwordConfirmation < 6) {
      error = { message: "Password length should be greater than 6" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (password !== passwordConfirmation) {
      error = { message: "Password should be match" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else return true;
  };
  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValidate()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createUser) => {
          console.log(createUser);
          // this.setState({ loading: false });
          createUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createUser).then(() => {
                console.log("User Saved");
              });
            })
            .catch((error) => {
              console.log(error);
              this.setState({
                errors: this.state.errors.concat(error),
                loading: false,
              });
            });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            errors: this.state.errors.concat(error),
            loading: false,
          });
        });
    }
  };
  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };
  render() {
    const { username, email, password, passwordConfirmation, errors, loading } =
      this.state;

    return (
      <>
        <Grid textAlign="center" verticalAlign="middle" className="app">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" icon color="orange" textAlign="center">
              <Icon name="puzzle piece" color="orange" />
              Register for Slack
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={this.handleChange}
                  type="text"
                  value={username}
                />
                <Form.Input
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email Address"
                  onChange={this.handleChange}
                  type="email"
                  className={this.handleInputError(errors, "email")}
                  value={email}
                />
                <Form.Input
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={this.handleChange}
                  className={this.handleInputError(errors, "password")}
                  type="password"
                  value={password}
                />

                <Form.Input
                  fluid
                  name="passwordConfirmation"
                  icon="repeat"
                  iconPosition="left"
                  placeholder="Password Confirmation"
                  onChange={this.handleChange}
                  className={this.handleInputError(errors, "password")}
                  type="password"
                  value={passwordConfirmation}
                />

                <Button
                  disabled={loading}
                  className={loading ? "loading" : ""}
                  color="orange"
                  fluid
                  size="large"
                >
                  Submit
                </Button>
              </Segment>
            </Form>
            {errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.displayError(errors)}
              </Message>
            )}
            <Message>
              Already a user?<Link to="/login"> Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}
