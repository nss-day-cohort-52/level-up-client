export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      'Authorization': `Token ${localStorage.getItem('lu_token')}`
    }
  }).then(res => res.json())
}
