class Task extends React.Component {
  state = {
    open: '',
    tasks: [],
    loaded: false
  }

  getTasks = () => {
    //Getting all tasks associated with user
    axios({
      method: 'get',
      url: '/api/task/get'
    }).then((res) => {
      this.setState({
        tasks: res.data,
        loaded: true
      })
    }).catch((res) => handleAxiosError(res));
  }

  editTasks = (tasks) => {
    this.setState({ tasks })

  }

  handleOpen = (type) => {
    if(this.state.open == type){
      this.setState({open: ''})
    } else {
      this.setState({open: type})
    }
  }

  componentDidMount() {
    this.getTasks()
  }

  render() {

    let [body,bodyDone] = [[],[]];
    this.state.tasks.forEach((item, i) => {
      if(item.done){
        bodyDone.push(
          <TaskLine key={i}
            index={i}
            tasks={this.state.tasks}
            tasksFunc={this.editTasks}/>
        )
      } else {
        body.push(
          <TaskLine key={i}
            index={i}
            tasks={this.state.tasks}
            tasksFunc={this.editTasks} />
        )
      }
    });
    let [attrAdd,attrHistory] = [{},{}];
    if(this.state.open == 'add') attrAdd.active = 'true';
    if(this.state.open == 'history') attrHistory.active = 'true';

    return (
      <div>
        <div className="top">
          <button className="top-task task-add"
            {...attrAdd}
            onClick={() => this.handleOpen('add')}>
          </button>
          <button className="top-task task-history"
            {...attrHistory}
            onClick={() => this.handleOpen('history')}>
          </button>
        </div>

        {this.state.open == 'add' && <TaskAdder tasks={this.state.tasks}
                                                tasksFunc={this.editTasks}
                                                openFunc={this.handleOpen}/>}

        {this.state.loaded ?
          <div>
            <div className="tasks-wrapper tasks-history" {...attrHistory}>
              <div className="tasks-toolbar">Splněné úkoly</div>
              {bodyDone}
            </div>
            <div className="tasks-wrapper">
              <div className="tasks-toolbar">Nedokončené úkoly</div>
              {body}
            </div>
          </div>
        : <div className="loading"></div>
        }

      </div>
    )
  }

}
