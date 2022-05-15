const API_URL = "https://a274-note-app-backend.herokuapp.com/";


class NoteService {

  deleteNote(noteId, curUser) {
    const DEL_URL = API_URL + "delete?id=" + noteId;
    return fetch(DEL_URL, {
      method: 'POST',
      headers: {
        Authorization: "Basic " + curUser.authdata
      }
    })
      .then(this.handleResponse)
      .then(user => {
        if (user) {
          user.authdata = curUser.authdata;
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      });
  }

  addNote(note, curUser) {
    const postData = {
      "note": note
    };

    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Basic " + curUser.authdata
      },
      body: JSON.stringify(postData)
    })
      .then(this.handleResponse)
      .then(user => {
        if (user) {
          user.authdata = curUser.authdata;
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      });
  }

  editNote(noteId, note, curUser) {
    const EDIT_URL = API_URL + "edit?id=" + noteId;
    const postData = {
      "note": note
    };

    return fetch(EDIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Basic " + curUser.authdata
      },
      body: JSON.stringify(postData)
    })
      .then(this.handleResponse)
      .then(user => {
        if (user) {
          user.authdata = curUser.authdata;
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      });
  }

  getUser(curUser) {
    return fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: "Basic " + curUser.authdata
      }
    })
      .then(this.handleResponse)
      .then(user => {
        if (user) {
          user.authdata = curUser.authdata;
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      });
  }

  handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if (response.status === 401) {
          alert("Incorrect login or password");
        }

        const error = (data && data.message) || response.statusText;

        return Promise.reject(error);
      }

      return data;
    });
  }
}

export default new NoteService();