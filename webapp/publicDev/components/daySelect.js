/* Project: Poznamky
 * File: daySelect.js
 * Brief: Component for remainders page that allows selecting days
 *
 * Authors:
 * David Nevrlka (xnevrl00)
*/


class DaySelect extends React.Component {
  // Getting data from parent
  state = {now}

  // Calculating number of empty cells
  // needed to calendar to look good
  firstDay = (y,m) => {
    const d = new Date(y,m,1);
    let val = d.getDay() - 1
    if(val == -1) val = 6;
    return val;
  }

  // Reactively changes to seleted day
  clicked = (i,skip) => {
    this.props.changeDayFunc(i + 1,skip)
  }

  render() {
    // Renders as a table
    const days = ['Po','Út','St','Čt','Pá','So','Ne'];
    const { year,month,day,now,reminders } = this.props;
    let nowDate = false;

    // Checks if selected year and month are current year and month
    if(year == this.state.now.getFullYear() && month == this.state.now.getMonth()){
      nowDate = true;
    }

    //Finding last day of selected month
    const lastDay = new Date(year,month + 1,0).getDate();
    const skip = this.firstDay(year,month);

    let body = []
    //Outputting headers
    days.map((day,i) => {
      body.push(
        <div key={i + 'header'} className="cell-header">{day}</div>
      )
    });
    //Outputting empty cells
    for(let i=0; i<skip; i++){
      body.push(
        <div key={i + 'empty'} className="empty-cell">0</div>
      )
    }
    //Outputting days
    for(let i=0; i<lastDay;i++){
      let attr = {};
      if(reminders[i + 1])attr.reminder = 'true';
      if(nowDate && i == (now - 1))attr.now = 'true';
      if(i == (day - 1))attr.active = 'true';
      body.push(
        <button
        key={i}
        className="cell"
        {...attr}
        onClick={(e) => this.clicked(i,skip)}>
          {i + 1}
        </button>
      )
    }

    return (
      <div className="month">
        <div className="cal-table">{body}</div>
      </div>
    )
  }
}
