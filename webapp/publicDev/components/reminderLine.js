class ReminderLine extends React.Component {
  state = {
    editable: false,
    text: ''
  }

  saveHandler(reminder){
    this.setState({editable:false});

    if(reminder.text == this.state.text){
      return;
    }

    this.props.reminder.text = this.state.text
    this.props.editFunc(this.props.reminder);

  }


  formatMinutes = (val) => {
    if (val.toString().length == 1){
      return '0' + val;
    }
    return val;
  }

  render() {

    const { reminder, showDays, editFunc, removeFunc } = this.props

    //this.setState({text: reminder.text})


    return (
      <tr className="rem-line">

        {showDays && <td className="rem-day">
          {reminder.day}.
        </td>}

        {!reminder.entireDay && <td className="rem-time">
          {reminder.hours}:{this.formatMinutes(reminder.minutes)}
        </td>}

        {reminder.entireDay && <td className="rem-time">
          <div className="rem-entire-day">-</div>
        </td>}


        <td className="rem-content">
        {this.state.editable ?
          <textarea className="rem-textbox"
            placeholder="Obsah události..."
            value={this.state.text}
            onChange={(e) => this.setState({text: e.target.value})}>
          </textarea>

          : reminder.text
        }
        </td>


        <td className="rem-util">

          {this.state.editable ?
            <button className="rem-btn rem-save"
              onClick={() => this.saveHandler(reminder)}></button>
            : <button className="rem-btn rem-edit"
              onClick={() => this.setState({text:reminder.text, editable: true })}></button>}
        </td>

        <td className="rem-util">
          <button className="rem-btn rem-del"
          onClick={(e) => removeFunc(e,reminder)}></button>
        </td>

      </tr>
    )
  }
}
