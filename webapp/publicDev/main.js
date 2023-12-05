/* Project: Poznamky
 * File: main.js
 * Brief: Main and first react component that is loaded
 *
 * Authors:
 * Rostislav Navratil (xnavra72)
 * David Nevrlka (xnevrl00)
 * Jakub Vales (xvales04)
*/

// Date for reminders as global variables
const now = new Date();
let global = {
  year: now.getFullYear(),
  month: now.getMonth(),
}

function handleAxiosError(res){
  console.log(res.data)
}


class App extends React.Component {

  state = {
    location: 'cal',
    loaded: false
  }

  // Main menu batton handler
  changeLocation = (location) => {
    this.setState({ location });
    // Using local storage to save last used page
    window.localStorage.setItem("location",location)
  }

  // Checks if browser cookie is valid user
  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/user/cookie',
    }).then((res) => {
      if(res.data.exists){
      } else {
        // Creating cookie for new user
        let date = new Date();
        let days =  1000;
        date.setTime(+ date + (days * 86400000));
        document.cookie = `userToken=${res.data.userToken}; expires=${date.toGMTString()}; path=/;`;
      }

      this.setState({ loaded: true });

    }).catch((res) => handleAxiosError(res));

    // Reads last used page
    let stored = window.localStorage.getItem("location")
    if(stored){
      this.setState({location:stored})
    }


  }

  render() {
    if(this.state.loaded){
      //Page router
      switch(this.state.location){
        case 'cal':
          return (
            <div>
              <Menu location={this.state.location} locationFunc={this.changeLocation} />
              <Calendar />
            </div>
          );

        case 'note':
          return (
            <div>
              <Menu location={this.state.location} locationFunc={this.changeLocation} />
              <Note />
            </div>
          );

        case 'task':
          return (
            <div>
              <Menu location={this.state.location} locationFunc={this.changeLocation} />
              <Task />
            </div>
          );

        default:
          return null;
      }
    } else {
      //Waiting for user info to be retrived
      return (
        <div className="loading"></div>
      )
    }

  }

}

ReactDOM.render(<App />, document.getElementById('app'));
