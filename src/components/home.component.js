import React, { Component } from "react";

import AuthService from "../services/auth.service";
import NoteService from "../services/note.service";

import { Redirect } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      redirect: "/login",
      currentUser: {
        id: 0,
        login: "",
        password: "",
        noteList: [{
          id: 0,
          note: "",
          date: ""
        }
        ]
      }
    };
  }

  /*
  componentDidMount() {
    const currentUser1 = AuthService.getCurrentUser();

    const currentUser = NoteService.getUser(currentUser1);
    if (currentUser) this.setState({ redirect: "/profile" });
    this.setState({ currentUser: currentUser })
  }*/

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}
