import axios from 'axios'
import * as api from 'api/config'

export default {
  getInitData(context) {
    axios.get(api.request_init).then(res => {
      if (res.data && res.data.data) {
        const data= res.data.data
        console.log(data)
      }
    })
  }
}