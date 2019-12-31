<template>
  <main class="main">
    <h1>{{ hTitle }}</h1>
    <el-form>
      <!-- 仓库 -->
      <el-form-item label="地域：">
        <kr-cascader
          ref="cascader"
          :boxTitle="title"
          :boxOperation="operation"
          :dataObj="dataObj"
          :selectedData="selectedData"
          @onChange="onChange"
        ></kr-cascader>
      </el-form-item>
    </el-form>
    <el-button style="margin: 50px;" @click="getData">通过钩子获取已选数据</el-button>
    <router-link to="/mutiTransfer"
      >前往 --> 数据量庞大的分页穿梭框</router-link
    >
  </main>
</template>

<script>
export default {
  data() {
    return {
      hTitle: '省市级联动多选穿梭框',
      title: ['省份', '城市', '区县', '选中地域'],
      operation: [
        '添加选中省份',
        '添加选中城市',
        '添加选中区县',
        '删除选中地域'
      ],
      dataObj: {},
      selectedData: []
    }
  },
  created() {
    this.productData()
  },
  methods: {
    productData() {
      // 模拟异步
      setTimeout(() => {
        // cascader
        this.dataObj = {
          province: {
            '101101': '北京市',
            '101102': '天津市',
            '101103': '广东省',
            '101104': '山西省',
            '101105': '河北省',
            '101106': '广西壮族自治区',
            '101107': '甘肃省',
            '101108': '湖北省',
            '101109': '湖南省',
            '101110': '福建省',
            '101111': '内蒙古自治区',
            '101112': '青海省'
          },
          city: {
            '101101': [
              {
                id: 101101101112,
                label: '通州区'
              },
              {
                id: 101101101111,
                label: '房山区'
              }
            ],
            '101102': [
              {
                id: 101102101111,
                label: '西青区'
              },
              {
                id: 101102101112,
                label: '津南区'
              }
            ],
            '101103': [
              {
                id: 101102101351,
                label: '河源市'
              },
              {
                id: 101164001112,
                label: '惠州市'
              },
              {
                id: 101164181112,
                label: '深圳市'
              }
            ]
          },
          county: {
            '101164181112': [
              {
                id: 106105142126,
                label: '宝安区'
              },
              {
                id: 106105142125,
                label: '南山区'
              },
              {
                id: 106105143124,
                label: '罗湖区'
              },
              {
                id: 106105143125,
                label: '福田区'
              }
            ],
            '101102101351': [
              {
                id: 106105143124,
                label: '龙川县'
              },
              {
                id: 106105143125,
                label: '紫金县'
              }
            ],
            '101164001112': [
              {
                id: 106465133124,
                label: '惠阳区'
              },
              {
                id: 106197987125,
                label: '惠城区'
              }
            ]
          }
        }
        this.selectedData = [
          {
            id: '101101-101101101112',
            label: '北京市-通州区'
          },
          {
            id: '101103-101164001112-106197987125',
            label: '广东省-惠州市-惠城区'
          },
          {
            id: '101111',
            label: '内蒙古自治区'
          }
        ]
      }, 500)
    },
    onChange(val) {
      console.log('已选中：', val)
    },
    getData() {
      const data = this.$refs.cascader.getSelectedData()
      console.log('通过钩子获取：', data)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 1000px;
  height: auto;
  margin: 0 auto;
}
</style>
