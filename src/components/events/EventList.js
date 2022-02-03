import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents().then(data => setEvents(data))
  }, [])

  return (
    events.map((event) => {
      return (
        <section>
          <h1>{event.game.title}</h1>

          {event.description}
          {event.date} at {event.time}
        </section>
      )
    })
  )
}
