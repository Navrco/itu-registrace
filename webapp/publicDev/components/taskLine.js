class TaskLine extends React.Component {

  changeStatus = (id,state) => {
    //Sending task done request
    axios({
      method: 'put',
      url: '/api/task/finish',
      data: {id}
    }).then((res) => {

      const newArray = this.props.tasks.map(item => {
        if (item.id == id){
          item.done = state;
          return item
        }
        return item;
      })
      this.props.tasksFunc(newArray)

    }).catch((res) => handleAxiosError(res));
  }

  render() {
    const { id, text, done } = this.props.tasks[this.props.index]
    return (
      <div className="task-line">
        <div className="task-content">{text}</div>
        <div className="checkbox task-checkbox">
          <input type="checkbox"
            checked={done}
            onChange={(e) => this.changeStatus(id,e.target.checked)} />
          <span />
        </div>
      </div>
    )
  }

}
