const refine = () =>
  import ('components/article/forecast/refine')

const town = () =>
  import ('components/article/forecast/town')

const scenicSpot = () =>
  import ('components/article/forecast/scenicSpot')

const local = () =>
  import ('components/article/forecast/local')

const internal = () =>
  import ('components/article/forecast/internal')

const environment = () =>
  import ('components/article/forecast/environment')

const weatherReport = () =>
  import ('components/article/forecast/weatherReport')

const weatherNews = () =>
  import ('components/article/forecast/weatherNews')

const weatherVideo = () =>
  import ('components/article/forecast/weatherVideo')

const traffic = () =>
  import ('components/article/forecast/traffic')


export default [{
    path: '/forecast',
    redirect: '/forecast/refine'
  },
  {
    path: 'refine',
    name: 'refine',
    component: refine
  }, {
    path: 'town',
    name: 'town',
    component: town
  }, {
    path: 'scenicSpot',
    name: 'scenicSpot',
    component: scenicSpot
  }, {
    path: 'local',
    name: 'local',
    component: local
  }, {
    path: 'internal',
    name: 'internal',
    component: internal
  },
  {
    path: 'environment',
    name: 'environment',
    component: environment
  }, {
    path: 'weatherReport',
    name: 'weatherReport',
    component: weatherReport
  }, {
    path: 'weatherNews',
    name: 'weatherNews',
    component: weatherNews
  }, {
    path: 'weatherVideo',
    name: 'weatherVideo',
    component: weatherVideo
  }, {
    path: 'traffic',
    name: 'traffic',
    component: traffic
  }
]