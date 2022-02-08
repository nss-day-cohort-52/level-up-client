import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createGame, getGame, getGameTypes, updateGame } from './GameManager.js'


export const UpdateGame = () => {
  const history = useHistory()
  const [gameTypes, setGameTypes] = useState([])
  const [currentGame, setCurrentGame] = useState({})

  const { gameId } = useParams()

  useEffect(() => {
    getGameTypes().then(gameTypeData => setGameTypes(gameTypeData))
  }, [])

  useEffect(() => {
    getGame(gameId).then(gameData => setCurrentGame(gameData))
  }, [gameId])

  const changeGameState = (domEvent) => {
    console.log('initial', currentGame)
    const copy = {...currentGame}
    copy[domEvent.target.name] = domEvent.target.value
    console.log('updated', copy)
    setCurrentGame(copy)
  }

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Update {currentGame.title}</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" required autoFocus className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Maker: </label>
          <input type="text" name="maker" required autoFocus className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Number of Players: </label>
          <input type="text" name="number_of_players" required autoFocus className="form-control"
            value={currentGame.number_of_players}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Skill Level: </label>
          <input type="text" name="skill_level" required autoFocus className="form-control"
            value={currentGame.skill_level}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div>
          <label>Game Type</label>
          <select onChange={changeGameState} name="game_type" value={currentGame.game_type}>
            <option value="0">Select a game type</option>
            {
              gameTypes.map(gameType => <option value={gameType.id}>{gameType.label}</option>)
            }
          </select>
        </div>
      </fieldset>


      <button type="submit"
        onClick={evt => {
          // Prevent form from being submitted
          evt.preventDefault()

          // TODO: Call the update function and route to the Game list
          updateGame(currentGame).then(() => history.push('/'))
        }}
        className="btn btn-primary">Update</button>
    </form>
  )
}
