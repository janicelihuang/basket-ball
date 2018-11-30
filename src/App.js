import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import $ from "jquery";
import Modal from 'react-modal';
const TOP_TEAMS = require('./teams.js');

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      showResults: false,
      queryResult: null,
      nameQuery: '',
      teamQuery: '',
      oppQuery: '',
      resultData: null,
      showDetails: false,
      detailsData: null,
      playerRankings: null,
    };
  }

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: "/api/rankplayers/"
    }).done(this.setRanking)
      .catch((error) => {
        console.log(error);
      });   
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
            Header: "Three Pointers",
            accessor: 'tpm'
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
          }, {
            Header: 'Twitter Sentiment',
            accessor: 'twt'
          }
    ];

    return (
      <div className="App">
          <h1 style={{color:'orange'}}>Basket Ball</h1>
          <h3>Look up a player's performance during a specific game</h3>
          <div>
            Name: <input type="text" placeholder={"Player Name"} value={this.state.nameQuery} onChange={(updatedText)=>this.setState({nameQuery: updatedText.target.value})}/>
          </div>
          <div>
            Team: <input type="text" placeholder={"e.g. BOS"} value={this.state.teamQuery} onChange={(updatedText)=>this.setState({teamQuery: updatedText.target.value})}/>
          </div>
          <div>
            Opposition: <input type="text" placeholder={"e.g. PHI"} value={this.state.oppQuery} onChange={(updatedText)=>this.setState({oppQuery: updatedText.target.value})}/>
          </div>
          <button onClick={() => {
            this.setState({showResults: true});
            this.getResults();
          }}>Search</button>
          <button onClick={() => this.setState({showResults: false, query: '', showSentimentGraph: false})}>Reset</button>
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
        <Modal
          isOpen={this.state.showDetails}>
          {this.state.detailsData && 
            <div>
              <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.detailsData}</h2>
              <button onClick={() => this.setState({showDetails: false})}>close</button>
              <h3>Recommended Team: {TOP_TEAMS[this.state.playerRankings[this.state.detailsData]]}</h3>
            </div>
          }
        </Modal>
      </div>
    );
  }
  
  getDetails(dataString) {
    // we will query twitter db for the player name, then set data to state, then display chart (points vs sentiment)
    this.setState({showDetails: true, detailsData: dataString.name});
  }

  setResults = (html) => {
    this.setState({resultData: html});
  }

  setRanking = (html) => {
    var scoremap = html;
    var scores = [];
    for (var key in scoremap){
      scores.push(parseFloat(scoremap[key]));
    }
    var maxscore = Math.max.apply(null,scores);
    var minscore = Math.min.apply(null, scores);
    for (var key in scoremap){
      let score = ((scoremap[key] - minscore)/(maxscore-minscore))*TOP_TEAMS.length - 1
      if (score < 0)
        score = 0
      scoremap[key] = score;
    }
    this.setState({playerRankings: scoremap});
  }

  getResults() {
    $.ajax({
      method: "GET",
      url: "/api/search/",
      data: {name: this.state.nameQuery, team: this.state.teamQuery, opp: this.state.oppQuery}
    }).done(this.setResults)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default App;
