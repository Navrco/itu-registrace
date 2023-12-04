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

  changeLocation = (location) => {
    this.setState({ location });
    window.localStorage.setItem("location",location)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/user/cookie',
    }).then((res) => {
      if(res.data.exists){
        //Přidate data uživatele na stránku
      } else {
        let date = new Date();
        let days =  1000;
        date.setTime(+ date + (days * 86400000));
        document.cookie = `userToken=${res.data.userToken}; expires=${date.toGMTString()}; path=/;`;
      }

      this.setState({ loaded: true });

    }).catch((res) => handleAxiosError(res));

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
      //Waiting for user cookie to be set if it isnt
      return (
        <div className="loading"></div>
      )
    }

  }

}

ReactDOM.render(<App />, document.getElementById('app'));
