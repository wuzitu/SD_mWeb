<template>
  <el-container>
    <el-header type="flex" justify="center">
      <el-col :lg="24" :xs="0">
        <el-pagination
          :background="true"
          layout="total ,prev, pager, next, jumper"
          :total="postData.searchNum"
          :current-page="postData.page"
          @current-change="onPageChange"
          :small="xsPgenav"
        ></el-pagination>
      </el-col>
      <!-- 小导航 -->
      <el-col :lg="0" :xs="24">
        <el-pagination
          :background="true"
          layout="prev , pager,next"
          :total="postData.searchNum"
          :current-page="postData.page"
          @current-change="onPageChange"
          small
        ></el-pagination>
      </el-col>
      <!-- 开关控制弹窗or新页面打开详情 -->
    </el-header>
    <el-main>
      <el-row
        v-loading.fullscreen.lock="listLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-col
          :lg="4"
          v-loading.fullscreen.lock="niudanLoading"
          element-loading-text="希望能得到你想要的机体！"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-button type="primary" plain @click="niudan">抽个扭蛋~</el-button>
        </el-col>
        <el-col :lg="10">
          <span>机体信息查看方式：</span>
          <el-switch
            style="display: block"
            v-model="detailEnableDlg"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="弹窗"
            inactive-text="新页面"
            @change="switchDetailEnable"
          ></el-switch>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="4">
          <h3 style="width:100%;" class="sm-none">24小时热搜机体</h3>
          <div class="robot-hot">
            <div class="robot-wraper">
              <a
                class="one-hot be-hand"
                v-for="(item, index) in h24List"
                :key="index"
                @click="detailView(item)"
              >
                <div class="avatar-hot">
                  <v-img
                    :src="`img/avatar/${item.ID}.png`"
                    :lazy-src="`img/avatar/${item.ID}.png`"
                    aspect-ratio="1"
                    class="deep-orange lighten-4 avatar-hot"
                  >
                    <el-col slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </el-col>
                  </v-img>
                </div>
                <p>{{item.Name}}</p>
              </a>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="robot-list">
            <a
              v-for="(item , index) in gundams"
              :key="index"
              @click="detailView(item)"
              class="be-hand robot-item"
            >
              <div style="width:100px;height:100px;">
                <v-img
                  :src="`img/avatar/${item.ID}.png`"
                  :lazy-src="`img/avatar/${item.ID}.png`"
                  aspect-ratio="1"
                  class="grey lighten-2 avatar"
                >
                  <el-col slot="placeholder" fill-height align-center justify-center ma-0>
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </el-col>
                </v-img>
              </div>
              <div class="robot-word">
                <div>
                  <strong>{{item.Name||item.model}}</strong>
                </div>
                <div
                  class="rank-font"
                  :style="`color: ${rankColor[GLOBAL.rankMap[item.rank]]};text-shadow: 0 0 20px ${rankColor[GLOBAL.rankMap[item.rank]]};`"
                >{{GLOBAL.rankMap[item.rank]}}</div>
                <div>评分{{item.rating}}</div>
              </div>
              <div v-if="!xsPgenav" :width="xsPgenav?20:280">
                <ve-radar
                  :data="buildCharts(item.ManMaoVal)"
                  width="200px"
                  height="120px"
                  :legend-visible="false"
                  :radar="radar"
                ></ve-radar>
              </div>
              <el-button @click="gotoManage(item)" v-if="getUrlKey('manage') == 'true'">进入编辑页</el-button>
            </a>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer type="flex" justify="center">
      <el-col :lg="24" :xs="0">
        <el-pagination
          :background="true"
          layout="total ,prev, pager, next, jumper"
          :total="postData.searchNum"
          :current-page="postData.page"
          @current-change="onPageChange"
        ></el-pagination>
      </el-col>
      <!-- 小导航 -->
      <el-col :lg="0" :xs="24">
        <el-pagination
          :background="true"
          layout="prev , pager,next"
          :total="postData.searchNum"
          :current-page="postData.page"
          @current-change="onPageChange"
          small
        ></el-pagination>
      </el-col>
    </el-footer>
    <ddialog
      :show="showDialog"
      @dialogData="closeDialog"
      :gundam="detailRobot"
      :comments="comments"
    ></ddialog>
  </el-container>
</template>

<script>
import ddialog from "./dialog";
import axios from "axios";
import secret from "../utils/secret";

export default {
  components: {
    ddialog: ddialog
  },
  data: () => ({
    detailEnableDlg: true,
    showDialog: false,
    loading: false,
    niudanLoading: false,
    detailRobot: {},
    comments: [],
    gundams: [],
    radar: {
      indicator: [
        { name: "血量", max: 20000 },
        { name: "攻击", max: 200 },
        { name: "防御", max: 200 },
        { name: "敏捷", max: 100 },
        { name: "机动", max: 200 },
        { name: "操控", max: 200 }
      ]
    },
    rankColor: {
      S: "#FB3F51",
      SS: "#F60018",
      SR: "#F60018",
      A: "#7F44D6",
      AS: "#4F10AD",
      AR: "#4F10AD",
      B: "#00AA72",
      BS: "#00AA72",
      BR: "#006E4A",
      BU: "#006E4A",
      C: "#FF8500",
      CS: "#FF8500",
      CR: "#A65600",
      CU: "#A65600"
    },
    h24List: [],
    pageInfo: {
      page: 1,
      pagesize: 10
    },
    postData: {
      page: 1,
      pagesize: 10,
      searchNum: 767
    }
  }),
  props: {
    GundataRes: Object,
    filterSearchStart: Boolean
  },
  watch: {
    GundataRes: function(newVal, oldVal) {
      // console.log(newVal);
      this.gundams = newVal.res;
      this.pageInfo = {
        page: newVal.postData.page,
        pagesize: newVal.postData.page
      };
      this.postData = newVal.postData;
    }
  },
  computed: {
    listLoading: {
      get: function() {
        if (this.filterSearchStart) {
          return true;
        }
        return this.loading;
      },
      set: function(val) {
        this.loading = this.filterSearchStart = val;
      }
    },
    xsPgenav: {
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
    niudan() {
      // this.niudanLoading = true;
      const h = this.$createElement;
      let _this = this;
      this.$notify({
        title: "功能开发中，敬请期待",
        message: h(
          "i",
          { style: "color: teal" },
          "欢迎发送一个扭蛋机图片素材给我^_^"
        )
      });

      // setTimeout(() => {
      //   let _id = Math.floor(Math.random() * 768 + 1);
      //   _this.niudanLoading = false;
      //   _this.openDialog({ ID: _this.robotIDList[_id] });
      //   this.$message({
      //     showClose: true,
      //     message: "祝贺你，获得新机体！",
      //     type: "success"
      //   });
      // }, 3000);
    },
    closeDialog(data) {
      if (typeof data == "boolean" || typeof data == "Boolean") {
        this.showDialog = data; //子组件触发父组件事件，进行数据变更，同步result数据
      }
      if (typeof data == "object" || typeof data == "Object") {
        this.showDialog = false;
        this.openDialog(data);
      }
    },
    switchDetailEnable: function(val) {
      localStorage.setItem("detailEnableDlg", this.detailEnableDlg);
    },
    getUrlKey: function(name) {
      let reg = `(^|&)${name}=([^&]*)(&|$)`;
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    // 判断打开详情方式
    detailView(gundam) {
      if (this.detailEnableDlg) {
        this.openDialog(gundam);
      } else {
        window.open(`/detail.html?id=${gundam.ID}`);
      }
    },
    // 打开弹窗之前，先发ajax请求
    openDialog(gundam) {
      let _this = this;
      _this.loading = true;
      let tmp = secret.Encrypt(JSON.stringify(gundam)).toString();
      // console.log(tmp)
      // let dtmp = JSON.parse(secret.Decrypt(tmp))
      // console.log(dtmp)
      _this.axios
        .post("/getGundam/findOne", { text: tmp }, { timeout: 40000 })
        .then(res => {
          // aes解密
          let resData = JSON.parse(secret.Decrypt(res.data));
          _this.loading = false;
          _this.showDialog = true;
          _this.detailRobot = resData.body;
        })
        .catch(err => {
          _this.handleError(err);
        });
      // comments
      _this.axios
        .post("/getGundam/TopComment", { text: tmp }, { timeout: 40000 })
        .then(res => {
          // aes解密
          let resData = JSON.parse(secret.Decrypt(res.data));
          // 为c机帝写段代码：
          // resData.forEach(ele => {
          //   if (ele.openid == oEH945MLNlWqiI3JlhNLaCRMuIhs) {
          //   }
          // });
          let tmp = resData.body || [];
          tmp.sort(function(a, b) {
            return b.zan - a.zan;
          });
          _this.comments = tmp;
        })
        .catch(err => {
          // _this.handleError(err);
        });
    },
    // 管理机体
    gotoManage(gundam) {
      // console.log(this.getUrlKey("sess"));
      window.open(
        "/dbmanager.html" +
          window.location.search.replace(/\&id.+/, "") +
          `&id=${gundam.ID}`,
        "_blank"
      );
      // window.location.href =
      //   "/dbmanager.html" +
      //   window.location.search.replace(/\&id.+/, "") +
      //   `&id=${gundam.ID}`;
    },
    loadMore() {
      let _this = this;
      this.busy = true;
      //把busy置位true，这次请求结束前不再执行
      setTimeout(() => {
        _this.pageInfo.page++;
        _this.loadPage();
        //调用获取数据接口，并且传入一个true，让axios方法指导是否需要拼接数组。
      }, 500);
    },
    loadPage() {
      // let _this = this;
      // let page = _this.pageInfo.page,
      //   pagesize = _this.pageInfo.pagesize;
      // this.axios
      //   .get(`/getGundam?pagesize=${pagesize}&page=${page}`)
      //   .then(res => {
      //     // console.log(res);
      //     _this.gundams = _this.gundams.concat(res.data);
      //   });
      this.onPageChange(1);
    },
    onPageChange(val) {
      let _this = this;
      _this.loading = true;
      _this.postData.page = val;
      let pagesize = _this.postData.pagesize;
      this.axios
        // .get(`/getGundam?pagesize=${pagesize}&page=${val}`)
        .post(`/getGundam/FilterSearch`, _this.postData, { timeout: 40000 })
        .then(res => {
          // console.log(res);
          let resData = JSON.parse(secret.Decrypt(res.data));
          _this.gundams = resData.res;
          _this.loading = false;
        })
        .catch(err => {
          _this.handleError(err);
        });
    },
    handleError(err) {
      this.loading = false;
      this.$message({
        showClose: true,
        message: "网络错误，请刷新页面！",
        type: "error"
      });
    },
    buildCharts(val) {
      let o = {
        攻击: val.att,
        血量: val.HP,
        防御: val.def,
        机动: val.fly,
        操控: val.ctl,
        敏捷: val.agility,
        机体数据: "机体数据"
      };
      let tmp = {
        // columns: ["机体数据", "血量", "敏捷", "机动", "操控"],
        columns: ["机体数据", "血量", "攻击", "防御", "敏捷", "机动", "操控"],
        rows: [o]
      };
      return tmp;
    }
  },
  mounted() {
    this.loadPage();
    let tmp = localStorage.getItem("detailEnableDlg");
    tmp = tmp ? localStorage.getItem("detailEnableDlg") == "true" : true;
    this.detailEnableDlg = tmp;
    // 24h 热搜
    let _this = this;
    _this.axios
      .post("/getGundam/h24List", {}, { timeout: 40000 })
      .then(res => {
        // aes解密
        let resData = JSON.parse(secret.Decrypt(res.data));
        _this.h24List = resData.body;
        console.log(resData);
      })
      .catch(err => {
        _this.handleError(err);
      });
  }
};
</script>

<style>
.img-responsive {
  max-width: 120px;
  height: 120px;
  /* padding-bottom: 10%; */
  /* overflow: hidden; */
}
.img-responsive img {
  width: 100%;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.be-hand {
  cursor: pointer;
}
.ManMaoVal {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 148px;
}
.ManMaoSum {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 140px;
}
.avatar {
  width: 100px;
  height: 100px;
  margin: 5px;
}
.robot-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  width: 100%;
}
.robot-hot {
  height: 600px;
  overflow-y: auto;
  display: block;
  margin: 0;
}
.robot-item {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  height: 120px;
  width: 500px;
}
.robot-item:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.robot-word {
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
}
strong {
  font: "微软雅黑", "Lucida Grande", "Lucida Sans", Helvetica, Arial, Sans;
}
.rank-font {
  font: bold 15px/100% "微软雅黑", "Lucida Grande", "Lucida Sans", Helvetica,
    Arial, Sans;
  text-transform: uppercase;
}
.one-hot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90px;
  margin-right: 5px;
}
.one-hot:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.robot-wraper {
  display: flex;
  flex-wrap: wrap;
}
.avatar-hot {
  width: 60px;
  height: 60px;
  margin: 0 auto;
}

@media screen and (max-width: 600px) {
  .robot-item {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 40%;
    border-radius: 5px;
    height: 120px;
    width: 100%;
  }
  .robot-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
  }
  .robot-hot {
    width: 0;
    display: none;
  }
  .sm-none {
    width: 0;
    display: none;
  }
}
</style>
