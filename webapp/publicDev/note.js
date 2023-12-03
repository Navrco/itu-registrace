class Note extends React.Component {
  state = {
    opened: false,
    notes: [],
    loaded: false
  }

  getNotes = (search = '') => {
    //Getting all notes associated with user
    axios({
      method: 'get',
      url: '/api/note/get',
      params: {search}
    }).then((res) => {
      this.setState({
        notes: res.data,
        loaded: true
      })
    }).catch((res) => handleAxiosError(res));
  }

  componentDidMount() {
    this.getNotes()
  }

  openChange = (opened) => {
    this.setState({opened})
  }

  editNotes = (notes) => {
    this.setState({notes})
  }

  render() {
    let body = [];
    for(let i=0;i<this.state.notes.length;i++){
      body.push(
        <NotePanel key={i}
          index={i}
          details={this.state.notes[i]}
          openFunc={this.openChange}/>
      )
    }

    return (
      <div>
        <NoteSearch fetchFunc={this.getNotes}/>
        <button className="note-add"
          onClick={() => this.setState({opened: 'add'})}>
          Přidat
        </button>
        {this.state.opened && <NoteWindow opened={this.state.opened}
                                openFunc={this.openChange}
                                notes={this.state.notes}
                                notesFunc={this.editNotes}/>}

        {this.state.loaded ?
          <div className="note-box">
            {body}
          </div>
        : <div className="loading"></div>
        }

      </div>
    )
  }

}
