<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-dialog
      :visible.sync="getshow"
      width="60%"
      center
      :fullscreen="showFullDlg"
      :custom-class="''"
    >
      <el-row>
        <el-col :lg="8" :xs="8">
          <!-- <el-button @click="getOwnRobot" type="success" v-if="!gundam.getown" disabled="true">认领机体</el-button> -->
          <v-img
            id="Avatar_dlg"
            :src="`img/avatar/${gundam.ID}.png`"
            :lazy-src="`img/avatar/${gundam.ID}.png`"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="120"
          >
            <el-col slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </el-col>
          </v-img>
        </el-col>
        <el-col :lg="6" :xs="14">
          <h2 class="h2">{{gundam.Name || gundam.model}}</h2>
          <div style="font-size:10px;">{{gundam.nameEN}}</div>
          <div>
            Rank:
            <strong class="h3">{{gundam.rank}}</strong>
          </div>
          <!-- <div>
            机体ID：
            <strong>{{gundam.ID}}</strong>
          </div>-->
          <div>{{gundam.landType}} {{gundam.fightType}}</div>
          <div>评分： {{gundam.rating}}</div>
          <div v-if="false">稀有度：{{gundam.rare}}</div>
          <div v-if="false">强度：{{gundam.strength}}</div>
        </el-col>
        <el-col :lg="10">
          <div>梦服状态：{{newState}}</div>
          <div>登场时间：{{gundam.birth_date || '未知'}}</div>
          <br>
          <div v-if="gundam.get_way">获取途径：{{gundam.get_way}}</div>
          <div v-if="gundam.GB_sale">GB价格：{{gundam.GB_sale}}</div>
          <div v-if="gundam.MB_sale">MB价格：{{gundam.MB_sale}}</div>
          <div v-if="gundam.map_sale">图纸价格：{{gundam.map_sale}}</div>
          <br>
          <!-- <div v-if="gundam.coding">代码：{{gundam.coding}}</div>
          <br>
          <div v-if="gundam.needReview">(代码审核中)</div>
          <div v-if="!gundam.needReview">
            <el-button
              @click="openCodeDlg"
              type="success"
              v-if="!gundam.needReview"
              size="small"
            >代码提交/纠错</el-button>
          </div>-->
        </el-col>
      </el-row>
      <br>
      <p>机体参数：</p>
      <el-row>
        <el-col class="border-l" :lg="4" :xs="24">
          繁体名称
          <br>
          {{gundam.nameCN_G || "N/A"}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          攻击
          <br>
          {{gundam.ManMaoVal.att}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          防御
          <br>
          {{gundam.ManMaoVal.def}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          机动
          <br>
          {{gundam.ManMaoVal.fly}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          操控
          <br>
          {{gundam.ManMaoVal.ctl}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          4D总合
          <br>
          {{gundam.ManMaoVal.D4sum}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          3D总合
          <br>
          {{gundam.ManMaoVal.D3sum}}
        </el-col>
        <el-col class="canshu" :lg="2" :xs="6">
          Boost
          <br>
          {{gundam.para.boost}}
        </el-col>
        <el-col class="canshu" :lg="4" :xs="6">
          回气/消耗
          <br>
          {{gundam.para.boost_back|| '-'}}/{{gundam.para.boost_usage || '-'}}
        </el-col>
      </el-row>

      <el-row>
        <el-col class="border-l2" :lg="2" :xs="6">
          敏捷
          <br>
          {{gundam.ManMaoVal.agility || '-'}}{{gundam.ManMaoVal.agility2?'/'+gundam.ManMaoVal.agility2:''}}
        </el-col>
        <el-col class="canshu2" :lg="2" :xs="6">
          速度
          <br>
          {{gundam.ManMaoVal.fly || '-'}}{{gundam.ManMaoVal.fly2?'/'+gundam.ManMaoVal.fly2:''}}
        </el-col>
        <el-col class="canshu2" :lg="2" :xs="6">
          血量
          <br>
          {{gundam.ManMaoVal.HP || '-'}}
        </el-col>
        <el-col class="canshu2" :lg="2" :xs="6">
          索敌
          <br>
          {{gundam.ManMaoVal.dect || '-'}}
          <br>
          {{gundam.ManMaoVal.dect2?'R2:'+gundam.ManMaoVal.dect2:''}}
        </el-col>
        <el-col class="canshu2" :lg="6" :xs="6">
          机动数据
          <br>
          R1:{{gundam.ManMaoVal.boost_time}}
          <br>
          {{gundam.ManMaoVal.boost_time2?'R2:'+gundam.ManMaoVal.boost_time2:''}}
        </el-col>
      </el-row>

      <p>梦服情报</p>
      <el-row></el-row>
      <!-- 合成需要 -->
      <p v-if="gundam.makeNeed&&gundam.makeNeed.length">合成需要：</p>
      <el-row>
        <el-col>
          <el-card v-for="(robots) in gundam.makeNeed" :key="robots.ID" class="mk-card">
            <a :title="robots.name" href="#Avatar_dlg" @click="updateGundam(robots)">
              <v-img
                :src="`img/avatar/${robots.id}.png`"
                :lazy-src="`img/avatar/${robots.id}.png`"
                aspect-ratio="1"
                :class="robots.role&&robots.role == 'key'? 'as-key':''"
                max-width="60"
              ></v-img>
              <br>
              <span class="mkcard-word">{{robots.name}}：{{robots.Level}}</span>
            </a>
          </el-card>
        </el-col>
      </el-row>
      <!-- 国服合成需要makeNeed_CN -->
      <p v-if="gundam.makeNeed_CN&&gundam.makeNeed_CN.length">国服合成需要：</p>
      <el-row>
        <div>
          <el-card v-for="(robots) in gundam.makeNeed_CN" :key="robots.ID" class="mk-card">
            <a :title="robots.name" href="#Avatar_dlg" @click="updateGundam(robots)">
              <v-img
                :src="`img/avatar/${robots.id}.png`"
                :lazy-src="`img/avatar/${robots.id}.png`"
                aspect-ratio="1"
                :class="robots.role&&robots.role == 'key'? 'as-key':''"
                max-width="60"
              ></v-img>
              <br>
              <span class="mkcard-word">{{robots.name}}：{{robots.Level}}</span>
            </a>
          </el-card>
        </div>
      </el-row>
      <!-- 用于合成 -->
      <p v-if="gundam.toMake&&gundam.toMake.length">用于合成：</p>
      <el-row v-if="gundam.toMake&&gundam.toMake.length">
        <div>
          <el-card v-for="(robots) in gundam.toMake" :key="robots.ID" class="mk-card">
            <a :title="robots.name" href="#Avatar_dlg" @click="updateGundam(robots)">
              <v-img
                :src="`img/avatar/${robots.id}.png`"
                :lazy-src="`img/avatar/${robots.id}.png`"
                aspect-ratio="1"
                :class="robots.role&&robots.role == 'as-ke'? 'as-key':''"
                max-width="60"
              ></v-img>
              <br>
              <span class="mkcard-word">{{robots.name}}：{{robots.Level}}</span>
            </a>
          </el-card>
        </div>
      </el-row>

      <!-- 扭蛋 -->
      <el-row>
        <span v-if="gundam.Machine&&gundam.Machine.length">扭蛋机：</span>
        <el-tag v-for="(Num, index) in gundam.Machine" :key="index">{{Num}}</el-tag>
      </el-row>
      <!-- 更多信息 -->
      <el-row>
        <p>其他信息：</p>
        <p>-势力：{{gundam.force}}</p>
        <p>-{{gundam.feature}}</p>
        <p>-出自作品：{{gundam.from}}</p>
        <p>-驾驶员：{{gundam.pilot}}</p>
        <p v-if="gundam.comment">机体简评：{{gundam.comment}}</p>
        <p>
          机体story：
          <br>
          {{gundam.story}}
        </p>
      </el-row>
      <el-row type="flex" align="start" v-if="gundam.contributor && gundam.contributor.length">
        贡献者名单：
        <el-tag v-for="(p) in gundam.contributor" :key="p" type="info">{{p}}</el-tag>
      </el-row>分享机体：
      <share :config="shareconfig" v-if="!this.loading && this.getshow"></share>
      <br>
      <el-button type="primary" @click="getshow = false">关闭详情</el-button>

      <!-- 内层dialog，用于读取数据加载间隙 -->
      <!-- <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        v-loading.fullscreen.lock="loading"
      >请稍后</el-dialog>-->
      <el-dialog
        width="30%"
        title="提交单机版机体代码"
        :visible.sync="codeDlg"
        append-to-body
        :fullscreen="showFullDlg"
      >
        <p>格式1：R1代码/R2代码 (eg: 5D 56/5E 56)</p>
        <p>格式2：R1代码/特殊代码 (eg: AB 3A/ 黄金版：E1 3A)</p>
        <el-input v-model="gundam.coding" placeholder="AB CD/EF GH" size="small" maxlength="30"></el-input>
        <br>
        <el-alert
          title="感谢贡献"
          type="warning"
          :closable="false"
          description="提交前请确认一下准确性，更新内容是为了方便大家，感谢你的贡献。"
        ></el-alert>
        <div v-if="!hasCoding">
          <p style="font-size:10px">如果愿意，请留下你的名字/ID，我们会记录贡献者的名单</p>
          <el-input v-model="contributor" placeholder="Name" size="small" maxlength="30"></el-input>
        </div>
        <el-row type="flex" align="start" v-if="gundam.contributor && gundam.contributor.length">
          贡献者名单：
          <el-tag v-for="(p) in gundam.contributor" :key="p" type="info">{{p}}</el-tag>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="codeDlg = false">取 消</el-button>
          <el-button type="primary" @click="submitCoding">提交审核</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import secret from "../utils/secret";

export default {
  data() {
    return {
      loading: false,
      fullscreenLoading: false,
      codeDlg: false,
      hasCoding: false,
      contributor: ""
    };
  },
  computed: {
    getshow: {
      get: function() {
        return this.show || false;
      },
      set: function() {
        this.$emit("dialogData", false);
      }
    },
    shareconfig: {
      get: function() {
        return {
          url: `${window.location.href.split("/#")[0]}/detail.html?id=${
            this.gundam.ID
          }`, // 网址，默认使用 window.location.href
          // source: "http://sdplayer.club", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
          title: `${this.gundam.Name}-SD玩家要塞-SD敢达机体数据库`, // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
          // description: "", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
          image: `https://www.sdplayer.club/img/avatar/${this.gundam.ID}.png`, // 图片, 默认取网页中第一个img标签
          // sites: ["qzone", "qq", "weibo", "wechat", "douban"], // 启用的站点
          disabled: ["linkedin", "diandian", "google", "tencent"], // 禁用的站点
          wechatQrcodeTitle: "", // 微信二维码提示文字
          wechatQrcodeHelper:
            "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
        };
      },
      set: function(val) {
        return val;
      }
    },
    showFullDlg: {
      get: function() {
        let ScreenWidth = document.body.clientWidth;
        return ScreenWidth < 768 ? true : false;
      },
      set: function(val) {
        return val;
      }
    },
    newState: {
      get: function() {
        if (this.gundam.newState) return this.gundam.newState;
        if (this.gundam.get_way) return "已登场";
        return "未知";
      }
    }
  },
  props: {
    show: Boolean,
    gundam: Object
  },
  updated: function() {
    var div = document.querySelector(".el-dialog__wrapper");
    // div.scrollTop = div.scrollHeight;
    div.scrollTop = 0;
  },
  methods: {
    openCodeDlg: function() {
      this.hasCoding = this.gundam.coding ? true : false;
      this.codeDlg = true;
    },
    submitCoding: function() {
      this.gundam.needReview = true;
      this.loading = true;
      // 贡献者
      if (!this.gundam.contributor) {
        this.gundam.contributor = [];
      }
      if (this.contributor.trim()) {
        if (!this.gundam.contributor.includes(this.contributor.trim()))
          this.gundam.contributor.push(this.contributor);
      }
      this.axios
        .post("/DBmanage/commitCoding", this.gundam)
        .then(res => {
          this.loading = this.codeDlg = false;
          if (res.data.status && res.data.status == "ok") {
            this.gundam.needReview = true;
            this.$message({
              showClose: true,
              message: "提交成功，请耐心等待审核！",
              type: "success"
            });
          }
        })
        .catch(err => {
          this.loading = this.codeDlg = false;
          this.$message({
            showClose: true,
            message: "提交失败，可能遇到了一些错误...",
            type: "error"
          });
        });
    },
    specialWeapon: function(num) {
      var map = {
        "10": "乱舞型",
        "11": "全弹发射型",
        "12": "地图炮型"
      };
      return map[this.gundam[`weapon${num}`].special] || false;
    },
    updateGundam: function(robot) {
      // this.$emit("dialogData", robot);
      this.gundam.AvatarUrl_TW = "img/loading.gif";
      this.loading = true;
      let tmp = secret.Encrypt(JSON.stringify(robot)).toString();
      this.axios
        .post("/getGundam/findOne", { text: tmp }, { timeout: 40000 })
        .then(res => {
          // res.data.weaponTable = res.data.weaponTable.replace(
          //   /https\:\/\/www.olgame\.tw\/sds\/images\/weapon\/weapon_/g,
          //   "http://cdn.sdplayer.club/weapon/"
          // );
          let resData = JSON.parse(secret.Decrypt(res.data));
          this.gundam = resData.body;
          this.loading = false;
          var div = document.querySelector(".el-dialog__wrapper");
          // div.scrollTop = div.scrollHeight;
          div.scrollTop = 0;
        });
    },
    getOwnRobot() {
      this.$confirm(
        "尊敬的机师，你能否确定能准确负责地进行为期<strong>3天</strong>的资料更新?<br><strong>请一定要！ <i>保存！</i> 编辑页面的网址！</strong><br>说明：每个IP只能维护一台机体，维护，资料贡献后请把名字留下来，我们会在网站上留下你的名字。",
        "确认修改，请存储新页面的网址链接！",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "正在认领!"
          });
          this.loading = true;
          this.axios
            .post("/DBmanage/getown", { ID: this.gundam.ID })
            .then(res => {
              this.loading = false;
              if (res.data.includes("err")) {
                this.$message({
                  showClose: true,
                  message: res.data,
                  type: "error"
                });
              }
              window.location.href = res.data;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消认领"
          });
        });
    }
  }
};
</script>

<style>
.img-responsive {
  max-width: 100%;
  height: 110px;
  padding-bottom: 20%;
  overflow: hidden;
}
.img-responsive img {
  width: 42%;
}
.img-responsive-sub {
  max-width: 100%;
  width: 80px;
  height: 100px;
  padding-bottom: 10%;
  overflow: hidden;
  margin-right: 20px;
}
.img-responsive-sub img {
  width: 50%;
}
.as-key {
  background: palevioletred;
}
.mk-card {
  width: 150px;
  height: 130px;
  position: relative;
  float: left;
}
.mkcard-word {
  font-size: 8px;
}
.dlg-body {
  background-color: #f0f4c3 !important;
}
.canshu {
  height: 50px;
  border: 1px solid #dcdfe6;
  border-left-style: none;
}
.canshu2 {
  height: 60px;
  border: 1px solid #dcdfe6;
  border-left-style: none;
}
.border-l {
  height: 50px;
  border: 1px solid #dcdfe6;
  overflow: hidden;
}
.border-l2 {
  height: 60px;
  border: 1px solid #dcdfe6;
}
</style>
