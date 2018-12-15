<template>
  <main class="main">
    <h1>{{ title }}</h1>
    <el-form>
      <!-- 地区 -->
      <districts :data="data"></districts>
    </el-form>
    <router-link to="/index">前往 --> 省市级联动多选穿梭框</router-link>
  </main>
</template>

<script>
import Districts from './Districts';

export default {
  data () {
    return {
      title: '数据量庞大的分页穿梭框',
      data: [],
    };
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      for (let i = 0; i < 2234; i++) {
        this.data.push({
          id: i,
          name: `这是第${i}条数据`,
        });
      }
    },
  },
  components: {
    Districts,
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 1000px;
  height: auto;
  margin: 0 auto;
}
</style>
