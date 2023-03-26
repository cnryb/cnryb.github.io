import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)

    onMounted(() => {
      // setInterval(() => {
      //   count.value++
      // }, 1000)
      count.value++
    })

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count
    }
  },
  // data() {
  //   return { count: 0 }
  // },
  template: /*html*/`
  <div>count is {{ count }}</div>
  `
}
