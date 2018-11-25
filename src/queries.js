const Pool = require('pg').Pool

const pool = new Pool({
  user: 'janice',
  host: 'localhost',
  database: 'postgres',
  password: 'monkey123',
  port: 5433,
})


const getGames = (request, response) => {
    pool.query('SELECT * FROM "games";', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
const getGameByDate = (request, response) => {
   const date = request.params.date;
  
   pool.query('SELECT * FROM "games" WHERE game_date = $1', [date], (error, results) => {
     if (error) {
       throw error
     }
     response.status(200).json(results.rows)
   })
}


const insertGame = (request, response) => {
    const { player_name, game_date, team, opp, ft, tp, ast } = request.query
  
    pool.query('INSERT INTO "games" (player_name, game_date, team, opp, ft, tp, ast) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
    [player_name, game_date, team, opp, ft, tp, ast], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Game added`)
    })
  }

const updateByDate = (request, response) => {
    const date = request.params.date;
    const { player_name, team, opp, ft, tp, ast  } = request.query
  
    pool.query(
      'UPDATE "games" SET player_name = $1, team = $2, opp = $3, ft = $4, tp = $5, ast = $6 WHERE game_date = $7',
      [player_name, team, opp, ft, tp, ast, date], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Game updated`)
      })
  }

const deleteGame = (request, response) => {
    const date = request.params.date;
  
    pool.query('DELETE FROM "games" WHERE game_date = $1', [date], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Game deleted`)
    })
  }

  module.exports = {
    getGames,
    getGameByDate,
    insertGame,
    updateByDate,
    deleteGame,
  }
