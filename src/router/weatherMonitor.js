const weatherMonitor = () =>
  import ('components/article/weatherMonitor')

const cloud = () =>
  import ('components/article/weatherMonitor/cloud')

const radar = () =>
  import ('components/article/weatherMonitor/radar')

const xradar = () =>
  import ('components/article/weatherMonitor/xradar')

// 自动站
const awshou = () =>
  import ('components/article/weatherMonitor/awshou')

const tlnp = () =>
  import ('components/article/weatherMonitor/tlnp')

export default [{
  path: '/weatherMonitor',
  redirect: '/weatherMonitor/awshou'
}, {
  path: 'cloud',
  name: 'cloud',
  component: cloud
}, {
  path: 'radar',
  name: 'radar',
  component: radar
}, {
  path: 'xradar',
  name: 'xradar',
  component: xradar
}, {
  path: 'awshou',
  name: 'awshou',
  component: awshou
}, {
  path: 'T-lnP/:id',
  name: 'T-lnP',
  component: tlnp,
  children: [{
    path: '/weatherMonitor/T-lnP',
    redirect: '/weatherMonitor/T-lnP/T-lnP'
  }]
}]