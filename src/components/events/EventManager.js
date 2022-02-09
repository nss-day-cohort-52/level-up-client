export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      'Authorization': `Token ${localStorage.getItem('lu_token')}`
    }
  }).then(res => res.json())
}

export const createEvent = (event) => {
  return fetch("http://localhost:8000/events", {
    method: "POST",
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      'Content-Type': "application/json"
    },
    body: JSON.stringify(event)
  })
    .then(res => res.json())
}

export const getGames = () => {
  return fetch("http://localhost:8000/games", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`,
    }
  })
    .then(res => res.json())
}

export const getEvent = (eventId) => {
  return fetch(`http://localhost:8000/events/${eventId}`, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('lu_token')}`
    }
  }).then(res => res.json())
}

export const updateEvent = (event) => {
  return fetch(`http://localhost:8000/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      'Content-Type': "application/json"
    },
    body: JSON.stringify(event)
  })
}

export const deleteEvent = (eventId) => {
  return fetch(`http://localhost:8000/events/${eventId}`, {
    method: "Delete",
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`,
    },
  })
}
