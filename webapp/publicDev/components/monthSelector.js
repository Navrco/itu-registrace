class MonthSelector extends React.Component {
  render() {

    const { monthNames,current,changeMonthFunc,today } = this.props;

    let body = [];

    for(let i=0;i<monthNames.length;i++){
      let attrs = {}
      if(i == current)attrs.active = 'true';
      if(i == today)attrs.now = 'true';

      body.push(
        <button className="month-item"
          {...attrs}
          key={i}
          onClick={() => changeMonthFunc(i)}>
          {monthNames[i]}
        </button>
      )
    }

    return (
      <div className="month-select">
        {body}
      </div>
    )
  }
}
