import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    console.debug('App.constructor()');
    console.debug(props);
    super(props);
    this.state = {
      result: null,
      query: null,
      status: null,
    };
    console.debug(this.state);
    window.renderedApp = this;
  }

  render() {
    console.debug('App.render()');
    console.debug(this.state);
    let content = (<div className="Content">Not Loaded</div>);
    if (this.state.result && this.state.result.issues.length) {
      content = (<div className="Content">Big</div>);
    }
    return (
      <div className="App">
        <div>App: {this.state.result ? this.state.result.issues.length: 0}</div>
        {content}
        <div className="Status">[{this.state.status}]</div>
        <div onClick={_ => this.unload()}>(close)</div>
      </div>
    );
  }

  searchJiraIssues() {
    console.debug('App.searchJiraIssues()');
    if (this.state.result) {
      this.setState({status: 'searchJiraIssues already loaded'});
      return;
    }

    this.setState({status: 'searchJiraIssues'});
    setTimeout(_ => {
      fetch("result.json")
      .then(res => res.json())
      .then(data => {
        this.setState({result: data, status: 'searchJiraIssues done'});
        this.queryIssueML();
      })
      .catch(_ => {
        this.setState({result: null, status: 'searchJiraIssues error'});
      })
    }, 1000);
  }

  queryIssueML() {
    console.debug('App.queryIssueML()');
    this.setState({status: 'queryIssueML'});
    setTimeout(_ => {
      fetch("query.json")
      .then(res => res.json())
      .then(data => {
        this.setState({query: data, status: 'queryIssueML done'});
      })
      .catch(_ => {
        this.setState({result: null, status: 'queryIssueML error'});
      })
    }, 2000);
  }

  unload() {
    console.debug('App.unload()');
    this.setState({result: null, status: null});
    window.renderAppUnload();
  }
}

export default App;
