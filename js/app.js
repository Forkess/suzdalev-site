var app = new Vue({
  el: "#app",
  components: {
    vueSlider: window["vue-slider-component"]
  },
  data: {
    dlina: 1600,
    width: 800,
    stages: {
      label: "Ярусность",
      options: ["Одноярусная", "Двухъярусная"],
      selected: 0
    },
    boxes: {
      label: "Ящики",
      options: ["Без ящиков", "1 ящик", "2 ящика"],
      selected: 0
    },
    colors: {
      label: "Цвет",
      options: ["Салатовый", "Белый", "Черный", "Голубой", "Розовый"],
      selected: 0
    },
    materials: {
      label: "Материал",
      options: ["Сосна", "Ясень", "Бук"],
      selected: 0
    },
    name: "",
    phone: "",
    slider_options: {
      style: {},
      bgStyle: {
        backgroundColor: "#229195",
        height: "3px",
        borderRadius: "0"
      },
      processStyle: {
        backgroundColor: "#64ac5e",
        height: "3px",
        borderRadius: "0"
      },
      sliderStyle: {
        backgroundColor: "transparent",
        boxShadow: "none"
      },
      tooltipDir: "top",
      tooltipStyle: {
        transform: "translate(0,5px)",
        borderRadius: "0",
        backgroundColor: "#229195",
        borderColor: "#229195",
        padding: "4px 8px",
        fontSize: "1rem"
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      var swiper = new Swiper(".swiper-container", {
        spaceBetween: 50,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      });
    });
  },
  methods: {
    send: function() {
      var self = this;
      var form = {
        dlina: { label: "Длина", data: self.dlina },
        width: { label: "Ширина", data: self.width },
        stages: {
          label: "Ярусы",
          data: self.stages.options[self.stages.selected]
        },
        boxes: {
          label: "Ящики",
          data: self.boxes.options[self.boxes.selected]
        },
        color: {
          label: "Цвет",
          data: self.colors.options[self.colors.selected]
        },
        material: {
          label: "Материал",
          data: self.materials.options[self.materials.selected]
        },
        name: { label: "Имя", data: self.name },
        phone: { label: "Телефон", data: self.phone }
      };
      console.log(form);
      self.submit(form, "/process.php");
    },
    submit: function(data, url) {
      this.post(data, url, function(result) {
        console.log(result);
        if (result) {
          for (var key in data.form_data) {
            data.form_data[key].data = "";
          }
          data.isSent = true;
          setTimeout(function() {
            data.isSent = false;
          }, 3e3);
        }
      });
    },
    post: function(data, url, success) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, !0);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data));
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          success(xhr.responseText);
        }
      };
    }
  },
  computed: {
    current_branch: function() {
      return this.services[this.active_service];
    }
  }
});
