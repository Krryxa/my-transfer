<template>
  <main class="main">
    <h1>{{ title }}</h1>
    <el-form>
      <el-form-item label="渠道：">
        <kr-paging :dataList="data" :selectedData="selectedData" :pageSize="100"></kr-paging>
      </el-form-item>
    </el-form>
    <router-link to="/index">前往 --> 省市级联动多选穿梭框</router-link>
  </main>
</template>

<script>
export default {
  data() {
    return {
      title: '数据量庞大的分页穿梭框',
      data: [],
      selectedData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      for (let i = 0; i < 2234; i++) {
        this.data.push({
          id: i,
          label: `这是第${i}条数据`
        })
      }
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
