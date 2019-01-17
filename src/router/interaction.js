const virtual = () =>
  import ('components/article/interaction/virtual')

const equipment = () =>
  import ('components/article/interaction/equipment')

const share = () =>
  import ('components/article/interaction/share')

const data = () =>
  import ('components/article/interaction/data')


export default [{
  path: '/interaction',
  redirect: '/interaction/message'
}, {
  path: '/interaction/virtual',
  name: 'virtual',
  component: virtual
}, {
  path: 'equipment',
  name: 'equipment',
  component: equipment
}, {
  path: 'share',
  name: 'share',
  component: share
}, {
  path: 'data',
  name: 'data',
  component: data
}]