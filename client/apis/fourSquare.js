import request from 'superagent'

const rootUrl = '/api/v1'

export const getFourSquare = (position, interest) => {
  if (position.lat) {
    console.log(position, interest)
    return request
      .get(rootUrl + `/fourSquare/${position.lat},${position.lng}/${interest}`)
      .then(response => {
        console.log(response)
        return response.body.response.groups[0].items
      })
      .catch(error => {
        console.log('ERROR ' + error)
        return null
      })
  } else {
    return request
      .get(rootUrl + `/fourSquare/${position}/${interest}`)
      .then(response => {
        console.log('apis: received api data: ', response.body.response.groups[0].items)
        return response.body.response.groups[0].items
      })
      .catch(error => {
        console.log('ERROR ' + error)
        return null
      })
  }
}
