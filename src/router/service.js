const foshan = () =>
  import ('components/article/service/foshan')
const prediction = () =>
  import ('components/article/service/prediction')
const notice = () =>
  import ('components/article/service/notice')

export default [{
  path: '/service',
  redirect: '/service/foshan'
}, {
  path: 'foshan',
  name: 'foshan',
  component: foshan
}, {
  path: 'prediction',
  name: 'prediction',
  component: prediction
}, {
  path: 'notice',
  name: 'notice',
  component: notice
}]