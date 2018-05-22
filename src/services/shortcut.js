var shortcut = [
  // {
  //   link: '/entity/create',
  //   icon: 'la-institution',
  //   text: 'Lembaga',
  //   isAdmin: 1
  // },
  // {
  //   link: '/users/create',
  //   icon: 'la-user',
  //   text: 'Pengguna',
  //   isAdmin: 1
  // },
  // {
  //   link: '/commodity/create',
  //   icon: 'la-heart',
  //   text: 'Komoditas',
  //   isAdmin: 1
  // }
]
export default function (usergroup) {
  if (usergroup === '65536') {
    return shortcut
  }

  return shortcut.filter(function (item) {
    return !item.isAdmin
  })
}
