import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import Note from "../components/note.component";
import NoteService from "../services/note.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleNote = this.handleNote.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);

    this.state = {
      note: "",
      redirect: null,
      userReady: false,
      noteList: {
        id: 0,
        note: "",
        date: ""
      },
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

  onChangeNote(e) {
    this.setState({
      note: e.target.value
    });
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  handleNote(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    if (this.checkBtn.context._errors.length === 0) {
      NoteService.addNote(this.state.note, this.state.currentUser).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { currentUser } = this.state;
    let { noteList } = this.state;
    noteList = currentUser.noteList?.map((note, index) => <React.Fragment key={index}><Note id={note.id} note={note.note} date={note.date} /></React.Fragment>);

    return (
      <div className="container">
        {(this.state.userReady) ?
          <div className="main_block">
            <div className="row"><h2>Your notes</h2></div>
            <div className="row">
              {noteList}
              <div className="col-lg-4 col-sm-6">
                <div className="add-card card block1">


                  <Form
                    onSubmit={this.handleNote}
                    ref={c => {
                      this.form = c;
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="note">Input note text: </label>
                      <Input
                        type="text"
                        className="form-control"
                        name="note"
                        value={this.state.note}
                        onChange={this.onChangeNote}
                      />
                    </div>

                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        disabled={this.state.loading}
                      >
                        {this.state.loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Add</span>
                      </button>
                    </div>

                    <CheckButton
                      style={{ display: "none" }}
                      ref={c => {
                        this.checkBtn = c;
                      }}
                    />
                  </Form>

                </div>
              </div>
            </div>
          </div>
          : null}
      </div>
    );
  }
}
