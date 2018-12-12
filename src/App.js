import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { formValue: "", results: null };
  }

  handleChange = (event) => {
    this.setState({ formValue: event.target.value });
  }

  fetchData = (event) => {
    event.preventDefault();
    const Url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    const Api = 'a69e1cdbb16b4f23841c8f01be77f31a'
    const formValue = this.state.formValue
    const theQuery = Url + '?&api-key=' + Api + '&q=' + formValue
    fetch(theQuery)
      .then(
        (res) => res.json()
      )
      .then((res) => {
        console.log("res.response.docs = ", res.response.docs)
        this.setState({
          formValue: "",
          results: res.response.docs
        })
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error);
      });
  }


  render() {
    return (
      <div className="App">

      <div className="logo">
       <img src="https://www.famouslogos.net/images/new-york-times-logo.jpg" alt="new york times logo"/>
       </div> 

        <form>
          <input type="text" value={this.state.formValue} onChange={this.handleChange} />
          <button onClick={this.fetchData}>search</button>
        </form>

        {this.state.results && <div>
          <h2>the results</h2>
          {this.state.results.map((el, index) => (
            <div key={index}>
              <p>{el.headline.main} - <a target="_blank" rel="noopener noreferrer" href={el.web_url}>link</a></p>
            </div>
          )
          )}

        </div>
        }

      </div>
    );
  }
}

export default App;
