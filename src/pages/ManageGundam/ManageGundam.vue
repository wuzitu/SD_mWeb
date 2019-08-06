<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h1 v-if="this.getUrlKey('manage') != 'true'">请保管好该网址，以便下次访问！！网址只生成一次！！！</h1>
    <h1 v-if="this.getUrlKey('manage') != 'true'">一定要存！！！</h1>
    <el-form label-width="120px">
      <h2>机体ID:{{gundam.ID}}</h2>
      
      <!-- <el-checkbox v-model="gundam.reviewOK" v-if="this.getUrlKey('manage') == 'true'">审核通过（审核时用,勾选后才会更新到网站上。更新频率为1小时。）</el-checkbox>
 <el-button type="primary" @click="submitGundam">我填完啦，保存一下！</el-button> -->
      <h2 v-if="this.getUrlKey('manage') != 'true'">权限结束时间:{{gundam.endTime}}</h2>
      <el-row type="flex" justify="start">
        <el-col :lg="8" :xs="8">
          <v-img
            id="Avatar_dlg"
            :src="`img/avatar/${gundam.ID}.gif`"
            :lazy-src="`img/avatar/${gundam.ID}.gif`"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="120"
          >
            <el-col slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </el-col>
          </v-img>
          <br>
          <span>图片路径：</span>
          <el-input v-model="gundam.avatarURL"></el-input>
        </el-col>

        <el-col :lg="6" :xs="14">
          <div class="inp-block">中文名称:
            <el-input v-model="gundam.Name"></el-input>
          </div>
          <div class="inp-block">英文名称:
            <el-input v-model="gundam.Name_en"></el-input>
          </div>
          <div class="inp-block">rank:
            <el-input v-model="gundam.rank"></el-input>
          </div>
          <div class="inp-block">陆地类型:
            <el-input v-model="gundam.landType"></el-input>
          </div>
          <div class="inp-block">战斗类型:
            <el-input v-model="gundam.fightType"></el-input>
          </div>
          <div class="inp-block">参考评分:
            <el-input v-model="gundam.rating"></el-input>
          </div>
          <div class="inp-block">机体血量:
            <el-input v-model="gundam.life"></el-input>
          </div>
          <div class="inp-block">代码:
            <el-input v-model="gundam.coding"></el-input>
            <el-button v-if="this.getUrlKey('manage') == 'true' && !gundam.reviewOK == true" @click="submitGundam('reviewOK')" type="success">一键审核通过！</el-button>
          </div>
        </el-col>
        <el-col :lg="10">
          <div class="inp-block">梦服状态：
            <el-input v-model="gundam.newState"></el-input>
          </div>
          <div class="inp-block">登场时间：
            <el-input v-model="gundam.birth_date"></el-input>
          </div>
          <div class="inp-block">(直接写★)稀有度：
            <el-input v-model="gundam.rare"></el-input>
          </div>
          <div class="inp-block">(直接写★)强度：
            <el-input v-model="gundam.strength"></el-input>
          </div>
          <div class="inp-block">获取途径：
            <el-input v-model="gundam.get_way"></el-input>
          </div>
          <div class="inp-block">GB价格：
            <el-input v-model="gundam.GB_sale"></el-input>
          </div>
          <div class="inp-block">MB价格：
            <el-input v-model="gundam.MB_sale"></el-input>
          </div>
          <div class="inp-block">图纸价格：
            <el-input v-model="gundam.map_sale"></el-input>
          </div>
        </el-col>
      </el-row>

      <br>
      <el-row>
        <el-col :lg="12" :xs="24">
          <table width="90%">
            <tbody>
              <tr>
                <td colspan="6" align="center" bgcolor="#FFFFFF">机体数值</td>
              </tr>
              <tr>
                <td bgcolor="#666699">
                  <font color="#FFFFFF">攻击</font>
                </td>
                <td bgcolor="#666699">
                  <font color="#FFFFFF">防御</font>
                </td>
                <td bgcolor="#666699">
                  <font color="#FFFFFF">机动</font>
                </td>
                <td bgcolor="#666699">
                  <font color="#FFFFFF">操控</font>
                </td>
                <td bgcolor="#666699">
                  <font color="#FFFFFF">4D综合</font>
                </td>
                <td bgcolor="#666699">
                  <font color="#FFFFFF">3D综合</font>
                </td>
              </tr>
              <tr>
                <td>
                  <el-input v-model="gundam.att"></el-input>
                </td>
                <td>
                  <el-input v-model="gundam.def"></el-input>
                </td>
                <td>
                  <el-input v-model="gundam.fly"></el-input>
                </td>
                <td>
                  <el-input v-model="gundam.ctl"></el-input>
                </td>
                <td>
                  <el-input v-model="gundam.D4sum"></el-input>
                </td>
                <td>
                  <el-input v-model="gundam.D3sum"></el-input>
                </td>
              </tr>
            </tbody>
          </table>
        </el-col>
        <el-col :lg="12" :xs="24">
          <table>
            <tbody>
              <tr>
                <td bgcolor="#666699" style="width:240px">
                  <font color="#FFFFFF">繁体名称</font>
                </td>
                <td bgcolor="#666699">
                  <font color="#FFFFFF">冲刺时间</font>
                </td>
                <td bgcolor="#666699">
                  <font color="#FFFFFF">跳跃时间</font>
                </td>
                <td bgcolor="#666699">
                  <font color="#FFFFFF">索敌距离</font>
                </td>
                <!-- <td bgcolor="#666699">
                  <font color="#FFFFFF"> </font>
                </td>
                <td bgcolor="#666699">
                  <font color="#FFFFFF"> </font>
                </td>-->
              </tr>
              <tr>
                <td>
                  <el-input v-model="gundam.nameCN_G" type="textarea" autosize></el-input>
                </td>
                <td>
                  <el-input v-model="gundam.rushTime" type="textarea" autosize></el-input>
                </td>
                <td>
                  <el-input v-model="gundam.jumpTime" type="textarea" autosize></el-input>
                </td>
                <td>
                  <el-input v-model="gundam.Radar_distance" type="textarea" autosize></el-input>
                </td>
              </tr>
            </tbody>
          </table>
        </el-col>
      </el-row>

      <h1>武器数据 可以参考飞雪等网站。</h1>
      <el-row>
        <el-dialog title="选择图片" :visible.sync="dialogVisible" width="60%">
          <el-row v-if="dlgType == 'weapon'">
            <el-card v-for="(i) in weaponID" :key="i" style="width=20px; float:left">
              <el-button>
                <img :src="`img/weapon/${i}.gif`" @click="setWeapon(i)">
              </el-button>
            </el-card>
          </el-row>
          <el-row v-if="dlgType == 'skill'">
            <el-card v-for="(i) in skillList" :key="i" style="width=20px; float:left">
              <el-button>
                <img :src="`img/skill/${i}.gif`" @click="setSkill(i)">
              </el-button>
            </el-card>
          </el-row>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>-->
        </el-dialog>
        <!-- weapon1 -->
        <el-col :lg="12" :xs="24">
          <table width="100%" border="0" cellpadding="3" cellspacing="0" class="table_border">
            <tbody>
              <tr class="txt_1">
                <td colspan="3" align="left" bgcolor="#FFFFCC" class="border1">武装一</td>
                <td bgcolor="#FFFFCC" class="border1">
                  <el-form-item label="必杀：">
                    <el-select v-model="gundam.weapon1.special" placeholder="必杀类型">
                      <el-option label="乱舞型" value="10"></el-option>
                      <el-option label="全弹发射型" value="11"></el-option>
                      <el-option label="地图炮型" value="12"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td bgcolor="#FFFFCC" class="border1">
                  <span class="border2">
                    <img :src="`img/skill/${gundam.weapon1.special}.gif`">
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <table width="100%" border="0" cellpadding="3" cellspacing="0" class="table_border">
            <tbody>
              <div v-for="(weapon,index) in gundam.weapon1.arms" :key="index">
                <tr>
                  <td width="150" height="50" align="center" bgcolor="#FFFFFF" class="border1">
                    图片：
                    <img
                      id="inp11img"
                      :src="weapon.imgID&&`img/weapon/${weapon.imgID}.gif`||'img/weapon/0.gif'"
                      border="0"
                      @click="openImgDlg('weapon',{statusNum: '1', index:index})"
                    >
                  </td>
                  <td colspan="4" align="left" bgcolor="#FFFFFF">
                    <div class="inp-block">武器名称：
                      <el-input v-model="weapon.name"></el-input>
                    </div>
                    <div class="inp-block">判定：
                      <el-input v-model="weapon.panding"></el-input>
                    </div>
                    <div class="inp-block">射程：
                      <el-input v-model="weapon.distance"></el-input>
                    </div>
                    <div class="inp-block">系数：
                      <el-input v-model="weapon.xishu"></el-input>
                    </div>
                    <div class="inp-block">攻速倍率：
                      <el-input v-model="weapon.attSpeed"></el-input>
                    </div>
                  </td>
                  <td>
                    <div class="inp-block">延迟：
                      <el-input v-model="weapon.ping"></el-input>
                    </div>
                    <div class="inp-block">弹数：
                      <el-input v-model="weapon.shotNum"></el-input>
                    </div>
                    <div class="inp-block">回弹：
                      <el-input v-model="weapon.huidan"></el-input>
                    </div>
                    <div class="inp-block">冷却：
                      <el-input v-model="weapon.cold"></el-input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td height="2" colspan="5" bgcolor="#66CCFF" class="border1"></td>
                </tr>
              </div>
              <div>
                <tr>
                  <td width="150" height="50" align="center" bgcolor="#FFFFFF" class="border1">
                    图片：
                    <img src="img/weapon/999.gif">
                  </td>

                  <div class="inp-block">盾牌血量：
                    <el-input v-model="gundam.weapon1.shield.life"></el-input>
                  </div>
                  <div class="inp-block">盾牌防御：
                    <el-input v-model="gundam.weapon1.shield.def"></el-input>
                  </div>
                </tr>
              </div>
            </tbody>
          </table>
        </el-col>
        <!-- weapon2 -->
        <el-col :lg="12" :xs="24">
          <table width="100%" border="0" cellpadding="3" cellspacing="0" class="table_border">
            <tbody>
              <tr class="txt_1">
                <td colspan="3" align="left" bgcolor="#FFFFCC" class="border1">武装二</td>
                <td bgcolor="#FFFFCC" class="border1">
                  <el-form-item label="必杀：">
                    <el-select v-model="gundam.weapon2.special" placeholder="必杀类型">
                      <el-option label="乱舞型" value="10"></el-option>
                      <el-option label="全弹发射型" value="11"></el-option>
                      <el-option label="地图炮型" value="12"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td bgcolor="#FFFFCC" class="border1">
                  <span class="border2">
                    <img :src="`img/skill/${gundam.weapon2.special}.gif`">
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <table width="100%" border="0" cellpadding="3" cellspacing="0" class="table_border">
            <tbody>
              <div v-for="(weapon,index) in gundam.weapon2.arms" :key="index">
                <tr>
                  <td width="150" height="50" align="center" bgcolor="#FFFFFF" class="border1">
                    图片：
                    <img
                      id="inp11img"
                      :src="weapon.imgID&&`img/weapon/${weapon.imgID}.gif`||'img/weapon/0.gif'"
                      border="0"
                      @click="openImgDlg('weapon',{statusNum: '2', index:index})"
                    >
                  </td>
                  <td colspan="4" align="left" bgcolor="#FFFFFF">
                    <div class="inp-block">武器名称：
                      <el-input v-model="weapon.name"></el-input>
                    </div>
                    <div class="inp-block">判定：
                      <el-input v-model="weapon.panding"></el-input>
                    </div>
                    <div class="inp-block">射程：
                      <el-input v-model="weapon.distance"></el-input>
                    </div>
                    <div class="inp-block">系数：
                      <el-input v-model="weapon.xishu"></el-input>
                    </div>
                    <div class="inp-block">攻速倍率：
                      <el-input v-model="weapon.attSpeed"></el-input>
                    </div>
                  </td>
                  <td>
                    <div class="inp-block">延迟：
                      <el-input v-model="weapon.ping"></el-input>
                    </div>
                    <div class="inp-block">弹数：
                      <el-input v-model="weapon.shotNum"></el-input>
                    </div>
                    <div class="inp-block">回弹：
                      <el-input v-model="weapon.huidan"></el-input>
                    </div>
                    <div class="inp-block">冷却：
                      <el-input v-model="weapon.cold"></el-input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td height="2" colspan="5" bgcolor="#66CCFF" class="border1"></td>
                </tr>
              </div>
              <div>
                <tr>
                  <td width="150" height="50" align="center" bgcolor="#FFFFFF" class="border1">
                    图片：
                    <img src="img/weapon/999.gif">
                  </td>

                  <div class="inp-block">盾牌血量：
                    <el-input v-model="gundam.weapon2.shield.life"></el-input>
                  </div>
                  <div class="inp-block">盾牌防御：
                    <el-input v-model="gundam.weapon2.shield.def"></el-input>
                  </div>
                </tr>
              </div>
            </tbody>
          </table>
        </el-col>
      </el-row>

      <el-row>
        <!-- skill -->
        <el-col :lg="24" :xs="24">
          <div v-for="(skill, index) in gundam.skill" :key="index">
            <img
              :src="skill.id&&`img/skill/${skill.id}.gif`||`img/skill/${skill.img_local.match(/\d+\.gif/)}`"
              max-width="20"
              @click="openImgDlg('skill',index)"
              style="float:left;"
            >
            <el-form-item label="技能名称：">
              <el-input v-model="skill.skill_name"></el-input>
            </el-form-item>

            <br>
            <el-form-item label="技能详情：">
              <el-input v-model="skill.skill_detail"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-button @click="gundam.skill.pop()">末尾删除一项技能</el-button>
        <el-button @click="gundam.skill.push({id:'0',skill_detail:'',skill_name:''})">末尾增加一项技能</el-button>
      </el-row>
      <!-- 合成需要 -->
      <!-- <p>合成需要：（暂不可用）</p>
      <el-button>加机体</el-button>
      <el-button>减机体</el-button>
      <el-row>
        <el-col>
          <el-card v-for="(robots) in gundam.makeNeed" :key="robots.ID" class="mk-card">
            <a :title="robots.name" href="#Avatar_dlg" @click="findGundam('makeNeed')">
              <v-img
                :src="`img/avatar/${robots.id}.gif`"
                :lazy-src="`img/avatar/${robots.id}.gif`"
                aspect-ratio="1"
                :class="robots.role&&robots.role == 'key'? 'as-key':''"
                max-width="60"
              ></v-img>
              <br>
              <span class="mkcard-word">{{robots.name}}：{{robots.Level}}</span>
            </a>
          </el-card>
        </el-col>
      </el-row>-->
      <!-- 国服合成需要makeNeed_CN -->
      <!-- <p v-if="gundam.makeNeed_CN&&gundam.makeNeed_CN.length">国服合成需要：</p>
      <el-row>
        <div>
          <el-card v-for="(robots) in gundam.makeNeed_CN" :key="robots.ID" class="mk-card">
            <a :title="robots.name" href="#Avatar_dlg" @click="findGundam('makeNeed_CN')">
              <v-img
                :src="`img/avatar/${robots.id}.gif`"
                :lazy-src="`img/avatar/${robots.id}.gif`"
                aspect-ratio="1"
                :class="robots.role&&robots.role == 'key'? 'as-key':''"
                max-width="60"
              ></v-img>
              <br>
              <span class="mkcard-word">{{robots.name}}：{{robots.Level}}</span>
            </a>
          </el-card>
        </div>
      </el-row>-->
      <!-- 用于合成 -->
      <!-- <p v-if="gundam.toMake&&gundam.toMake.length">用于合成：</p>
      <el-row v-if="gundam.toMake&&gundam.toMake.length">
        <div>
          <el-card v-for="(robots) in gundam.toMake" :key="robots.ID" class="mk-card">
            <a :title="robots.name" href="#Avatar_dlg" @click="findGundam('toMake')">
              <v-img
                :src="`img/avatar/${robots.id}.gif`"
                :lazy-src="`img/avatar/${robots.id}.gif`"
                aspect-ratio="1"
                :class="robots.role&&robots.role == 'as-ke'? 'as-key':''"
                max-width="60"
              ></v-img>
              <br>
              <span class="mkcard-word">{{robots.name}}：{{robots.Level}}</span>
            </a>
          </el-card>
        </div>
      </el-row>-->
      <!-- 扭蛋 -->
      <el-row type="flex" align="start">
        <div class="inp-block">扭蛋机：(纯数字。请用逗号','隔开)
          <el-input v-model="gundamMachine" placeholder="记得用英文,隔开哦"></el-input>
        </div>目前扭蛋：
        <el-tag v-for="(Num, index) in gundam.Machine" :key="index">{{Num}}</el-tag>
      </el-row>
      <br>
      <el-row type="flex" align="start">
        <strong>昵称，绰号，tags：
          <br>(请用逗号','隔开)
        </strong>
        <el-input
          v-model="gundamtags"
          placeholder="记得用英文,隔开哦"
          type="textarea"
          autosize
          style="width:100%"
        ></el-input>
      </el-row>
      <el-tag v-for="(Num, index) in gundam.tags" :key="index">{{Num}}</el-tag>
      <el-row type="flex" align="start">
        <div class="inp-block">
          <strong>推荐插件，技能：(暂不可用)</strong>
          <el-input
            v-model="gundam.plugins"
            placeholder="记得用英文,隔开哦"
            type="textarea"
            autosize
            style="width:80%"
            :disabled="true"
          ></el-input>
        </div>
      </el-row>
      <!-- 更多信息 -->
      <el-row type="flex" align="start">
        <p>其他信息：</p>
        <p>-势力：{{gundam.force}}</p>
        <p>-{{gundam.feature}}</p>
        <p>-出自作品：{{gundam.from}}</p>
        <p>-驾驶员：{{gundam.pilot}}</p>
        <!-- <p>{{gundam.story}}</p> -->
      </el-row>
      <el-form-item label="机体故事：">
        <el-input v-model="gundam.story" type="textarea" autosize style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="机体简评：">
        <el-input
          v-model="gundam.comment"
          type="textarea"
          autosize
          style="width:80%"
          placeholder="机体简评"
        ></el-input>
      </el-form-item>
      <el-row type="flex" align="start">贡献者，愿意留下你的名字吗？
        <el-input v-model="contributor" placeholder="请留下你的名字" style="width:500px"></el-input>
      </el-row>
      <el-row type="flex" align="start">贡献者名单：
        <el-tag v-for="(p) in gundam.contributor" :key="p">{{p}}</el-tag>
      </el-row>
      <el-row type="flex" align="start">可选内容：
        <el-checkbox v-model="gundam.showWeaponBlock">可展示武器(如果武器数据确认无误了，就勾选此项)</el-checkbox>
        <el-checkbox v-model="gundam.reviewOK" v-if="this.getUrlKey('manage') == 'true'">审核通过（审核时用,勾选后才会更新到网站上。更新频率为1小时。）</el-checkbox>
      </el-row>
      <br>
      <el-row v-if="this.getUrlKey('manage') == 'true'">
        <h3>发布时间：(主数据库每小时整点会进行更新)</h3>
        <div class="block">
          <span class="demonstration">选择发布时间</span>
          <el-date-picker v-model="gundam.publicTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
        <el-button type="danger" @click="resetGundam">高达回档</el-button>
        <p>防止有人乱改，导致不可修复的时候用</p>
      </el-row>
      <el-button type="primary" @click="submitGundam">我填完啦，保存一下！</el-button>
      <!-- 内层dialog，用于读取数据加载间隙 -->
      <!-- <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        v-loading.fullscreen.lock="loading"
      >请稍后</el-dialog>-->
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,
      radioTmp: "1",
      publicTime: "",
      contributor: "",
      gundam: {
        ID: "",
        weapon1: {
          shield: {},
          arms: [{}, {}, {}],
          special: ""
        },
        weapon2: {
          shield: {},
          arms: [{}, {}, {}],
          special: ""
        },
        skill: [],
        Machine: [],
        makeNeed: [],
        toMake: [],
        makeNeed_CN: [],
        tags: [],
        showWeaponBlock: false,
        reviewOK: false,
        publicTime: ""
      },

      Machine: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
        "60",
        "61",
        "62",
        "63",
        "64",
        "65",
        "66",
        "67",
        "68",
        "69",
        "70",
        "71",
        "72",
        "73",
        "74",
        "75",
        "76",
        "77",
        "78",
        "79",
        "80",
        "81"
      ],
      weaponID: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        11,
        12,
        13,
        14,
        15,
        16,
        21,
        22,
        23,
        25,
        26,
        27,
        28,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        41,
        42,
        43,
        999
      ],
      skillList: [],
      weaponNow: {
        statusNum: "",
        weaponID: ""
      },
      dlgType: ""
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
    },
    gundamtags: {
      get: function() {
        if (this.gundam.tags)
          return this.gundam.tags.toString().replace(/[\,，]{2,4}/, ",");
      },
      set: function(val) {
        this.gundam.tags = val.split(/[\,，]{1,4}/);
      }
    },
    gundamMachine: {
      get: function() {
        if (this.gundam.Machine)
          return this.gundam.Machine.toString().replace(/[\,，]{2,4}/, ",");
      },
      set: function(val) {
        this.gundam.Machine = val.split(/[\,，]{1,4}/);
      }
    }
  },

  updated: function() {
    var div = document.querySelector(".el-dialog__wrapper");
    // div.scrollTop = div.scrollHeight;
    // div.scrollTop = 0;
  },
  methods: {
    updateGundam: function(robot) {
      // this.$emit("dialogData", robot);
      this.loading = true;
      axios.post("/getGundam/findOne", robot).then(res => {
        // res.data.weaponTable = res.data.weaponTable.replace(
        //   /https\:\/\/www.olgame\.tw\/sds\/images\/weapon\/weapon_/g,
        //   "http://cdn.sdplayer.club/weapon/"
        // );
        this.gundam = res.data;
        this.loading = false;
        var div = document.querySelector(".el-dialog__wrapper");
        // div.scrollTop = div.scrollHeight;
        div.scrollTop = 0;
      });
    },
    submitGundam: function(key) {
      if(key == 'reviewOK'){
        this.gundam.reviewOK = true
      }
      this.loading = true;
      let _this = this;
      let gundam = this.gundam;
      gundam.Machine = this.gundamMachine.split(/[\,,\，]/);
      gundam.tags = this.gundamtags.split(/[\,,\，]/);
      if (this.gundam.showWeaponBlock) {
        delete this.gundam.weapon;
        delete this.gundam.weaponTable;
      }
      // 贡献者
      if (!this.gundam.contributor) {
        this.gundam.contributor = [];
      }
      if (this.contributor.trim()) {
        if (!this.gundam.contributor.includes(this.contributor.trim()))
          this.gundam.contributor.push(this.contributor);
      }
      // 审核判断
      let url;
      if (this.getUrlKey("manage") == "true") {
        url = "/DBmanage/updateOne";
      } else {
        this.gundam.needReview = true;
        url = `/DBmanage/commit${window.location.search}`;
      }
      axios
        .request({
          url: url,
          data: _this.gundam,
          method: "post",
          withCredentials: true,
          headers: {
            // withCredentials: true,
            // "Access-Control-Allow-Origin":"*",
            Cookie: `koa:sess=${this.getUrlKey(
              "sess"
            )}; koa:sess.sig=${this.getUrlKey("sig")};`
          }
        })
        .then(res => {
          this.loading = false;
          if (res.data.status && res.data.status == "ok") {
            this.$message({
              showClose: true,
              message: "更新成功！",
              type: "success"
            });
          } else {
            this.handleError(res.data);
          }
        })
        .catch(err => {
          this.handleError(err);
        });
    },
    resetGundam: function() {
      let _this = this;
      this.$confirm(
        "此操作将恢复高达数据，放弃当前审核内容, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          var url = "/DBmanage/resetOne";
          axios
            .request({
              url: url,
              data: _this.gundam,
              method: "post",
              withCredentials: true,
              headers: {
                // withCredentials: true,
                // "Access-Control-Allow-Origin":"*",
                Cookie: `koa:sess=${this.getUrlKey(
                  "sess"
                )}; koa:sess.sig=${this.getUrlKey("sig")};`
              }
            })
            .then(res => {
              this.loading = false;
              if (res.data.status && res.data.status == "ok") {
                this.$message({
                  showClose: true,
                  message: "重置成功,请刷新页面！！",
                  type: "success"
                });
                _this.gundam = res.data.gundam
                Object.assign(_this.gundam, res.data.gundam)
              } else {
                this.handleError(res.data);
              }
            })
            .catch(err => {
              this.handleError(err);
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    openImgDlg(type, opt) {
      this.dlgType = type;

      if (type == "skill") {
        this.skillNow = opt; //index
        if (!this.skillList.length) {
          this.loading = true;
          axios
            .request({
              url: "/DBmanage/skillIDList",
              method: "get",
              withCredentials: true,
              headers: {
                // withCredentials: true,
                // "Access-Control-Allow-Origin":"*",
                Cookie: `koa:sess=${this.getUrlKey(
                  "sess"
                )}; koa:sess.sig=${this.getUrlKey("sig")};`
              }
            })
            .then(res => {
              this.loading = false;
              this.skillList = res.data;
              this.dialogVisible = true;
            });
        } else {
          this.dialogVisible = true;
        }
      } else {
        this.weaponNow = {
          statusNum: opt.statusNum,
          weaponID: opt.index
        };
        this.dialogVisible = true;
      }
    },
    setWeapon(index) {
      this.gundam[`weapon${this.weaponNow.statusNum}`].arms[
        this.weaponNow.weaponID
      ].imgID = index;
      this.dialogVisible = false;
    },
    setSkill(index) {
      this.gundam.skill[this.skillNow].id = index;
      this.dialogVisible = false;
    },
    getUrlKey: function(name) {
      let reg = `(^|&)${name}=([^&]*)(&|$)`;
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    handleError(err) {
      this.loading = false;
      this.$message({
        showClose: true,
        message:
          (err.response && err.response.data) || err.message || "未知错误",
        type: "error"
      });
    }
  },
  mounted() {
    this.loading = true;
    let _this = this;
    let id = this.getUrlKey("id");
    axios({
      url: "/DBmanage/findOne",
      data: { id: id },
      method: "post"
    }).then(res => {
      // res.data.weaponTable = res.data.weaponTable.replace(
      //   /https\:\/\/www.olgame\.tw\/sds\/images\/weapon\/weapon_/g,
      //   "http://cdn.sdplayer.club/weapon/"
      // );
      _this.loading = false;
      _this.gundam = Object.assign(_this.gundam, res.data);
    });
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
.inp-block .el-input {
  position: relative;
  display: inline-block;
  width: 200px;
}
</style>
