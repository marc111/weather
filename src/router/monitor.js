const monitor = () =>
  import ('components/article/monitor/index')

const cloud = () =>
  import('components/article/monitor/cloud')

const radar = () =>
  import('components/article/monitor/radar')

export default [{
  path: '/monitor',
  redirect: '/monitor/cloud'
}, {
  path: 'cloud',
  name: 'cloud',
  component: cloud
}, {
  path: 'radar',
  name: 'radar',
  component: radar
}]
