export default class Bush {
  id = null
  name = 'bush'
  lat = 35.24545
  lng = 45.24545
  status = 0
  note = 'sdjfjsf'
  createdAt = '2019-12-07 22:39:25'
  image = 'https://ambr.md.kr.ua/storage/photos/1575758365.jpg'
  votes = 0

  constructor(obj) {
    console.log(obj)
    if (obj) {
      this.id = Number(obj.id)
      this.name = obj.name
      this.lat = obj.lat
      this.lng = obj.lng
      this.status = obj.status
      this.note = obj.note
      this.createdAt = obj.created_at
      this.image = obj.image
      this.votes = obj.votes
    }
  }

  get latlng() {
    return L.latLng(this.lat, this.lng)
  }

}