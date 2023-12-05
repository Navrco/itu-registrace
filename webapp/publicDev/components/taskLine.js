/* Project: Poznamky
 * File: taskLine.js
 * Brief: Component representing one task
 *
 * Authors:
 * Rostislav Navratil (xnavra72)
*/

class TaskLine extends React.Component {
  state = {
    text: '',
    editable: false
  };

  changeStatus = (id,state) => {
    // Api call to complete task
    axios({
      method: 'put',
      url: '/api/task/finish',
      data: {id}
    }).then((res) => {

      // Reactively changes status of task
      const newArray = this.props.tasks.map(item => {
        if (item.id == id){
          item.done = state;
          return item;
        }
        return item;
      })
      this.props.tasksFunc(newArray);

    }).catch((res) => handleAxiosError(res));
  }

  saveHandler = (id) => {

    // If there is no change to save
    this.setState({editable:false});
    if(this.props.tasks[this.props.index].text == this.state.text){
      return;
    }

    // Api call to update task text
    axios({
      method: 'put',
      url: '/api/task/update',
      data: {
        id: id,
        text: this.state.text
      }
    }).then((res) => {

      // Reactively updating task data
      const newArray = this.props.tasks.map(item => {
        if (item.id == id){
          item.text = this.state.text;
          return item;
        }
        return item;
      })
      this.props.tasksFunc(newArray);

    }).catch((res) => handleAxiosError(res));
  }

  render() {
    const { id, text, done } = this.props.tasks[this.props.index]
    return (
      <div className="task-line">
        <div className="checkbox task-checkbox">
          <input type="checkbox"
            checked={done}
            onChange={(e) => this.changeStatus(id,e.target.checked)} />
          <span />
        </div>


        {(this.state.editable && !done) ?
          <textarea className="task-textbox"
            placeholder="Obsah události..."
            value={this.state.text}
            onChange={(e) => this.setState({text: e.target.value})}>
          </textarea>

          : <div className="task-content">{text}</div>
        }


        {!done &&
          (this.state.editable ?
              <button className="task-save"
                onClick={() => this.saveHandler(id)}></button>
              : <button className="task-edit"
                onClick={() => this.setState({text:text, editable: true })}></button>)}

      </div>
    )
  }

}
