/* Project: Poznamky
 * File: rimnderAdder.js
 * Brief: Component that allows reminder adding
 *
 * Authors:
 * David Nevrlka (xnevrl00)
*/

class ReminderAdder extends React.Component {
  state = {
    entireDay: false,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    text: '',
  }

  entireDaySet = (e) => this.setState({entireDay: e.target.checked})

  // Handling number input for time
  validInput = (e) => {
    if(e.target.value == '') return true;
    let expr = /^[0-9]$|^[0-9][0-9]$/;
    if(expr.test(e.target.value)){
      let val = parseInt(e.target.value);
      return (val >= e.target.min && val <= e.target.max);
    };
    return false;
  }

  hoursSet = (e) => {
    if(this.validInput(e))this.setState({hours: parseInt(e.target.value)})
  }

  minutesSet = (e) => {
    if(this.validInput(e))this.setState({minutes: parseInt(e.target.value)})
  }


  render() {

    return (

      <div className="rem-adder-wrapper">
        <div className="rem-link"
          onClick={() => this.props.setAddFunc(false)}>
        </div>
        <div className="rem-adder">

          <div className="rem-form-left">
            <div className="rem-entire">
              <div className="checkbox rem-checkbox">
                <input type="checkbox"
                  onChange={(e) => this.entireDaySet(e)}
                  checked={this.entireDay}/>
                <span />
              </div>
              <span>Celý den</span>
            </div>
          </div>

          <div className="rem-form-right">
            <div className="rem-inputs">
              <input className="rem-input"
                type="text" min="0" max="23"
                onChange={this.hoursSet}
                value={this.state.hours}
                disabled={this.state.entireDay}/>
              :
              <input className="rem-input"
                type="text" min="0" max="59"
                onChange={this.minutesSet}
                value={this.state.minutes}
                disabled={this.state.entireDay}/>
            </div>

            <div className="rem-sliders">
              Hodiny
              <div className="rem-slider-cont">
                <input type="range" min="0" max="23" className="rem-slider"
                  value={this.state.hours}
                  onChange={this.hoursSet}
                  disabled={this.state.entireDay}/>
              </div>
              Minuty
              <div className="rem-slider-cont">
                <input type="range" min="0" max="59" className="rem-slider"
                  value={this.state.minutes}
                  onChange={this.minutesSet}
                  disabled={this.state.entireDay}/>
              </div>
            </div>
          </div>

          <textarea className="rem-text"
            placeholder="Obsah události..."
            onChange={(e) => this.setState({text: e.target.value})}
            value={this.state.text}>
          </textarea>

          <button className="submit"
            onClick={(e) => this.props.addRemFunc(e,this.state)}>
            Přidat
          </button>


        </div>
      </div>

    )
  }
}
