const introduce = () =>
  import ('components/article/tornado/introduce')

const news = () =>
  import ('components/article/tornado/news')

export default [{
  path: '/tornado',
  redirect: '/tornado/introduce'
},
{
  path: 'introduce',
  name: 'introduce',
  component: introduce
}, {
  path: 'news',
  name: 'news',
  component: news
}]
