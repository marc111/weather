<template>
  <div class="m-nav">
    <ul class="nav clear">
      <li class="list">
        <router-link to="forecast">天气预报</router-link>
        <dl>
          <dd><router-link to="/order">精细化预报</router-link></dd>
          <dd><router-link to="/order">乡镇天气预报</router-link></dd>
          <dd><router-link to="/order">景区预报</router-link></dd>
          <dd><router-link to="/order">本地预报</router-link></dd>
          <dd><router-link to="/order">国内七天预报</router-link></dd>
          <dd><router-link to="/order">环境气象</router-link></dd>
          <dd><router-link to="/order">天气报告</router-link></dd>
          <dd><router-link to="/order">天气消息</router-link></dd>
          <dd><router-link to="/order">天气视频</router-link></dd>
          <dd><router-link to="/order">道路交通预报</router-link></dd>
        </dl>
      </li>
      <li class="list">
        <router-link to="yubao">天气监测</router-link>
        <dl>
          <dd><router-link to="/order">自动站</router-link></dd>
          <dd><router-link to="/order">能见度</router-link></dd>
          <dd><router-link to="/order">天气实景</router-link></dd>
          <dd><router-link to="/order">S波段雷达图</router-link></dd>
          <dd><router-link to="/order">X波段雷达图</router-link></dd>
          <dd><router-link to="/order">卫星云图</router-link></dd>
          <dd><router-link to="/order">台风路径图</router-link></dd>
          <dd><router-link to="/order">地球此时</router-link></dd>
          <dd><router-link to="/order">T-Inp</router-link></dd>
        </dl>
      </li>
      <li class="list">
        <router-link to="yubao">应急预警</router-link>
        <dl>
          <dd><router-link to="/order">佛山气象预警</router-link></dd>
          <dd><router-link to="/order">全省气象预警</router-link></dd>
          <dd><router-link to="/order">预警信号含义指引</router-link></dd>
          <dd><router-link to="/order">地质灾害预警</router-link></dd>
        </dl>
      </li>
      <li class="list">
        <router-link to="yubao">气候服务</router-link>
        <dl>
          <dd><router-link to="/order">佛山气候</router-link></dd>
          <dd><router-link to="/order">生态气象预报服务</router-link></dd>
          <dd><router-link to="/order">农业气象服务系统</router-link></dd>
          <dd><router-link to="/order">档案公报</router-link></dd>
        </dl>
      </li>
      <li class="list">
        <router-link to="yubao">天气互动</router-link>
        <dl>
          <dd><router-link to="/order">留言板</router-link></dd>
          <dd><router-link to="/order">虚拟观测场</router-link></dd>
          <dd><router-link to="/order">观测场设备介绍</router-link></dd>
          <dd><router-link to="/order">共享</router-link></dd>
          <dd><router-link to="/order">数据访问</router-link></dd>
        </dl>
      </li>
      <li class="list">
        <router-link to="yubao">阳光政务</router-link>
        <dl>
          <dd><router-link to="/order">政务公开</router-link></dd>
          <dd><router-link to="/order">办事服务</router-link></dd>
          <dd><router-link to="/order">互动交流</router-link></dd>
          <dd><router-link to="/order">通知公告</router-link></dd>
          <dd><router-link to="/order">气象新闻</router-link></dd>
          <dd><router-link to="/order">党风廉政</router-link></dd>
        </dl>
      </li>
      <li class="list">
        <router-link to="yubao">气象科普</router-link>
        <dl>
          <dd><router-link to="/order">气象科普</router-link></dd>
        </dl>
      </li>
      <li class="list">
        <router-link to="yubao">防雷减灾</router-link>
        <dl>
          <dd><router-link to="/order">在线办事</router-link></dd>
        </dl>
      </li>
      <li class="list">
        <router-link to="yubao">龙卷研究</router-link>
        <dl>
          <dd><router-link to="/order">机构简介</router-link></dd>
          <dd><router-link to="/order">科普资讯</router-link></dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.m-nav {
  margin: 0;
  padding: 0;
  z-index: 999;
  > .nav {
    width: 100%;
    list-style: none;
    height: 40px;
    display: block;
    content: "";
    clear: both;
    // float: right;
    > li {
      font-size: 14px;
      border-right: 0.1px solid #377ad1;
      float: left;
      width: 11.111%;
      height: 45px;
      line-height: 45px;
      background: #0055c2;
      border-bottom: 3px #377ad1 solid;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;
      > a {
        color: #ffffff;
        &:hover {
          background-color: #6495ED;
        }
      }
      &.list:hover {
        border: 1px solid #E5E5E5;
        border-top: none;
        background-color: #6495ED;
        color: #fff;
        >dl {
          display: block;
        }
      }
      dl {
        background: #f1f1f1;
        display: none;
        position: relative;
        z-index: 999;

        dd {
          line-height: 35px;
          &:hover {
            background-color:#0000CD;
            color: #fff;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
