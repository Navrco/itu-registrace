/* Project: Poznamky
 * File: reminder.js
 * Brief: Component for showing all reminders for selected day
 *
 * Authors:
 * David Nevrlka (xnevrl00)
*/

class Reminder extends React.Component {
  state = {
    add: false
  }

  setAdd = (add) => {
    this.setState({add})
  }

  addRem = (e,data) => {

    if(!e.target.disabled && data.text != ''){
      e.target.disabled = true;
      // Api call for reminder create
      const { year, month, day } = this.props
      const { entireDay, minutes, hours, text } = data
      let payload = { year, month, day, entireDay, minutes, hours, text }
      axios({
        method: 'post',
        url: '/api/reminder/create',
        data: payload
      }).then((res) => {
        // Reactively adding new reminder
        payload.id = res.data.id;
        let newObject = {...this.props.reminders}

        // If there already exist other reminder for selected day
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

  // Api call for update
  updateRem = (rem) => {
    axios({
        method: 'put',
        url: '/api/reminder/update',
        data: {
          id: rem.id,
          text: rem.text,
        }
      }).then((res) => {

        // Reactively update reminder
        this.props.reminders[rem.day].forEach(item => {
          if(item.id = rem.id){
            item.text = rem.text
          }
        })
        this.props.remindersFun(this.props.reminders)

      }).catch((res) => handleAxiosError(res));
  }

  removeRem = (e,rem) => {

    if(!e.target.disabled){
      const { year, month } = this.props
      let payload = {
        day: rem.day,
        id: rem.id
      }

      // Api call for deletion
      axios({
        method: 'delete',
        url: '/api/reminder/delete',
        data: payload
      }).then((res) => {
        // Reactively deleting reminder
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

    let dateText = 'Není vybrán den';
    if(day != ''){
      dateText = `${dayName} ${day}. ${month + 1}. ${year}`;
    }

    // Building reminder one by one
    let body = []
    if(Object.keys(reminders).length == 0){
      body.push(<tr key="empty" className="rem-empty"><td>Zatím nemáte vytvořené události</td></tr>)

    } else if(day == ''){
      // Reminders set to entire day
      for(let r in reminders){
        reminders[r].forEach((item) => {
          body.push(<ReminderLine
            key={item.id}
            reminder={item}
            showDays={true}
            editFunc={this.updateRem}
            removeFunc={this.removeRem}
          />)
        });
      }
    } else {
      // Reminders set to exac time
      if(reminders[day]){
        reminders[day].forEach((item) => {
          body.push(<ReminderLine
            key={item.id}
            reminder={item}
            showDays={false}
            editFunc={this.updateRem}
            removeFunc={this.removeRem}
          />)
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
