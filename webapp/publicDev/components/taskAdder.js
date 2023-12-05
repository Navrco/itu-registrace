/* Project: Poznamky
 * File: taskAdder.js
 * Brief: Component for adding tasks
 *
 * Authors:
 * Rostislav Navratil (xnavra72)
*/

class TaskAdder extends React.Component {
  state = {
    value: '',
  }

  // Api call for task creation
  handleAdding = (e) => {
    // Disables button for creation until request is resolved
    if(!e.target.disabled){
      e.preventDefault()
      e.target.disabled = true;
      let payload = {text: this.state.value}
      axios({
        method: 'post',
        url: '/api/task/create',
        data: payload
      }).then((res) => {
        // Reactively adds new task to the list
        payload.id = res.data.id;
        payload.done = false;
        let newArray = [payload, ...this.props.tasks]
        this.props.tasksFunc(newArray)
        this.props.openFunc('');
      }).catch((res) => handleAxiosError(res));
    }
  }

  render() {
    return (
      <div className="tasks-wrapper">
        <div className="tasks-toolbar">
          Přidat nový
        </div>

        <form onSubmit={(e) => this.handleAdding(e)}>
          <textarea className="task-input"
            value={this.state.value}
            onChange={(e) => this.setState({value:e.target.value})}
            placeholder="Prazdný úkol..." />
          <button type="submit" className="task-submit">
            Přidat
          </button>
        </form>
      </div>
    )
  }

}
