import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      showResults: false,
      queryResult: null,
      query: '',
      resultData: null,
      showDetails: false,
      detailsData: null
    };
  }

  render() {
    const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
          }, {
            Header: 'Age',
            accessor: 'age',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          }, {
            Header: props => <span>Team</span>, // Custom header components!
            accessor: 'team'
          }];


    return (
      <div className="App">
          <h1 style={{color:'orange'}}>Basket Ball</h1>
          <h2>Search for a team, player, or game</h2>
          <div>
            <input type="text" value={this.state.query} onChange={(updatedText)=>this.setState({query: updatedText.text})}/>
            <button onClick={() => {
              this.setState({showResults: true});
              this.getResults(this.state.query);
            }}>Search</button>
            <button onClick={() => this.setState({showResults: false, query: '', showSentimentGraph: false})}>Reset</button>
          </div>
        {this.state.showDetails && this.state.detailsData &&  
          <div>
            {this.state.detailsData.name}
          </div>
        }
        {this.state.showResults && 
            <ReactTable
                data={this.state.resultData}
                columns={columns}
                getTdProps={(state, rowinfo, column, instance) => {
                  return {
                    onClick: (e, handleOriginal) => {
                      if (rowinfo) {
                        this.getDetails(rowinfo.original);
                      }
                      if(handleOriginal) {
                        handleOriginal();
                      }
                    }
                  }
                }}
            />
        }
      </div>
    );
  }
  
  getDetails(dataString) {
    // we will query twitter db for the player name, then set data to state, then display chart (points vs sentiment)
    this.setState({detailsData: dataString});
  }

  getResults(searchString) {
    this.setState({showDetails: true})
    this.setState({resultData: 
      [{
        name: 'Stephen Curry',
        age: 30,
        team: 'GSW'
      }, {
        name: 'LeBron James',
        age: 33,
        team: 'LAL'
      }]
    });
  }
}

export default App;
