/* Project: Poznamky
 * File: calendar.js
 * Brief: Root component for page with remainders
 *
 * Authors:
 * David Nevrlka (xnevrl00)
*/

class Calendar extends React.Component {
  months = ['Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'];
  dayNames = ['Neděle','Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota'] ;

  state = {
    year: global.year,
    month: global.month,
    dayNow: now.getDate(),
    day:  '',
    dayName: '',
    reminders: [],
    loaded: false
  }

  // Update method that is passed to child components
  setReminders = (reminders) => {
    this.setState({reminders})
  }

  // Api call to read reaminders for exact year and month
  getReminders = (year,month) => {
    this.setState({loaded: false})
    axios({
      method: 'get',
      url: '/api/reminder/get',
      params: {year, month}
    }).then((res) => {
      let reminders = {}
      if(res.data.length > 0){
        res.data.map((item) => {
          if(reminders[item.day]){
            reminders[item.day].push(item);
          } else {
            reminders[item.day] = [item];
          }
        })
      }
      // Assigns retrieved data to variable
      this.setState({
        reminders,
        loaded: true
      })

    }).catch((res) => handleAxiosError(res));
  }

  // Reacts to changes when year selector is used
  changeYear = (num) => {
    const year = this.state.year + num
    global.year = year;
    this.setState({
      year,
      day: ''
    })
    this.getReminders(year,this.state.month)
  }

  // Reacts to month selection
  changeMonth = (month) => {
    global.month = month;
    this.setState({
      month,
      day: ''
    })
    this.getReminders(this.state.year,month)
  }

  // Reacts to day change
  changeDay = (day,skip) => {
    this.setState({
      day,
      dayName: this.dayNames[(skip + day) % 7]
    })
  }

  // Calls api read when component loads
  componentDidMount(){
    this.getReminders(this.state.year,this.state.month);
  }

  render() {
    return (
      <div>
        <YearSelector year={this.state.year}
          changeYearFunc={this.changeYear}
          today={now.getFullYear()} />
        <MonthSelector monthNames={this.months}
          current={this.state.month}
          changeMonthFunc={this.changeMonth}
          today={now.getMonth()} />
        {this.state.loaded ? <DaySelect
          year={this.state.year}
          month={this.state.month}
          day={this.state.day}
          now={this.state.dayNow}
          changeDayFunc={this.changeDay}
          reminders={this.state.reminders}/>
          : <div className="loading"></div>
        }
        {this.state.loaded ? <Reminder year={this.state.year}
          month={this.state.month}
          day={this.state.day}
          dayName={this.state.dayName}
          reminders={this.state.reminders}
          remindersFun={this.setReminders}/>
          : <div className="loading"></div>
        }
      </div>
    )
  }

}
