<template>
  <div class="banner">
    <div class="view">
      <img
        src="../../assets/bilibili/bilibili-winter-view-1.jpg"
        class="morning"
      />
      <img
        src="../../assets/bilibili/bilibili-winter-view-2.jpg"
        class="afternoon"
      />
      <img
        src="../../assets/bilibili/bilibili-winter-ball.png"
        class="ball"
      />
      <video autoplay loop muted class="evening">
        <source
          src="../../assets/bilibili/bilibili-winter-view-3.webm"
          type="video/webm"
        />
      </video>
      <img
        src="../../assets/bilibili/bilibili-winter-view-3-snow.png"
        class="window-cover"
      />
    </div>
    <div class="tree">
      <img
        src="../../assets/bilibili/bilibili-winter-tree-1.png"
        class="morning"
      />
      <img
        src="../../assets/bilibili/bilibili-winter-tree-2.png"
        class="afternoon"
      />
      <img
        src="../../assets/bilibili/bilibili-winter-tree-3.png"
        class="evening"
      />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let startingPoint = ''
    const header = document.querySelector('.banner')

    header.addEventListener('mouseenter', (e) => {
      startingPoint = e.clientX
      header.classList.add('moving')
    })

    header.addEventListener('mouseout', (e) => {
      header.classList.remove('moving')
      header.style.setProperty('--percentage', 0.5)
    })

    header.addEventListener('mousemove', (e) => {
      let percentage = ((startingPoint - e.clientX) / window.outerWidth) * 2 + 0.5

      header.style.setProperty('--percentage', percentage)
    })
  }
}
</script>

<style lang="scss" scoped>
.banner {
  min-height: 155px;
  height: 9.375vw;
  position: relative;
  overflow: hidden;
  --percentage: 0.5;

  .view,
  .tree {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s all ease-in;
  }

  .view {
    transform: translatex(calc(var(--percentage) * 100px));
  }
  .tree {
    transform: translatex(calc(var(--percentage) * 150px - 25px));
    filter: blur(3px);
  }

  img,
  video {
    position: absolute;
    height: 100%;
  }
  .evening {
    transition: 0.2s all ease-in;
    z-index: 20;
    opacity: calc((0.5 - var(--percentage)) / 0.5);
  }
  .afternoon {
    transition: 0.2s all ease-in;
    z-index: 10;
    opacity: calc(1 - (var(--percentage) - 0.5) / 0.5);
  }

  &.moving {
    .afternoon,
    .evening,
    .ball,
    .view,
    .tree {
      transition: none;
    }
  }

  .ball {
    transition: 0.2s all ease-in;
    z-index: 10;
    opacity: calc(1.5 - (var(--percentage) - 0.5) / 0.5);
    transform: translate(calc(100px * var(--percentage)), 22px) rotate(calc(10deg * var(--percentage) + 5deg));
  }

  .window-cover {
    z-index: 20;
    opacity: calc(var(--percentage) * (-2));
  }
}
</style>
