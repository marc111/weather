<template>
  <div class="article-header-nav">
    <div class="inside">
      <a
        class="logo"
        href="/"
      >
        <img src="./img/logo.png">
      </a>
      <div class="nav-area">
        <div class="top">
          <router-link
            class="button"
            to="/"
          >网站首页</router-link>
          <span class="button">收藏本站</span>
          <span class="button">收藏本站</span>
          <span class="button">设为首页</span>
          <router-link
            class="button"
            to="/order"
          >English</router-link>
          <router-link
            class="button"
            to="/order"
          >无障碍版</router-link>
          <router-link
            class="button"
            to="/order"
          >手机版</router-link>
          <router-link
            class="button last"
            to="/order"
          >导航版</router-link>
        </div>
        <div class="bottom">
          <div
            v-for="(item,index) in navList"
            :key="item.path"
            class="nav-box"
          >
            <router-link
              :class="['button', {'first':index == 0}, {'current':item.name == current}]"
              :to="item.path"
            >{{item.title}}</router-link>
            <ul class="children-list">
              <li
                v-for="childItem in navData[item.name]"
                :key="'child-'+childItem.name"
              >
                <router-link
                  class="children-link"
                  :to="childItem.path"
                >{{childItem.title}}</router-link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['navList', 'current'],
  data() {
    return {
      navData: {
        forecast: [
          {
            path: '/forecast/refine',
            name: 'refine',
            title: '精细化预报'
          }, {
            path: '/forecast/town',
            name: 'town',
            title: '乡镇天气预报'
          }, {
            path: '/forecast/scenicSpot',
            name: 'scenicSpot',
            title: '景区预报'
          }, {
            path: '/forecast/local',
            name: 'local',
            title: '本地预报'
          }, {
            name: 'internal',
            path: '/forecast/internal',
            title: '国内七日预报'
          }, {
            name: 'environment',
            path: '/forecast/environment',
            title: '环境气象'
          }, {
            name: 'weatherReport',
            path: '/forecast/weatherReport',
            title: '天气报告'
          }, {
            name: 'weatherNews',
            path: '/forecast/weatherNews',
            title: '天气消息'
          }, {
            name: 'weatherVideo',
            path: '/forecast/weatherVideo',
            title: '天气视频'
          }, {
            name: 'traffic',
            path: '/forecast/traffic',
            title: '道路交通预报'
          }
        ],
        monitor: [],
        warning: [
          {
            path: '/warning/foshan',
            name: 'foshan',
            title: '佛山气象预警'
          }, {
            path: '/warning/province',
            name: 'province',
            title: '全省气象预警'
          }, {
            path: '/warning/meaning',
            name: 'meaning',
            title: '预警信号含义'
          }, {
            path: '/warning/disaster',
            name: 'disaster',
            title: '地质灾害预警'
          }
        ],
        service: [
          {
            path: '/service/foshan',
            name: 'foshan',
            title: '佛山气候'
          }, {
            path: '/service/prediction',
            name: 'prediction',
            title: '生态气象预报'
          }, {
            path: '/service/notice',
            name: 'notice',
            title: '档案公报'
          }
        ],
        tornado: [
          {
            path: '/tornado/introduce',
            name: 'introduce',
            title: '机构简介'
          }, {
            path: '/tornado/news',
            name: 'news',
            title: '科普资讯'
          }
        ],
        affairs: [
          {
            path: '/affairs/public',
            name: 'public',
            title: '政务公开'
          }, {
            path: '/affairs/service',
            name: 'service',
            title: '办事服务'
          }, {
            path: '/affairs/communication',
            name: 'communication',
            title: '互动交流'
          }, {
            path: '/affairs/notice',
            name: 'notice',
            title: '通知公告'
          }, {
            path: '/affairs/news',
            name: 'news',
            title: '气象新闻'
          }, {
            path: '/affairs/suggestion',
            name: 'suggestion',
            title: '党风廉政意见箱'
          }
        ],
        popularize: [
          {
            path: '/popularize/news',
            name: 'news',
            title: '气象科普'
          }
        ]
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.article-header-nav {
  width: 100%;
  height: 88px;
  background-color: #2162a9;
  .inside {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    .logo {
      width: 278px;
      height: 60px;
      margin: 9px 22px 0 0;
      float: left;
      display: block;
      img {
        width: 278px;
        height: 60px;
      }
    }
    .nav-area {
      width: 900px;
      height: 100%;
      padding-top: 9px;
      box-sizing: border-box;
      float: left;
      .top {
        height: 18px;
        line-height: 18px;
        margin-bottom: 20px;
        text-align: right;
        .button {
          padding: 0 5px;
          font-size: 12px;
          color: #ffffff;
          cursor: pointer;
          border-right: 1px solid #ffffff;
        }
        .button.last {
          border-width: 0;
        }
        .button:hover {
          text-decoration: underline;
        }
      }
      .bottom {
        text-align: right;
        .nav-box {
          margin-left: 25px;
          display: inline-block;
          position: relative;
          .button {
            height: 40px;
            padding-bottom: 19px;
            display: block;
            font-size: 15px;
            color: #ffffff;
            border-bottom: 2px solid transparent;
          }
          .first {
            margin-left: 0;
          }
          .current,
          .button:hover {
            border-bottom: 2px solid #ffffff;
          }
          .current:after,
          .button:hover:after {
            width: 0;
            margin: 12px auto 0;
            display: block;
            position: relative;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #ffffff;
            content: "";
          }
          .children-list {
            width: 140px;
            position: absolute;
            top: 40px;
            background-color: #f1f1f1;
            z-index: 99;
            display: none;
            li {
              width: 100%;
              .children-link {
                width: 100%;
                height: 36px;
                line-height: 36px;
                display: block;
                font-size: 15px;
                color: #666666;
                text-align: left;
                text-indent: 14px;
              }
              .children-link:hover {
                color: #ffffff;
                background-color: #035cc4;
              }
            }
          }
        }
        .nav-box:hover {
          .children-list {
            display: block;
          }
        }
      }
    }
  }
}
</style>

