/* Project: Poznamky
 * File: note.js
 * Brief: Note page as component
 *
 * Authors:
 * Jakub Vales (xvales04)
*/

class Note extends React.Component {
  state = {
    opened: false,
    notes: [],
    loaded: false
  }

  // Getting all notes associated with user
  getNotes = (search = '') => {
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

  // Call api read when component loaded
  componentDidMount() {
    this.getNotes()
  }

  // Reacts when note window is needed to open
  // either new note or already existing
  openChange = (opened) => {
    this.setState({opened})
  }

  // Reacts to notes data change
  editNotes = (notes) => {
    this.setState({notes})
  }

  render() {
    // Creates array from sub components of notes
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
