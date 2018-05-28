// import cloudinary from 'cloudinary'
// import fakeRest from '../../utils/fake-rest'
// import dummy from '../../utils/dummy'

let endpoint = require('cloudinary')
endpoint.config({
  cloud_name: 'dk2mkgzg3',
  api_key: '865121419938338',
  api_secret: 'r_m3k8qmc5VOGxrdIQTNfq3Q-Lk'
})

export default {
  destroy (publicId) {
    return endpoint.uploader.destroy(publicId, function(result) {
      return result
    })
  },
  upload (file) {
    return endpoint.uploader.upload(file, function(res){
      return res
    })
  }
}
