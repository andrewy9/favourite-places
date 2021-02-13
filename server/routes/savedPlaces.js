const express = require('express')
const db = require('../db/savedPlaces')
const router = express.Router()

router.get('/', (req, res) => {
  db.getSavedPlaces()
    .then(results => {
      res.json(results)
    })
    .catch(err => {
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  db.getSavedPlacesById(id)
    .then(results => {
      const found = results.some(el => el.id === parseInt(id))
      if (found) {
        res.json(results)
      } else {
        console.log(found)
        res.status(400).json({ msg: 'the id does not exist' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

router.post('/', (req, res) => {
  const { savedPlaceName, savedPlaceAddress } = req.body
  db.postSavedPlace(savedPlaceName, savedPlaceAddress)
    .then((result) => {
      res.status(201)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
  let id = req.params.id
  db.getSavedPlacesById(id)
    .then((results) => {
      let found = results.some(el => el.id === parseInt(id))
      if (found) {
        db.deleteSavedPlace(id)
          .then(() => {
            res.status(200).json({ msg: `the saved place of id:${id} is deleted` })
          })
      } else {
        console.log(found)
        res.status(400).json({ msg: 'the id does not exist' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

module.exports = router
