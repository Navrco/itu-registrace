/* Project: Poznamky
 * File: notePanel.js
 * Brief: Component that shows thumbnail of note
 *
 * Authors:
 * Jakub Vales (xvales04)
*/

class NotePanel extends React.Component {

  render() {

    return (
      <button className="note-panel"
        onClick={()=>this.props.openFunc('' + this.props.index)}>
        <div className="note-header">
          {this.props.details.title}
        </div>
        <div className="note-content"
          dangerouslySetInnerHTML={{__html: this.props.details.text}}>
        </div>
      </button>
    )
  }

}
