import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import NoteService from "../services/note.service";
import AuthService from "../services/auth.service";
import EditNote from "./edit-note.component";

export default class Note extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);

        this.state = {
            redirect: null,
            key: props.id,
            note: props.note,
            date: props.date,
            message: "",
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

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/profile" });
        this.setState({ currentUser: currentUser })
    }

    handleDeleteNote(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        if (this.checkBtn.context._errors.length === 0) {
            NoteService.deleteNote(this.state.key, this.state.currentUser).then(
                () => {
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
        return (
            <div className="col-lg-4 col-sm-6">
                <div className="block1 card">
                    <div className="card-body">
                        <p className="card-text">{this.state.note}</p>
                        <p className="align-start text-right font-weight-lighter card-text">{this.state.date}</p>
                        <EditNote id={this.state.key} note={this.state.note} date={this.state.date}/>
                        <Form
                            onSubmit={this.handleDeleteNote}
                            ref={c => {
                                this.form = c;
                            }}
                        >

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">
                                    <span>Delete</span>
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
        )
    }
}