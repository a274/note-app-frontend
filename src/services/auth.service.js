const API_URL = "https://a274-note-app-backend.herokuapp.com/";


class AuthService {
  login(login, password) {
    return fetch(API_URL + "sign", {
      method: 'GET',
      headers: {
        Authorization: "Basic " + btoa(login + ":" + password)
      }
    })
      .then(this.handleResponse)
      .then(user => {
        if (user) {
          user.authdata = window.btoa(login + ':' + password);
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    localStorage.removeItem("user");
    return fetch(API_URL + "logout", {
      method: 'GET'
    })
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

  register(login, password) {
    const postData = {
      "login": login,
      "password": password,
    };

    return fetch(API_URL + "sign", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Basic " + btoa(login + ":" + password)
      },
      body: JSON.stringify(postData)
    })
      .then(this.handleResponse)
      .then(user => {
        if (user) {
          user.authdata = window.btoa(login + ':' + password);
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      });
  }

  getCurrentUser() {
    // get user to server
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
