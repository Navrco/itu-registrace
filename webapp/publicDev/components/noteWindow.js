/* Project: Poznamky
 * File: noteWindow.js
 * Brief: Component for editing notes
 *
 * Authors:
 * Jakub Vales (xvales04)
*/

class NoteWindow extends React.Component {
  state = {
    title: '',
    text: '',
    id: 0,
    delConfirm: false
  }

  // Api call create new note
  noteCreate = (payload) => {
    axios({
      method: 'post',
      url: '/api/note/create',
      data: payload
    }).then((res) => {
      let newNote = payload;
      newNote.id = res.data.id;
      const newArray = [...this.props.notes,newNote];
      this.props.notesFunc(newArray);
    }).catch((res) => handleAxiosError(res));
  }

  // Api call to update note
  noteUpdate = (payload) => {
    axios({
      method: 'put',
      url: '/api/note/update',
      data: payload
    }).then((res) => {
      const newArray = this.props.notes.map(item => {
        if (item.id == payload.id) return payload;
        return item;
      })
      this.props.notesFunc(newArray);
    }).catch((res) => handleAxiosError(res));
  }

  close = () => {
    // Preparing data for request
    let { title, text } = this.state;
    if(text == ''){
      this.props.openFunc(false);
      return;
    }
    if(title == '') title = 'Bez názvu';
    const payload = {
      title,
      text
    }
    // Switching creating and updating
    if(this.props.opened == 'add'){
      this.noteCreate(payload)
    } else {
      payload.id = this.state.id;
      this.noteUpdate(payload);
    }
    this.props.openFunc(false)
  }

  delete = () => {
    // Switching delete and confirmation
    if(this.state.delConfirm){

      // Api call to delete note
      axios({
        method: 'delete',
        url: '/api/note/delete',
        data: {id: this.state.id}
      }).then((res) => {
        // Reactively removing note from data
        const newArray = this.props.notes.filter(item => {
          return item.id != this.state.id
        })
        this.props.notesFunc(newArray);
        this.props.openFunc(false)
      }).catch((res) => handleAxiosError(res));
      return
    }
    this.setState({delConfirm:true})
  }

  componentDidMount() {
    // Retrieves all notes
    const index =  this.props.opened
    if(index != 'add'){
      const { id, title, text } = this.props.notes[index]

      document.getElementById('textbox').innerHTML = text;
      this.setState({title,text,id})
    }
  }

  render() {

    return (
      <div className="note-wrapper">
        <div className="note-link"
          onClick={() => this.close()}>
        </div>

        <div className="note-window">
          <div className="note-toolbar">
            <button className="note-close"
              onClick={() => this.close()}>
            </button>
            {this.props.opened != 'add' &&
              <button className={'note-delete' + (this.state.delConfirm ? ' note-delete-confirm' : '')}
                onClick={() => this.delete()}>
              </button>
            }
          </div>
          <input type="text" className="note-title" placeholder="Název"
            value={this.state.title}
            onChange={(e) => this.setState({title: e.target.value})}
            onFocus={(e) => this.setState({delConfirm:false})}/>
          <div className="note-text"
            id="textbox"
            contentEditable="true"
            suppressContentEditableWarning="true"
            onInput={(e) => this.setState({text: e.target.innerHTML})}
            onFocus={(e) => this.setState({delConfirm:false})}
          >
          </div>
        </div>

      </div>
    )

  }

}
