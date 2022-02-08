import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent, getGames } from './EventManager.js'


export const EventForm = () => {
  const history = useHistory()
  const [games, setGames] = useState([])

  /*
      Since the input fields are bound to the values of
      the properties of this state variable, you need to
      provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState({
    description: "",
    time: "",
    date: "",
    gameId: 0
  })

  useEffect(() => {
    // TODO: Get the event types, then set the state
    getGames().then(gameData => setGames(gameData))
  }, [])

  const changeEventState = (domEvent) => {
    const copy = {...currentEvent}
    // const copy = Object.assign({}, currentEvent)
    copy[domEvent.target.name] = domEvent.target.value

    setCurrentEvent(copy)
  }

  return (
    <form className="eventForm">
      <h2 className="eventForm__time">Register New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="time">Time: </label>
          <input type="time" name="time" required className="form-control"
            value={currentEvent.time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <input type="date" name="date" required className="form-control"
            value={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description </label>
          <textarea name="description" required className="form-control"
            value={currentEvent.description}
            onChange={changeEventState}
          ></textarea>
        </div>
      </fieldset>

      <fieldset>
        <div>
          <label>Event Type</label>
          <select onChange={changeEventState} name="gameId" value={currentEvent.gameId}>
            <option value="0">Select a Game</option>
            {
              games.map(game => <option value={game.id}>{game.title}</option>)
            }
          </select>
        </div>
      </fieldset>

      <button type="submit"
        onClick={evt => {
          // Prevent form from being submitted
          evt.preventDefault()

          const event = {
            date: currentEvent.date,
            time: currentEvent.time,
            description: currentEvent.description,
            game: parseInt(currentEvent.gameId)
          }

          // Send POST request to your API
          createEvent(event)
            .then(() => history.push("/events"))
        }}
        className="btn btn-primary">Create</button>
    </form>
  )
}
