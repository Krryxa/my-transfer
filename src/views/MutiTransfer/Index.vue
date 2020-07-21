<template>
  <main class="main">
    <h1>{{ title }}</h1>
    <el-form>
      <el-form-item label="渠道：">
        <kr-paging
          ref="paging"
          :dataList="data"
          :selectedData="selectedData"
          :pageSize="100"
          :boxTitle="boxTitle"
          :pageTexts="['pre', 'next']"
          :filterable="true"
          :isHighlight="true"
          :async="true"
          :getSearchData="getSearchData"
          :getPageData="getPageData"
          @onChange="onChange"
        ></kr-paging>
      </el-form-item>
    </el-form>
    <el-button style="margin: 50px 20px;" @click="getData"
      >通过钩子获取已选数据</el-button
    >
    <el-button style="margin: 50px 20px;" @click="clearQuery('left')"
      >清空左边搜索框</el-button
    >
    <el-button style="margin: 50px 20px;" @click="clearQuery('right')"
      >清空右边搜索框</el-button
    >
    <el-button style="margin: 50px 20px;" @click="clearSelected"
      >将右侧内容清空</el-button
    >
    <router-link to="/index">前往 --> 省市级联动多选穿梭框</router-link>
  </main>
</template>

<script>
export default {
  data() {
    return {
      title: '数据量庞大的分页穿梭框',
      boxTitle: ['供应商', '已选中'],
      data: [],
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
        for (let i = 0; i < 1500; i++) {
          this.data.push({
            id: i,
            label: `这是第${i}条数据`
          })
        }
        setTimeout(() => {
          this.selectedData = [
            {
              id: 0,
              label: '这是第0条数据'
            },
            {
              id: 5,
              label: '这是第5条数据'
            }
          ]
        }, 500)
      }, 500)
    },
    onChange(val) {
      console.log('已选中：', val)
    },
    getData() {
      const data = this.$refs.paging.getSelectedData()
      console.log('通过钩子获取：', data)
      // this.$refs.paging.getData(1)
    },
    clearQuery(position) {
      this.$refs.paging.clearQueryInp(position)
    },
    async getSearchData(keyword) {
      const resData = await new Promise((resolve, reject) => {
        let resData = [
          {
            id: 0,
            label: '这是第0条数据'
          },
          {
            id: 1,
            label: '这是第1条数据'
          },
          {
            id: 2,
            label: '这是第2条数据'
          },
          {
            id: 3,
            label: '这是第3条数据'
          },
          {
            id: 4,
            label: '这是第4条数据'
          },
          {
            id: 5,
            label: '这是第5条数据'
          }
        ]
        setTimeout(() => {
          for (let i = 6; i < 106; i++) {
            resData.push({
              id: keyword + i,
              label: `异步搜索-${keyword}-数据 ${i}`
            })
          }
          resolve(resData)
        }, 200)
      })
      return resData
    },
    async getPageData(pageIndex, pageSize) {
      // 异步获取分页数据
      const resData = await new Promise((resolve, reject) => {
        let resData = []
        setTimeout(() => {
          let i = 0
          if (pageIndex === 1) {
            i = 6
            resData.push(
              {
                id: 0,
                label: '这是第0条数据'
              },
              {
                id: 1,
                label: '这是第1条数据'
              },
              {
                id: 2,
                label: '这是第2条数据'
              },
              {
                id: 3,
                label: '这是第3条数据'
              },
              {
                id: 4,
                label: '这是第4条数据'
              },
              {
                id: 5,
                label: '这是第5条数据'
              })
          }
          if (pageIndex === 6) {
            pageSize = 56
          }
          for (i; i < pageSize; i++) {
            const id = pageIndex + '_' + i
            resData.push({
              id: id,
              label: `异步获取数据 ${id}`
            })
          }
          resolve(resData)
        }, 500)
      })
      return resData
    },
    clearSelected() {
      this.selectedData = []
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 1000px;
  height: auto;
  margin: 0 auto;

  .btn {
    margin-left: 298px;
  }
}
</style>
