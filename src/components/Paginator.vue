<template>
  <div class="paginator-container">
    <div
      v-for="p in pages"
      :key="p.text"
      :class="{ selected: p.active }"
    >
      <router-link
        :class="{ 'selected-link': p.active }"
        :to="`${to}?page=${p.num}`"
        @click="getPage(p.num)"
        class="paginator-link"
      >
        {{p.text}}
      </router-link>
    </div>
  </div>
</template>

<script>
// import { setQueryPage } from '@/utils/getPageNum';

export default {
  data() {
    return {
      pageNum: this.page,
      buttons: [],
    };
  },
  methods: {
    getPage(pageNum) {
      this.pageNum = pageNum;
      this.$emit('setPage', pageNum);
      this.$emit('getElements', pageNum);
    },
  },
  computed: {
    pages() {
      const res = [];
      if (this.pageNum === 1) {
        /*
          case 1:
          pages: 1
          1  2  3  4  5 > >>
          ^
        */
        for (let i = 1; i <= 5; i += 1) {
          res.push({ num: i, text: i, active: i === 1 });
        }
        res.push({ num: 2, text: '>', active: false });
        res.push({ num: this.pageCount, text: '>>', active: false });
      } else if (this.pageNum === 2 || this.pageNum === 3) {
        /*
          case 2:
          pages: 2, 3
          < 1  2  3  4  5 > >>
               ^  ^
        */
        res.push({ num: 1, text: '<', active: false });
        for (let i = 1; i <= 5; i += 1) {
          res.push({ num: i, text: i, active: i === this.pageNum });
        }
        res.push({ num: 3, text: '>', active: false });
        res.push({ num: this.pageCount, text: '>>', active: false });
      } else if (this.pageNum >= 4 && this.pageNum < this.pageCount - 2) {
        /*
          case 3:
          pages: 4...
          << < 2  3  4  5  6 > >>
                     ^
        */
        res.push({ num: 1, text: '<<', active: false });
        res.push({ num: this.pageNum - 1, text: '<', active: false });
        for (let i = this.pageNum - 2; i <= this.pageNum + 2; i += 1) {
          res.push({ num: i, text: i, active: i === this.pageNum });
        }
        res.push({ num: this.pageNum + 1, text: '>', active: false });
        res.push({ num: this.pageCount, text: '>>', active: false });
      } else if (this.pageNum === this.pageCount - 2 || this.pageNum === this.pageCount - 1) {
        /*
        case 5:
        pages: 19, 20 (last 21)
        << < 17  18  19  20  21 >
                     ^
        */
        res.push({ num: 1, text: '<<', active: false });
        res.push({ num: this.pageNum - 1, text: '<', active: false });
        for (let i = this.pageCount - 4; i <= this.pageCount; i += 1) {
          res.push({ num: i, text: i, active: i === this.pageNum });
        }
        res.push({ num: this.pageCount, text: '>>', active: false });
      } else if (this.pageNum === this.pageCount) {
        /*
        case 5:
        pages: 21 (last 21)
        << < 17  18  19  20  21
                             ^
         */
        res.push({ num: 1, text: '<<', active: false });
        res.push({ num: this.pageNum - 1, text: '<', active: false });
        for (let i = this.pageCount - 4; i <= this.pageCount; i += 1) {
          res.push({ num: i, text: i, active: i === this.pageNum });
        }
      }
      return res;
    },
    prevPage() {
      return 1;
    },
  },
  created() {

  },
  props: ['page', 'to', 'pageCount'],
};
</script>

<style scoped>
.paginator-container {
  display: flex;
  font-size: 20px;
  justify-content: center;
  margin-bottom: 20px;
}
.paginator-link {
  margin: 0 5px 20px 5px;
}
.selected {
  background-color: #9b4dca;
}
.selected-link {
  color: white;
}
</style>
