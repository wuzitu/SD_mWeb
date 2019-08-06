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
      <el-row>
        <el-col :lg="14">
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
      <el-row type="flex" justify="center">
        <el-col :lg="14">
          <el-table
            id="Robot_table"
            :data="gundams"
            style="width: 100%"
            :show-header="true"
            :row-style="{height:40}"
            v-loading.fullscreen.lock="listLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <el-table-column
              prop="Name"
              label="编辑机体内容"
              :width="xsPgenav?120:180"
              v-if="getUrlKey('manage') == 'true'"
            >
              <template slot-scope="scope">
                <el-button @click="gotoManage(scope.row)">进入编辑页</el-button>
                <!-- <a
                  :href="'/dbmanager.html' +
        window.location.search.replace(/\&id.+/, '') +
        `&id=${scope.row.ID}`"
                >进入编辑页</a>-->
              </template>
            </el-table-column>
            <el-table-column
              prop="AvatarUrl_local"
              label="点击查看详情"
              :width="xsPgenav?100:180"
              size="small"
            >
              <template slot-scope="scope">
                <a @click="detailView(scope.row)" class="be-hand">
                  <div class="img-responsive">
                    <!-- <img :src="scope.row.AvatarUrl_local"> -->
                    <v-img
                      :src="`img/avatar/${scope.row.ID}.png`"
                      :lazy-src="`img/avatar/${scope.row.ID}.png`"
                      aspect-ratio="1"
                      class="grey lighten-2"
                    >
                      <el-col slot="placeholder" fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </el-col>
                    </v-img>
                  </div>
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="Name" label="名称" :width="xsPgenav?120:180">
              <template slot-scope="scope">
                <a class="be-hand">{{scope.row.Name || scope.row.model}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="rank" label="rank" :width="xsPgenav?20:60"></el-table-column>
            <el-table-column prop="rating" label="漫猫评分" width="60" v-if="!xsPgenav"></el-table-column>
            <el-table-column label="能力值" v-if="!xsPgenav" :width="xsPgenav?20:280">
              <template slot-scope="scope">
                <!-- <table class="ableList">
                  <tr>
                    <td>攻击</td>
                    <td>防御</td>
                    <td>机动</td>
                    <td>操控</td>
                    <td>4D综合</td>
                    <td>3D综合</td>
                  </tr>
                  <tr>
                    <td style="width:40px">{{scope.row.att}}</td>
                    <td style="width:40px">{{scope.row.def}}</td>
                    <td style="width:40px">{{scope.row.fly}}</td>
                    <td style="width:40px">{{scope.row.ctl}}</td>
                    <td style="width:40px">{{scope.row.D4sum}}</td>
                    <td style="width:40px">{{scope.row.D3sum}}</td>
                  </tr>
                </table>-->
                <v-progress-linear color="secondary" height="2" value="15" style="width:200px"></v-progress-linear>

                <el-row type="flex" class="row-bg">
                  <div class="ManMaoVal">
                    <el-row type="flex">
                      <div>攻击</div>
                      <el-progress :percentage="20" :show-text="false" style="width:80%"></el-progress>
                    </el-row>
                    <el-row type="flex">
                      <div>防御</div>
                      <el-progress :percentage="70" :show-text="false" style="width:80%"></el-progress>
                    </el-row>
                    <el-row type="flex">
                      <div>机动</div>
                      <el-progress :percentage="100" :show-text="false" style="width:80%"></el-progress>
                    </el-row>
                    <el-row type="flex">
                      <div>操控</div>
                      <el-progress :percentage="50" :show-text="false" style="width:80%"></el-progress>
                    </el-row>
                  </div>
                  <div class="ManMaoSum">
                    <div>3D综合</div>
                    <div>4D综合</div>
                  </div>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
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
    <ddialog :show="showDialog" @dialogData="closeDialog" :gundam="detailRobot"></ddialog>
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
    detailRobot: {},
    gundams: [],
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
      this.gundams = newVal.data.res;
      (this.pageInfo = {
        page: newVal.data.postData.page,
        pagesize: newVal.data.postData.page
      }),
        (this.postData = newVal.data.postData);
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
          _this.gundams = res.data.res;
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
    }
  },
  mounted() {
    this.loadPage();
    let tmp = localStorage.getItem("detailEnableDlg");
    tmp = tmp ? localStorage.getItem("detailEnableDlg") == "true" : true;
    this.detailEnableDlg = tmp;
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
.ableList {
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
</style>
