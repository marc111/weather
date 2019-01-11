const publicComponent = () =>
  import ('components/article/affairs/public')

const service = () =>
  import ('components/article/affairs/service')

const communication = () =>
  import ('components/article/affairs/communication')

const notice = () =>
  import ('components/article/affairs/notice')

const news = () =>
  import ('components/article/affairs/news')

const suggestion = () =>
  import ('components/article/affairs/suggestion')

export default [{
    path: '/affairs',
    redirect: '/affairs/public'
  },
  {
    path: 'public',
    name: 'public',
    component: publicComponent
  }, {
    path: 'service',
    name: 'service',
    component: service
  }, {
    path: 'communication',
    name: 'communication',
    component: communication
  }, {
    path: 'notice',
    name: 'notice',
    component: notice
  }, {
    path: 'news',
    name: 'news',
    component: news
  }, {
    path: 'suggestion',
    name: 'suggestion',
    component: suggestion
  }
]