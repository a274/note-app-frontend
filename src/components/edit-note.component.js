import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import NoteService from "../services/note.service";
import AuthService from "../services/auth.service";
import Input from "react-validation/build/input";


export default class EditNote extends Component {
    constructor(props) {
        super(props);
        this.handleEditNote = this.handleEditNote.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);

        this.state = {
            isEditClicked: false,

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

    handleEditClick = e => {
        const temp = this.state.isEditClicked;
        this.setState({ isEditClicked: !temp })
    }

    onChangeNote(e) {
        this.setState({
            note: e.target.value
        });
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser })
    }

    handleEditNote(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        if (this.checkBtn.context._errors.length === 0) {
            NoteService.editNote(this.state.key, this.state.note, this.state.currentUser).then(
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
        const { isEditClicked } = this.state;
        return (
            <div>
                <div className="form-group">
                    <button onClick={this.handleEditClick} className="btn btn-primary btn-block">
                        <span>Edit</span>
                    </button>
                </div>
                {isEditClicked && (
                    <div>
                        <Form
                            onSubmit={this.handleEditNote}
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
                                <button className="btn btn-primary btn-block">
                                    <span>Save</span>
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
                )}
            </div>
        )
    }

}