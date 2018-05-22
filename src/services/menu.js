var menu = [
  {
    name: 'Beranda',
    route: '/',
    icon: 'la-home',
    exact: true,
    roles: ['superadmin', 'admin']
  },
  {
    name: 'UPTD',
    route: '/uptd',
    icon: 'la-users',
    roles: ['superadmin']
  },
  {
    name: 'Manajemen Transaksi',
    route: '/management-transaction',
    icon: 'la-money',
    roles: ['superadmin']
  },
  {
    name: 'Komoditas',
    route: '/comodity',
    icon: 'la-cubes',
    roles: ['superadmin']
  },
  {
    name: 'Laporan',
    route: '/report',
    icon: 'la-file-text',
    roles: ['superadmin']
  },
  {
    name: 'Enumerator',
    route: '/enumerator',
    icon: 'la-users',
    roles: ['admin']
  }
]

export default function (usergroup) {
  const role = usergroup === '65536' ? 'superadmin' : 'admin'
  return menu.filter(function (item) {
    return item.roles.indexOf(role) > -1
  })
}
