import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import $ from "jquery";

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      showResults: false,
      queryResult: null,
      nameQuery: '',
      dateQuery: '',
      teamQuery: '',
      oppQuery: '',
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
            Header: 'Date',
            accessor: 'date'
          }, {
            Header: 'Team',
            accessor: 'team'
          }, {
            Header: 'Opposition',
            accessor: 'opposition'
          }, {
            Header: 'Win Margin',
            accessor: 'winmargin'
          }, {
            Header: 'Minutes Played',
            accessor: 'minutesplayed'
          }, {
            Header: "Three Pointers",
            accessor: 'tpm'
          }, {
            Header: "Free Throws",
            accessor: 'ftm'
          }, {
            Header: "Assists",
            accessor: 'assists'
          }, {
            Header: "Steals",
            accessor: 'steals'
          }, {
            Header: 'Blocks',
            accessor: 'blocks',
          }, {
            Header: 'Turnovers',
            accessor: 'turnovers'
          }, {
            Header: 'Points',
            accessor: 'points'
          }, {
            Header: 'Game Score',
            accessor: 'gamescore'
          }
    ];

    return (
      <div className="App">
          <h1 style={{color:'orange'}}>Basket Ball</h1>
          <h3>Look up a player's performance during a specific game</h3>
          <div>
            Name: <input type="text" placeholder={"Player Name"} value={this.state.nameQuery} onChange={(updatedText)=>this.setState({nameQuery: updatedText.text})}/>
          </div>
          <div>
            Date: <input type="text" placeholder={"dd/mm/yyyy"} value={this.state.dateQuery} onChange={(updatedText)=>this.setState({dateQuery: updatedText.text})}/>
          </div>
          <div>
            Team: <input type="text" placeholder={"e.g. GSW"} value={this.state.teamQuery} onChange={(updatedText)=>this.setState({teamQuery: updatedText.text})}/>
          </div>
          <div>
            Opposition: <input type="text" placeholder={"e.g. CAV"} value={this.state.oppQuery} onChange={(updatedText)=>this.setState({oppQuery: updatedText.text})}/>
          </div>
          <button onClick={() => {
            this.setState({showResults: true});
            this.getResults();
          }}>Search</button>
          <button onClick={() => this.setState({showResults: false, query: '', showSentimentGraph: false})}>Reset</button>
        {this.state.showDetails && this.state.detailsData &&  
          <div>
            {this.state.detailsData.name}
          </div>
        }
        {this.state.showResults && this.state.resultData &&  
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

  getResults() {
    $.ajax({
      method: "GET",
      url: "https://api.github.com/repos/octokit/octokit.rb"
    }).done((html) => {
      this.setState({resultData: 
        [{
          name: 'Stephen Curry',
          date: '10/23/15',
          team: 'GSW',
          opposition: 'LAL',
          winmargin: 'wat',
          minutesplayed: 'hek',
          tpm: 3,
          ftm: 2,
          assists: 4,
          steals: 4,
          blocks: 91, 
          turnovers: 12,
          points: 80,
          gamescore: 12
        }]
      });
      this.setState({showDetails: true})
    });
  }
}

export default App;
