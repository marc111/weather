const weatherMonitor = () =>
  import ('components/article/weatherMonitor')

const cloud = () =>
  import ('components/article/weatherMonitor/cloud')

const sRadar = () =>
  import ('components/article/weatherMonitor/sRadar')

const xradar = () =>
  import ('components/article/weatherMonitor/xradar')

// 自动站
const aws = () =>
  import ('components/article/weatherMonitor/aws')

const tlnp = () =>
  import ('components/article/weatherMonitor/tlnp')

export default [{
  path: '/weatherMonitor',
  redirect: '/weatherMonitor/aws'
}, {
  path: 'cloud',
  name: 'cloud',
  component: cloud
}, {
  path: 'sRadar',
  name: 'sRadar',
  component: sRadar
}, {
  path: 'xradar',
  name: 'xradar',
  component: xradar
}, {
  path: 'aws',
  name: 'aws',
  component: aws
}, {
  path: 'T-lnP/:id',
  name: 'T-lnP',
  component: tlnp,
  children: [{
    path: '/weatherMonitor/T-lnP',
    redirect: '/weatherMonitor/T-lnP/T-lnP'
  }]
}]
