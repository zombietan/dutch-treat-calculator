<template>
  <div class="container">
    <div class="input-area">
      <input type="text" id="price" v-model="price" placeholder="金額" ref="text1">
      <input type="text" id="num" v-model="num" placeholder="人数">
      <select id="unit" v-model="selected">
        <option v-for="item in getItems" :value="item.value" :key="item.text">
          {{ item.text}}
        </option>
      </select>
      <div id="btn" v-if="btnDisabled" class="disabled">計算</div>
      <div id="btn" v-if="!btnDisabled" @click="setResult">計算</div>
    </div>
    <div class="result-area">
      <p id="result">{{ getResult }}</p>
      <div id="reset" @click="reset" :class="{ hidden: isHidden }">もう一度計算する？</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Calculator",
  computed: {
    ...mapGetters([
      'getResult',
      'isHidden',
      'getItems',
      'getSelected',
      'getPrice',
      'getNum'
    ]),
    
    selected: {
      get: function() {
        return this.getSelected
      },
      set: function(val) {
        return this.$store.commit("setSelected", val)
      }
    },
    price: {
      get: function() {
        return this.getPrice
      },
      set: function(val) {
        return this.$store.commit("setPrice", val)
      }
    },
    num: {
      get: function() {
        return this.getNum
      },
      set: function(val) {
        return this.$store.commit("setNum", val)
      }
    },
    btnDisabled : function() {
      if(
        this.price.match(/^[1-9][0-9]*$/) !== null &&
        this.num.match(/^[1-9][0-9]*$/) !== null
      ) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    setResult() {
      const price = +this.price
      const num = +this.num
      const payLess =
          Math.floor(price / num / this.selected) * this.selected
      const short = price - (payLess * num)
      const payMore =
          Math.ceil(price / num / this.selected) * this.selected
      const over = Math.abs(price - (payMore * num))
      let str
      if (over === 0 && short === 0) {
        str = `一人 ${price / num} 円ちょうどです！`
      } else {
        str = `一人 ${payLess} 円だと ${short} 円足りません。 一人 ${payMore} 円だと ${over} 円余ります。`
      }
      this.$store.commit('setResult', str)
      this.$store.commit('setHidden', false)
    },

    reset() {
      this.$store.dispatch('initializedState')
      this.$nextTick(() => this.$refs.text1.focus())
    }
  },

  mounted: function () {
    this.$nextTick(() => this.$refs.text1.focus())
  }
};
</script>

<style scoped>
.container {
  width: 500px;
  margin: 25px auto;
}

#price,
#num,
#unit {
  font-size: 14px;
  box-sizing: border-box;
  padding: 10px;
  height: 40px;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
}

#price {
  width: 140px;
}

#num,
#unit {
  width: 110px;
}

#btn {
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  width: 110px;
  height: 40px;
  padding: 10px;
  background: #3897fd;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  color: #fff;
}

#btn.disabled {
  opacity: 0.5;
}

.input-area {
  font-size: 0;
  margin-bottom: 20px;
}

.result-area {
  background: #f8f8f8;
  padding: 10px;
  height: 130px;
  border-radius: 5px;
  position: relative;
}

#result {
  margin: 0;
}

#reset {
  text-decoration: underline;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

#reset.hidden {
  display: none;
}
</style>

<style>
body {
  background: #ccc;
  font-size: 16px;
  font-family: Arial, sans-serif;
}
</style>