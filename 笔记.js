vue实例上的属性：
 $data $prop $el  $options $root $children  $slots $scopedSlots $refs $isServer  ($route  $store)
vue实例上的方法：
 $watch  $on $emit $once $forceUpdate $set $nextTick

生命周期：
  初始化events和lifecycle
  beforeCreate
  初始化data，inject ,provide
  created
  初始化模板，能拿到$el,但是还没有挂载数据
  beforeMount
  初始化完成
  mounted
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  destroyed
  renderError (h, err) {   // 开发时用，本组件才有用
    return h('div', {}, err.stack)
  },
  errorCaptured (h, err) {   // 正式环境可以用时用，会向上冒泡，可以在根组件使用
    return h('div', {}, err.stack)
  },

监听：
  watch: {
  'obj.a': {
    handler () {
      console.log('obj.a changed')
      this.obj.a += 1
    },
    immediate: true  // 挂载之后立马执行这个函数，默认false
    deep: true      //  如果是监听的对象，如果属性值变化只有这只为true才能触发监听函数，默认false  也可以用'obj.a'
  }
},

原生指令
v-if
v-else-if
v-else
v-show
v-html
v-text
v-model  可以加修饰符v-model.number  v-model.trim  v-model.lazy
v-for
v-on
v-bind
v-pre // 不会执行{{}}解析，原样输出
v-cloak  // 不用webpack，直接引入vue.js我文件，页面会显示{{}}，只有页面渲染完才...,加v-cloak可以避免
v-once  // 数据只绑定一次，再次更新数据不会改变页面的显示


继承：
 方式:1,Vue.extend(component);2,extends:[]
 子实例向父实例传props，只能通过在子实例定义propsData:{}传
 data和生命周期会合并，父生命周期先调用，子后调用


 this.$parent.$options.name // 子组件可以通过this.$parent获取父组件的实例


 组件v-model双向绑定：
  const component = {
    model: {
      prop: 'value1',
      event: 'change'
    },
    props: ['value1'],
    template: `
      <div>
        <input type="text" @input="handleInput" :value="value1">
      </div>
    `,
    methods: {
      handleInput (e) {
        this.$emit('change', e.target.value)
      }
    }
  }
  new Vue({
    components: {
      CompOne: component
    },
    el: '#root',
    data () {
      return {
        value: '123'
      }
    },
    template: `
      <div>
        <comp-one v-model="value"></comp-one>
      </div>
    `
  })

插槽：
  vue 2.6.0以前 (provide/inject)
  import Vue from 'vue'
  const ChildComponent = {
    template: '<div>child component: {{data.value}}</div>',
    inject: ['yeye', 'data'],
    mounted () {
      // console.log(this.yeye, this.value)
    }
  }
  const component = {
    name: 'comp',
    components: {
      ChildComponent
    },
    template: `
      <div :style="style">
        <div class="header">
          <slot name="header" :value='123'></slot>
        </div>
        <div class="body">
          <slot name="body" :value='456'></slot>
        </div>
        <child-component />
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
    provide () {
      // return {   // 这种直接返回，value改变，inject的数据不会更新
      //   yeye: this,
      //   value
      // }
      const data = {}
      Object.defineProperty(data, 'value', {
        get: () => this.value,
        enumerable: true
      })
      return {
        yeye: this,
        data
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

  vue 2.6.0以后
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
          <template v-slot:header="{value}">
            <h1>{{value}}</h1>
          </template>
          <template V-slot:body="{value}">
            <h1>{{value}}</h1>
          </template>
        </comp-one>
      </div>
    `
  })

vue-router配置：
  new Router({
    routes,
    mode: 'history', // hash
    // base: '/base/'
    linkActiveClass: 'active-link',     // 父级a标签加这个  比如：当前页是/login/eact  /login的a标签加active-link
    linkExactActiveClass: 'exact-active-link',  // 完全匹配的情况下加这个class
    scrollBehavior (to, from, savedPosition) {  滚动
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
    // fallback: true  treu：如果浏览器不支持history路由，自动设置
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
  })
  export default [
    {
      path: '/',
      redirect: '/app',
      name:'app',    // 命名路路由，可以通过<router-link :to="{name:'app'}"></router-link>跳转
      meta:{
        desc:'页面描述'
      }
    },
    {
      path: '/app',
      component: () => import('../views/todo/todo.vue'),
      children:[  // 子路由
        {
          path:'test',
          component: Test
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/arg/:id',   // '/arg/:id?a=123&b=456'  this.$route.params = {id:XXX}   this.$route.query = {a:123,b:456}
      component: () => import('../views/login/login.vue')
    }
    {
      path: '/arg/:id?a=123&b=456',
      props:true,   // 可以直接this.props.id拿到
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/arg/:id?b=456',
      props:(route)=>({id:route.params.id,b:route.query.b}),
      component: () => import('../views/login/login.vue'),
      beforeEnter(to, from, next)=>{}
    }
  ]

组件里面可以拿到this.$route：
属性： fullPath hash  matched  meta  name  params  path  query

router.beforeEach((to, from, next)=>{})
beforeEnter(to, from, next) { // 路由里面的钩子函数,可以给next传回调函数，拿到实例对象
  next(vm=>{console.log(vm)})
}
beforeRouteEnter()   // 组件里面的钩子函数
beforeRouteUpdate()
router.beforeResolve((to, from, next)=>{})
router.afterEach((to, from)=>{})


vuex:
new Vuex.Store({
  strict:true,  // 不能通过this.$store.abc = 123 修改store的值
  state,
  getters,
  plugins:[
    (store)=>{
        // 结合subscribe和subscribeAction可以制作vuex插件
    }
  ],
  actions:{
    update(store,parm){
      store.dispatch('updateM',parm)
    }
  },
  mutations:{
    updateM(state,parm){
    }
  },
  modules:{
    a:{
      namespaced:true, // 默认子模块的mutations会跟父state合并，设置为true，就不会合并了
      state:{
        text:123
      },
      getters:{
        getText(state,getters,rootState,rootGetters){}
      }
      actions:{
        update({commit,state,getters,rootState,rootGetters},parm){}
      }
      mutations:{
        updateM(state,parm){
        }
      },
    },
    b:{}
  }
})

...mapstate(['count'])
...mapstate({
  counter:'count'
  textget:'a/text'
})
...mapstate({
  counter:(state)=>state.count
})
mapGetters用法同上

this.$store.dispatch('update',{a:1})
...mapActions(['update'])
this.$store.commit('update',{a:1})
...mapMutations(['updateM'])

commit('updateM',parm,{root:true})  // {root:true}意思是在z子module里面调用上级或者同级的mutations

store.registerModule('c',{   // 动态加载注册模块
  state,
  getters,
  actions:{
    update(store,parm){
      store.dispatch('updateM',parm)
    }
  },
  mutations:{
    updateM(state,parm){
    }
  },
})
store.unregisterModule('c')  // 解绑

store的热更新
if(module.hot){
  module.hot.accept([
    './state',
    './actions',
    './mutations',
    './getters',
  ],()=>{
    cosnt newState = require('./state').default;
    cosnt newActions = require('./actions').default
    cosnt newMutions = require('./mutations').default
    cosnt newGetters = require('./getters').default
    store.hotUpdate({
      state:newState,
      actions:newActions,
      mutations:newMutions,
      getters:newGetters
    })
  })
}

store.watch((state)=>{return state.count+1},(newwCount)=>{console.log(newwCount)}) // state俩面的count变化会触发第一个参数函数，第一个参数函数返回后会调用第二个参数方法并把值传入


store.subscribe((mutataion,state)=>{ // 每次调用commit方法会触发这个方法
  console.log(mutataion.type)
  console.log(mutataion.payload)
})


store.subscribeAction((action,state)=>{ // 每次调用dispatch方法会触发这个方法
  console.log(action.type)
  console.log(action.payload)
})
