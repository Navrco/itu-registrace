class Menu extends React.Component {
  state = {
    visible: false
  }

  menuOpened = (value) => {
    this.setState({
      visible: value
    })
  }

  render() {
    const { location,locationFunc } = this.props;
    const locs = ['cal','note','task']
    const names = ['Události','Poznámky','Úkoly']
    const selected = locs.indexOf(location);
    let body = [];
    for(let i=0;i<locs.length;i++){
      let attrs = {};
      if(selected == i)attrs.active = 'true';
      body.push(
        <button key={i}
          className="menu-item"
          {...attrs}
          onClick={() => {
              locationFunc(locs[i])
              this.menuOpened(false);
            }
          }>
        {names[i]}
        </button>
      )
    }

    if(this.state.visible){
      return (
        <div>
          <button className="menu-button"></button>
          <div className="menu-wrapper">
            <div className="menu">
              <button className="menu-close"
              onClick={() => this.menuOpened(false)}></button>
              <div className="menu-items">
                {body}
              </div>
            </div>
            <div className="menu-empty"
            onClick={() => this.menuOpened(false)}>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <button className="menu-button"
          onClick={() => this.menuOpened(true)}></button>
        </div>
      )
    }

  }
}
