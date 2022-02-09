import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { deleteGame, getGames } from "./GameManager.js"

export const GameList = (props) => {
  const history = useHistory()
  const [games, setGames] = useState([])

  const getAllTheGames = () => getGames().then(data => setGames(data))

  useEffect(() => {
    getAllTheGames()
  }, [])

  return (
    <article className="games">
      <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/games/new" })
        }}
      >Register New Game</button>
      {
        games.map(game => {
          return <section key={`game--${game.id}`} className="game">
            <div className="game__title">{game.title} by {game.maker}</div>
            <div className="game__players">{game.number_of_players} players needed</div>
            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
            <Link className="btn" to={`/games/${game.id}/update`}>Edit Game</Link>
            <button onClick={() => {
              deleteGame(game.id).then(getAllTheGames)
            }}>Destroy Game</button>
          </section>
        })
      }
    </article>
  )
}
