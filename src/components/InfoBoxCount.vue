<template>
  <div class="info-box-count">
      <div class="row">
        <div class="col-lg-4 col-xs-12">
          <div class="box-icon">
            <i :class="'icon ' + icon"></i>
          </div>
        </div>
        <template v-for="countProperty in countProperties">
          <div class="col-xs-12" :class="[columnClass, countProperty.class]">
            <h4 class="count">{{ countProperty.count }}</h4>
            <span>{{ countProperty.label }}</span>
          </div>
        </template>
      </div>
  </div>
</template>

<script>
export default {
  name: 'info-box-count',
  props: {
    icon: {
      type: String,
      required: true
    },
    countProperties: {
      type: Array,
      required: true,
      limit: function (value) {
        return value.length <= 2
      }
    }
  },
  computed: {
    columnClass () {
      return (this.countProperties.length === 2 ? 'col-lg-4' : 'col-lg-8')
    }
  }
}
</script>

<style>
.info-box-count {
  padding: 20px;
  border: 1px solid #ddd;
  position: relative;
}

.info-box-count .box-icon {
  background: white;
  text-align: center;
}

.info-box-count .icon {
  margin: auto;
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
  font-size: 60px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  background: #efefef;
  border-radius: 50%;
}

.info-box-count {
  color: #676767;
}

.info-box-count h4.count {
  font-size: 36px;
  color: inherit;
  margin-bottom: 5px;
}

.info-box-count span {
  display: inline-block;
  width: 100%;
  font-size: 16px;
  padding-bottom: 10px;
  color: #676767;
  border-bottom: 2px solid #efefef;
}

@media screen and (max-width: 920px) {
  .info-box-count {
    text-align: center !important;
    margin-bottom: 30px;
  }

  .info-box-count .icon {
    margin-bottom: 15px;
  }

  .info-box-count h4.count {
    font-size: 2em;
  }
}

</style>
