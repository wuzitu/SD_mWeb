<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-aside width="200px" height="200px" class="aside">
          <a href="./rank"><el-button type="danger" plain round>胜率天梯榜(点我看)</el-button></a>
          <img src="img\logo\logo.png" style="width: 150px">
          <ul style="font-size:8px">
            <li>数据内容整合自网络，如有侵权或其他问题，请联系我们修改删除。</li>
            <li>维护网站不易，转载请注明出处。</li>
            <li>不要用网站数据谋取非法利益。</li>
          </ul>
          <img src="img\logo\weixin.jpg" style="width: 150px">
          <li>
            更多网站：
            <br>
            <a
              style="margin-right:10px;"
              href="https://tieba.baidu.com/f?kw=sd敢达&ie=utf-8"
              target="_blank"
              rel="noopener noreferrer"
            >SD敢达吧</a>

            <a href="http://www.jianbinguozi.com" target="_blank" rel="noopener noreferrer">SD煎饼果子</a>
          </li>
        </el-aside>
        <el-main>
          <div class="wx-header">
            <img src="img\logo\weixin2.jpg" style="width: 100%">
            <p style="margin-top: 40px;">手机端使用小程序获得更好的体验！</p>
            <p style="margin-top: 40px;">移动端需要左右滑动筛选区域.</p>
          </div>
          <searchBlock @filterSearchData="searchDataRes" @finding="finding"></searchBlock>
        </el-main>
      </el-container>
      <el-row type="flex" justify="center">
        <RobotList :GundataRes="GundataRes" :filterSearchStart="filterSearchStart"></RobotList>
      </el-row>
      <el-footer id="footer">
        SD玩家要塞的资料收集和更新花费了很多精力，
        <strong>转载请注明出处</strong>，谢谢。
        <el-button type="success" @click="donateVisible = !donateVisible">了解网站、关注与捐助</el-button>
        <br>备用地址
        <a href="http://sdplayer.club/" target="_blank">sdplayer.club</a>
        <a href="http://go.sdplayer.club/" target="_blank"  style="margin-left:20px;">go.sdplayer.club</a>
        <a href="http://www.sdplayer.club/" target="_blank" style="margin-left:20px;">www.sdplayer.club(全球)</a>
        <a href="http://www.sdgundam.co/" target="_blank" style="margin-left:20px;">www.sdgundam.co</a>
        <br>©2018-2020 SD玩家要塞
        <br>
        <a href="//sdplayer.club/" target="_blank">
          <b>SDplayer.club</b>
        </a>(
        <a href="http://www.miitbeian.gov.cn/" target="_blank">晋ICP备18014253号</a>)
      </el-footer>
      <el-dialog
        title="我们继续发梦，直到梦想成真"
        :visible.sync="donateVisible"
        width="50%"
        :fullscreen="showFullDlg"
      >
        <span>
          <donateBlock></donateBlock>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="donateVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import RobotList from "../../components/RobotList";
// import h24List from "../../components/h24List";
import searchBlock from "../../components/searchBlock";
import donateBlock from "../../components/donateBlock";

export default {
  name: "app",
  components: {
    RobotList: RobotList,
    searchBlock: searchBlock,
    donateBlock: donateBlock
  },
  data() {
    return {
      GundataRes: {},
      filterSearchStart: false,
      donateVisible: false
    };
  },
  computed: {
    showFullDlg: {
      get: function() {
        let ScreenWidth = document.body.clientWidth;
        return ScreenWidth < 768 ? true : false;
      },
      set: function(val) {
        return val;
      }
    }
  },
  methods: {
    searchDataRes(res) {
      let _this = this;
      _this.GundataRes = res;
    },
    finding(state) {
      this.filterSearchStart = state;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.donate-block {
  position: relative;
  float: right;
  top: -150px;
}
#footer a {
  margin: 0;
  padding: 0;
  border: 0;
  font: 12px/1.5 Tahoma, "Microsoft Yahei", "Simsun";
  color: #333;
  text-decoration: none;
  list-style: none;
}
.wx-header {
  display: none;
}
@media screen and (max-width: 600px) {
  .aside {
    display: none;
  }
  .wx-header {
    display: block;
  }
}
</style>
