/* Project: Poznamky
 * File: noteSearch.js
 * Brief: Search bar for searching in notes
 *
 * Authors:
 * Jakub Vales (xvales04)
*/


class NoteSearch extends React.Component {
  state = {
    value: '',
    searched: false
  }

  doSearch = () => {
    if(this.state.searched != this.state.value){
      this.props.fetchFunc(this.state.value)
      this.setState({searched: this.state.value})
    }

  }

  render() {
    return (
      <div className="top">
        <div className="search-wrapper">
          <input
            type="text"
            className="search"
            placeholder="Vyhledat"
            onInput={(e) => this.setState({value: e.target.value})}
            onKeyPress={(e) => {
              if(e.key === 'Enter'){
                this.doSearch()
              }
            }}
            // Do search when focus is changed to other element
            onBlur={() => this.doSearch()}/>

          <button className="search-go"
            onClick={() => this.doSearch()}>
            </button>
        </div>
      </div>
    )
  }

}
