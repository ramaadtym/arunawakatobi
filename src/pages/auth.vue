<template>
  <div class="background-cover">
    <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <div class="header-auth text-center">
            <img src="/static/img/logo-wakatobi.png" title="Klik Nelayan Wakatobi" class="logo">
            <h3>KLIK NELAYAN WAKATOBI</h3>
            <h2><strong>WEB DINAS</strong></h2>
          </div>
          <div class="text-center col-md-4 col-sm-offset-4 mx-auto loginForm">
            <!-- login form -->
            <vx-form :model="form.data" :rules="form.rules" ref="ruleForm">
              <vx-form-item prop="username" :error="errors.username">
                <vx-input name="username" v-model="form.data.username" placeholder="Username" id="username"></vx-input>
              </vx-form-item>
              <vx-form-item prop="password" :error="errors.username">
                <vx-input type="password" name="password" v-model="form.data.password" placeholder="Password" id="password"></vx-input>
              </vx-form-item>
              <vx-button type="submit" class="btn btn-primary btn-block" :loading="submitted" @click="onSubmit">Login</vx-button>
            </vx-form>
            <!--<div class="pwd-auth text-center">-->
              <!--<a href="#"><i class="la la-key"></i> Lupa Password?</a>-->
            <!--</div>-->
          </div>
        </div>
        <div class="container footer-auth text-center vertical-10p">
          <span>Klik Nelayan Wakatobi - Web Dinas</span>
          <p>Aruna Indonesia. PT Aruna Jaya Nuswantara. www.kliknelayanwakatobi.co.id</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default{
    data() {
      return {
        form: {
          rules: {
            username: [
              {required: true, message: 'Please input a valid email', trigger: 'blur'},
              {username: true, message: 'Please input a valid email', trigger: 'blur'}
            ],
            password: [
              {required: true, message: 'Please input your Password', trigger: 'blur'}
            ]
          },
          data: {
            username: null,
            password: null
          }
        }
      }
    },
    computed: mapState({
      errors: state => state.Form.errors,
      submitted: state => state.Form.submitted
    }),
    methods: {
      onSubmit () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('auth/doLogin', this.form.data)
          }
        })
      }
    }
  }
</script>
<style>
  html, body, #app, .container-table {
    height: 100%;
  }


  .header-auth {
    width: 100%;
  }

  .header-auth h3 {
    margin: 20px 0px 0px;
    color: #fff;
    font-size: 1.2em;
  }

  .header-auth .logo {
    width: 100px;
    height: auto;
  }

  .header-auth h2 {
    margin: 0px 0px 20px;
    color: white;
  }

  .background-cover {
    height: 100%;
    background: url('../../static/img/auth_bg.png') no-repeat;
    background-size: cover;
  }

  .container-table {
    display: table;
    color: white;
  }

  .vertical-center-row {
    display: table-cell;
    vertical-align: middle;
  }

  .vertical-20p {
    padding-top: 20%;
  }

  .pwd-auth {
    display: block;
    margin: 15px 0 0;
  }

  .pwd-auth a {
    font-weight: 600;
  }

  .pwd-auth a i {
    padding: 5px;
    color: #fff;
    background: #1ca05b;
    border-radius: 50%;
  }

  .vertical-15p {
    padding-top: 15%;
  }

  .vertical-10p {
    padding-top: 10%;
  }

  .vertical-5p {
    padding-top: 5%;
  }

  .loginForm .input-group {
    padding-bottom: 1em;
    height: 4em;
  }

  .loginForm .input-group input {
    height: 3.5em;
    border-radius: 5px;
    border: none;
  }

  .btn-primary {
    height: 3.5em;
    background: #0b3e93;
    border-radius: 5px;
    border: none;
  }

  .footer-auth { color: white; opacity: .8; }

  .footer-auth span {
    font-size: 14px;
    line-height: 20px;
  }

  .footer-auth p {
    margin-top: 0px;
  }
</style>
