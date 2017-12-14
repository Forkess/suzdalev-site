Vue.component("custom-select", {
  template: `
        <div class="select">
            <div class="select__selected" @click="select">{{block.options[block.selected]}}
            <svg class="select__arrow" width="16" height="9" xmlns="http://www.w3.org/2000/svg">
                <path  d="M13.7206.246506c.2129-.2127051.523-.2956954.8137-.2177099.2906.0779859.5176.3050989.5953.5957899.0778.29069-.0054.600794-.2183.813494L8.17451 8.17072c-.32885.32874-.8619.32874-1.19074 0L.246927 1.43808C.0340716 1.22538-.049138.915276.028642.624586.106422.333895.333375.106782.62401.0287961c.290636-.0779855.6008.0050048.81365.2177099L7.57914 6.38545 13.7206.246506z"/>  
            </svg>
            </div>
            <div class="select__options" v-if="isEditting" :style="{top: -block.selected*100+'%'}">
                <div v-for="(option,index) in block.options" class="select__option" :class="{select__option_selected: index==block.selected }" @click="choose(index)">{{option}}</div>
            </div>
            <div class="select__overlay" v-if="isEditting" @keyup.esc="cancel" @click="cancel"></div>
        </div>
    `,
  props: {
    block: Object
  },
  data: function() {
    return {
      isEditting: false
    };
  },
  methods: {
    select: function() {
      this.isEditting = true;
    },
    choose: function(index) {
      this.block.selected = index;
      this.isEditting = false;
    },
    cancel: function() {
      this.isEditting = false;
    }
  }
});
