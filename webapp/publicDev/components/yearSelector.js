/* Project: Poznamky
 * File: yearSelector.css
 * Brief: Widget that allows year selection for reminders
 *
 * Authors:
 * David Nevrlka (xnevrl00)
*/


function YearSelector(props) {
  const { year,changeYearFunc,today } = props;
  // Shift values
  let changes = [-4,-3,-2,-1,0,1,2,3,4];

  let body = [];
  for(let i=-4;i<5;i++){

    let attrs = {}
    if(i == 0)attrs.active = 'true';
    if((year + i) == today)attrs.now = 'true';

    // Creates buttons one by one
    body.push(
      <button onClick={() => changeYearFunc(i)}
        className="year-item"
        {...attrs}
        key={i}>
        {year + i}
      </button>
    )
  }


  return (
    <div className="top">
      <div className="year-select">
        <div className="year-wrapper" id="year-wrapper">
        {body}
        </div>
      </div>
    </div>
  )
}
