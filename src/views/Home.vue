<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <p>
      yasai is delicious! So, everyOne have to eat yasaitabetemasuka? / yasai is suteki,<br>
      check out the
      <a href="#">vue-cli thisisyasai</a>.
    </p>
    <label for="search">名前で検索</label>
    <div class="search">
      <input type="text" id="search" v-model="searchWord"><button @click="search">検索</button>
    </div>
    <!-- 検索結果エリア -->
    <div class="resultArea" v-show="getVuexResult.name && !isError">
      <h3 class="resultName">{{ getVuexResult.name }}</h3>
      <div class="timeOfGetYasai">
        {{ `収穫期： ${getVuexResult.first} 月 ~ ${getVuexResult.end} 月の間です。` }}
      </div>
      <div class="dayOfMemo">{{ getVuexResult.creatYear }}年</div>
    </div>
    <!-- 検索結果がなかったとき -->
    <div class="isError" v-if="isError">
      検索結果、該当なし！！
    </div>
  </div>
</template>

<script>
import firebase from '@/firebase.js'

export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to Your Yasa.ii App',
      searchWord: '',
      isError: false
    }
  },
  computed: {
    getVuexResult() {
      return this.$store.state.resultData
    }
  },
  methods: {
    hiraToKana(str) {
      return str.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
      });
    },
    kanaToHira(str) {
      return str.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
      });
    },
    search() {
      if(!this.searchWord) return
      // const isHiragana = /^[\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]+$/mu
      const isHira = /^[ぁ-んー]*$/
      const kanaChangeWord = this.searchWord.match(isHira) ? this.hiraToKana(this.searchWord) : this.kanaToHira(this.searchWord)
      const searchArr = [this.searchWord, kanaChangeWord]
      firebase.firestore().collection('yasai')
        .where('name','in',searchArr).get().then(snap=> {
          const searchedData = snap.docs.map(d=>d.data())[0]
          if(searchedData) {
            const { name, first, end, creatYear } = searchedData
            this.$store.commit('setResultData',{ seaName: name, seaFirst: first, seaEnd: end, seaCreYear: creatYear })
            this.isError = false
            this.searchWord = ''
          } else {
            this.isError = true
          }
        })
    },
  }
}
</script>

<style scoped>
h3 { margin: 40px 0 0; }
ul { list-style-type: none; padding: 0; }
li { display: inline-block; margin: 0 10px; }
a { color: #42b983; }
.home > label { display: block; margin-bottom: 1rem; font-weight: bold; }
.search > button { margin-left: 1rem; }
#search { padding: .5rem; border: 1px solid #2c3e50; outline: none; border-radius: .8rem; }
#search:focus { border-color: #42b983; }

.resultArea { border: 3px solid #42b983; margin-top: 2rem; padding: 1rem; }
.dayOfMemo { font-size: .6rem; text-align: right; margin-right: 1rem;}
.resultName { margin: 0 0 1rem; }

.isError { margin-top: 2rem; padding: 1rem; border: 3px solid #dbaeba; }
</style>
