class ReminderLine extends React.Component {

  formatMinutes = (val) => {
    if (val.toString().length == 1){
      return '0' + val;
    }
    return val;
  }

  render() {

    const { reminder, showDays, removeFunc } = this.props


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
          {reminder.text}
        </td>

        <td className="rem-del-cont">
          <button className="rem-del"
          onClick={(e) => removeFunc(e,reminder)}/>
        </td>

      </tr>
    )
  }
}
