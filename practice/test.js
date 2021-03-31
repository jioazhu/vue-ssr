// vue 2.6.0以后
// import Vue from 'vue'
// const component = {
//   name: 'comp',
//   template: `
//     <div :style="style">
//       <div class="header" :value='123'>
//         <slot name="header"></slot>
//       </div>
//       <div class="body">
//         <slot name="body" :value='456'></slot>
//       </div>
//     </div>
//   `,
//   data () {
//     return {
//       style: {
//         width: '200px',
//         height: '200px',
//         border: '1px solid #aaa'
//       },
//       value: 'component value'
//     }
//   }
// }

// new Vue({
//   el: '#root',
//   components: {
//     CompOne: component
//   },
//   data () {
//     return {
//       value: '123'
//     }
//   },
//   mounted () {
//     console.log(this.$refs.comp.value, this.$refs.span)
//   },
//   template: `
//     <div>
//       <template v-slot:header="slotProps">
//         <h1>{{slotProps}}</h1>
//       </template>
//       <template v-slot:body="slotProps">
//         <h1>{{slotProps}}</h1>
//       </template>
//     </div>
//   `
// })

// vue 2.6.0以前
import Vue from 'vue'
const component = {
  name: 'comp',
  template: `
    <div :style="style">
      <div class="header">
        <slot name="header" :value='123'></slot>
      </div>
      <div class="body">
        <slot name="body" :value='456'></slot>
      </div>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  template: `
    <div>
      <comp-one>
        <template slot="header" slot-scope="{value}">
          <h1>{{value}}</h1>
        </template>
        <template slot="body" slot-scope="{value}">
          <h1>{{value}}</h1>
        </template>
      </comp-one>
    </div>
  `
})
