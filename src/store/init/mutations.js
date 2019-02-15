export default {
  setNavList(state,data){
    state.catalog = data.navList
    state.website = data.website
    state.status = true
  }
}