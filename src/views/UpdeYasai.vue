<template>
  <div>
    <div>this is update page</div>
    <div>{{ itemName }}</div>
  </div>
</template>

<script>
import firebase from '@/firebase.js'
export default {
  data() {
    return {
      itemName: null
    }
  },
  mounted() {
    const docId = this.$store.state.updateYasai.id
    firebase.firestore().collection('yasai').doc(docId).get().then(snap=> this.itemName = snap.data().name)
  }
}
</script>