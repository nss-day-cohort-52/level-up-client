import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { deleteEvent, getEvents } from "./EventManager.js"

export const EventList = (props) => {
  const [events, setEvents] = useState([])
  const history = useHistory()

  const getAllTheEvents = () => getEvents().then(data => setEvents(data))

  useEffect(() => {
    getAllTheEvents()
  }, [])

  return (
    <>
      <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/events/new" })
        }}
      >Register New Event</button>
      {
        events.map((event) => {
          return (
            <section>
              <h1>{event.game.title}</h1>

              {event.description}
              {event.date} at {event.time}
              <Link className="btn" to={`/events/${event.id}/update`}>Edit Event</Link>
              <button onClick={() => {
                deleteEvent(event.id).then(getAllTheEvents)
              }}>Destroy Event</button>
            </section>
          )
        })
      }
    </>
  )
}
