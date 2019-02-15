import axios from 'axios'
import * as api from 'api/config'

export default {
  getInitData(context) {
    axios.get(api.request_init).then(res => {
      if (res.data && res.data.data) {
        const data = res.data.data
        const { columns, website } = data
        const childrenList = {}
        const navObj = {}
        const navList = []

        for (let nav of columns) {
          let { parentId, id } = nav
          if (parentId == 0) {
            navObj[id] = nav
            navList.push(nav)
          } else {
            !childrenList[parentId] && (childrenList[parentId] = [])
            childrenList[parentId].push(nav)
          }
        }

        for (const key in childrenList) {
          navObj[key] && (navObj[key].children = childrenList[key])
        }

        for (let nav of columns) {
          if (nav.parentId != 0 && navObj[nav.parentId]) {
            let parentName = navObj[nav.parentId].alias
            let name = nav.alias
            if (context.state.iconData[parentName]) {
              let iconData = context.state.iconData[parentName][name]
              nav.icon = iconData.icon
              nav.iconCurrent = iconData.iconCurrent
            }
          }
        }
        context.commit('setNavList', { navList, website })
      }
    })
  }
}
