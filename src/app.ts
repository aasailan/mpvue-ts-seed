import { Vue, Component } from 'vue-property-decorator';

declare module 'vue/types/vue' {
  interface Vue {
    $mp: any;
  }
}

// 必须使用装饰器的方式来指定components
@Component({
  mpType: 'app' // mpvue特定
}as any)
export default class App extends Vue {
  // app hook
  onLaunch() {
    let opt = this.$root.$mp.appOptions;
  }

  onShow() {
    console.log('onShow');
    // debug('onShow');
  }

  onHide() {
    console.log('onHide');
    // debug('onHide');
  }

  mounted() { // vue hook
    console.log('mounted');
    // debug('mounted');
  }
}
