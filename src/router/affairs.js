const publicComponent = () =>
  import ('components/article/affairs/public')

const service = () =>
  import ('components/article/affairs/service')

const communication = () =>
  import ('components/article/affairs/communication/index')

const communicationSuggestion = () =>
  import ('components/article/affairs/communication/suggestion')

const notice = () =>
  import ('components/article/affairs/notice')

const news = () =>
  import ('components/article/affairs/news')

const suggestion = () =>
  import ('components/article/affairs/suggestion')



const listPage = () =>
  import ('components/article/common-component/listPage')

const contentPage = () =>
  import ('components/article/common-component/contentPage')

export default [{
    path: '/affairs',
    redirect: '/affairs/public'
  },
  {
    path: 'public/:current',
    name: 'public',
    component: publicComponent,
    children: [{
      path: '/affairs/public',
      redirect: '/affairs/public/responsibility/page/1'
    }, {
      path: '/affairs/public/:current',
      redirect: '/affairs/public/:current/page/1'
    }, {
      path: '/affairs/public/:current/page',
      redirect: '/affairs/public/:current/page/1'
    }, {
      path: '/affairs/public/:current/content',
      redirect: '/affairs/public/:current/page/1'
    }, {
      path: 'page/:page',
      name: 'affairs_public_page',
      component: listPage
    }, {
      path: 'content/:id',
      name: 'affairs_public_content',
      component: contentPage
    }]
  }, {
    path: 'service',
    name: 'service',
    component: service,
    children: [{
      path: '/affairs/service/content',
      redirect: '/affairs/service'
    }, {
      path: 'content/:id',
      name: 'affairs_service_content',
      component: contentPage
    }]
  }, {
    path: 'communication',
    name: 'communication',
    component: communication,
    children: [{
      path: '/affairs/communication',
      redirect: '/affairs/communication/research'
    }, {
      path: 'research',
      name: 'affairs_communication_research',
      component: listPage
    }, {
      path: 'suggestion',
      name: 'affairs_communication_suggestion',
      component: communicationSuggestion
    }]
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