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
          :filterable="true"
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
        for (let i = 0; i < 2234; i++) {
          this.data.push({
            id: i,
            label: `这是第${i}条数据`
          })
        }
        this.selectedData = [
          {
            id: 0,
            label: '这是第0条数据'
          },
          {
            id: 5,
            label: '这是第5条数据'
          },
          {
            id: 6,
            label: '这是第6条数据'
          },
          {
            id: 8,
            label: '这是第8条数据'
          },
          {
            id: 9,
            label: '这是第9条数据'
          }
        ]
      }, 500)
    },
    onChange(val) {
      console.log('已选中：', val)
    },
    getData() {
      const data = this.$refs.paging.getSelectedData()
      console.log('通过钩子获取：', data)
    },
    clearQuery(position) {
      this.$refs.paging.clearQueryInp(position)
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
