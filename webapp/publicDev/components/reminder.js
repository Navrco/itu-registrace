class Reminder extends React.Component {
  state = {
    add: false
  }

  setAdd = (add) => {
    this.setState({add})
  }

  addRem = (e,data) => {

    if(!e.target.disabled && data.text != ''){
      //e.preventDefault()
      e.target.disabled = true;
      const { year, month, day } = this.props
      const { entireDay, minutes, hours, text } = data
      let payload = { year, month, day, entireDay, minutes, hours, text }
      axios({
        method: 'post',
        url: '/api/reminder/create',
        data: payload
      }).then((res) => {
        //Writing new reminder to existing state to prevent accessing db each time
        payload.id = res.data.id;
        let newObject = {...this.props.reminders}

        if(newObject[payload.day]){
          newObject[payload.day].push(payload)
        } else {
          newObject[payload.day] = [payload]
        }
        this.props.remindersFun(newObject)
        this.setState({add: false})
      }).catch((res) => handleAxiosError(res));
    }
  }

  removeRem = (e,rem) => {

    if(!e.target.disabled){
      //e.preventDefault()
      //e.target.disabled = true;
      const { year, month } = this.props
      let payload = {
        //year,
        //month,
        day: rem.day,
        id: rem.id
      }

      axios({
        method: 'delete',
        url: '/api/reminder/delete',
        data: payload
      }).then((res) => {
        //Deleting reminder from current state to prevent axios request
        let newObject = {...this.props.reminders}
        if(newObject[rem.day].length == 1){
          delete newObject[rem.day];
        } else {
          newObject[rem.day] = newObject[rem.day].filter(item => item.id != rem.id)
        }
        this.props.remindersFun(newObject)

      }).catch((res) => handleAxiosError(res));

    }
  }

  render() {

    const { year, month, day, dayName, reminders } = this.props

    //console.log(reminders)
    //console.log(reminders)
    //console.log(day)

    let dateText = 'Není vybrán den';
    if(day != ''){
      dateText = `${dayName} ${day}. ${month + 1}. ${year}`;
    }

    let body = []
    if(Object.keys(reminders).length == 0){
      body.push(<tr key="empty" className="rem-empty"><td>Zatím nemáte vytvořené události</td></tr>)

    } else if(day == ''){
      for(let r in reminders){
        reminders[r].forEach((item) => {
          body.push(<ReminderLine key={item.id} reminder={item} showDays={true} removeFunc={this.removeRem}/>)
        });
      }
    } else {
      if(reminders[day]){
        reminders[day].forEach((item) => {
          body.push(<ReminderLine key={item.id} reminder={item} showDays={false} removeFunc={this.removeRem}/>)
        });
      } else {
        body.push(<tr key="empty" className="rem-empty"><td>Zatím nemáte vytvořené události</td></tr>)
      }
    }


    return (
      <div className="rem-wrapper">
        <div className="rem-toolbar">
          {dateText}

          {day != '' && <button className="rem-add"
                                onClick={(e) => this.setAdd(!this.state.add)}/>}
        </div>

        {this.state.add && day != '' && <ReminderAdder setAddFunc={this.setAdd}
                                          addRemFunc={this.addRem}/>}
        <table cellSpacing="0" cellPadding="0" className="rem-cont">
          <tbody>
          {body}
          </tbody>
        </table>

      </div>
    )
  }
}
