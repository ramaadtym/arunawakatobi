<template>
  <div>
    <vx-header :brand="title" :subBrand="subTitle" :logo="logo">
      <!-- <vx-shortcut :items="shortcutMenu" v-if="isSuperAdmin"></vx-shortcut> -->
      <vx-user-menu :user="user" :menu="userMenu"></vx-user-menu>
    </vx-header>
    <vx-navbar title="app name">
      <template v-for="m in applicationMenu">
        <vx-nav-item :to="m.route" :exact="m.exact"><span class="ks-icon la" :class="m.icon"></span>{{ m.name }}</vx-nav-item>
      </template>
    </vx-navbar>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import session from '../services/session'
  import menu from '../services/menu'
  import shortcut from '../services/shortcut'

  export default {
    data () {
      return {
        logo: '/static/img/logo-wakatobi.png',
        title: 'Web Dinas',
        subTitle: 'Klik Nelayan Wakatobi',
        menu: [
          {text: '', link: '', child: []}
        ],
        userMenu: [
          // {link: '/settings', icon: 'la-wrench', text: 'Setting'},
          {link: '/', icon: 'la-sign-out', text: 'Logout', onClick: this.logout}
        ],
        bsNav: []
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('auth/doLogout')
      }
    },
    computed: {
      isSuperAdmin () {
        return session.me().user_group_id === '65536'
      },
      user() {
        var me = session.me()
        me.name = me.full_name
        me.avatar = '/static/img/avatar.png'
        return me
      },
      applicationMenu() {
        return menu(this.user.user_group_id)
      },
      shortcutMenu() {
        return shortcut(this.user.user_group_id)
      }
    }
  }
</script>

<style>
  a:not([href]):not([tabindex]), a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {
    color: inherit !important;
  }

  .form-control.white-bg {
    background: #fff !important;
  }

  .ks-theme-primary .ks-navbar {
    background: #0864e1;
  }

  .ks-navbar > .navbar-brand {
    min-width: 50px;
  }

  .ks-navbar > .navbar-brand > .navbar-logo {
    position: inherit;
    width: auto;
    height: auto;
    background: none;
    box-shadow: none;
    border-radius: inherit;
  }

  .ks-navbar > .navbar-brand > .navbar-logo > .logo-link {
    width: auto;
    height: auto;
    background: none;
    border: none;
  }

  .ks-navbar > .navbar-brand > .navbar-logo > .logo-link img {
    height: 42px;
    width: auto;
  }

  .ks-navbar > .ks-wrapper > .nav > .ks-brand-title > h3 {
    text-transform: none;
  }

  .ks-navbar > .ks-wrapper > .nav > .ks-brand-title > span {
    margin-left: 5px;
    padding-top: 5px;
    color: #fff;
  }

  .ks-navbar-horizontal > .navbar-logo-text {
    display: none;
  }

  .ks-theme-primary .ks-navbar-horizontal {
    background: #fff;
  }

  .ks-navbar .nav-item {
    border: none;
  }

  .ks-theme-primary .ks-navbar > .ks-wrapper > .nav > .ks-navbar-actions > .ks-user {
    border-right: none;
  }

  body.ks-sidebar-none .ks-container > .ks-page > .ks-header > .ks-title {
    background-color: #f5f6fa;
  }

  body.ks-sidebar-none .ks-container > .ks-page > .ks-header > .ks-title > h3 {
    color: #555555;
  }

  body.ks-sidebar-none .ks-container > .ks-page > .ks-header > .ks-title > span {
    color: #555555;
  }

  .ks-theme-primary .ks-navbar-horizontal .nav-item .nav-link.active {
    border: none;
  }

  .ks-theme-primary .ks-navbar-horizontal .nav-item .nav-link > .ks-icon {
    width: 30px;
    color: inherit;
  }

  .ks-theme-primary .ks-navbar-horizontal .nav-item .nav-link > .ks-icon.la-homes {
    background: url("../../static/img/home.png") no-repeat center;
  }

  .ks-theme-primary .ks-navbar-horizontal .nav-item .nav-link > .ks-icon.la-institutions {
    background: url("../../static/img/building.png") no-repeat center;
  }

  .ks-theme-primary .ks-navbar-horizontal .nav-item .nav-link > .ks-icon.la-pengguna {
    background: url("../../static/img/pengguna.png") no-repeat center;
  }

  .ks-theme-primary .ks-navbar-horizontal .nav-item .nav-link > .ks-icon.la-hearts {
    background: url("../../static/img/komoditas.png") no-repeat center;
  }

  .ks-theme-primary .ks-navbar-horizontal .nav-item .nav-link > .ks-icon.la-lists {
    background: url("../../static/img/produksi.png") no-repeat center;
  }

</style>
