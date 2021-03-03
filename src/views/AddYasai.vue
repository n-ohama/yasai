<template>
  <div class="addYasai">
    <transition name="fade">
      <div class="flash" v-show="isFlash">
        作成完了しました!
      </div>
    </transition>
    
    <h1>{{ $store.state.msg }}</h1>
    <div class="addArea">
      <label for="yasaiName">名前</label>
      <input type="text" id="yasaiName" v-model="yasaiName">
      <label>期間</label>
      <div class="yasaiKikan">
        <input type="number" v-model="first"> 月 ~ <input type="number" v-model="end"> 月
      </div>
      
      <a class="spBtn" href="#" @click="addAfterSearch"><i class="fas fa-cart-plus"></i> 追加</a>
    </div>
  </div>
</template>

<script>
import firebase from '@/firebase.js'
import { mixin } from '@/mixin.js'
export default {
  mixins: [mixin],
  data() {
    return {
      yasaiName: '',
      first: '',
      end: '',
      isFlash: false,
    }
  },
  methods: {
    addAfterSearch() {
      if(!this.yasaiName || !this.first || !this.end) return
      const isHira = /^[ぁ-んー]*$/
      const kanaChangeWord = this.yasaiName.match(isHira) ? this.hiraToKana(this.yasaiName) : this.kanaToHira(this.yasaiName)
      const searchArr = [this.yasaiName, kanaChangeWord]
      firebase.firestore().collection('yasai').where('name','in',searchArr).get()
        .then(snap=> {
          if(snap.docs.length) {
            this.$store.commit('setUpdateYasai', {upName: this.yasaiName, upFirst: this.first, upEnd: this.end, docId: snap.docs[0].id})
            this.$router.push("/update")
          } else {
            this.addYasai()
          }
        })
    },
    addYasai() {
      firebase.firestore().collection('yasai').add({
        name: this.yasaiName,
        creatYear: new Date().getFullYear(),
        first: this.first,
        end: this.end
      }).then(() => {
        this.yasaiName = ''
        this.first = ''
        this.end = ''
        this.flashFn()
      })
    },
    flashFn(){
      this.isFlash = !this.isFlash
      setTimeout(() => {this.isFlash = false}, 2000)
    }
  }
}
</script>

<style scoped>
.addArea { padding: 0 2rem; }
.addArea input { outline: none; }
.addArea { text-align: left; }
#yasaiName { display: block; margin-bottom: 1rem; width: 80%; padding: .5rem .8rem;
border: 1px solid #2c3e50; border-radius: 1rem; margin-top: .3rem; }
#yasaiName:focus { outline: none; border-color:#42b983; }

.yasaiKikan { margin-top: .3rem; }
.yasaiKikan > input { max-width: 5rem; padding: .5rem; outline: none; border: 1px solid #2c3e50; border-radius: 1rem; }
.yasaiKikan > input:focus { border-color:#42b983; }

.addArea button { display: inline-block; margin-top: 2rem; }
.flash {
  background: #42b983;
  max-width: 80%;
  margin: 0 auto;
  padding: .3rem;
  color: #fff;
  border-radius: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>