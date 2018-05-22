import faker from 'faker'

export default {
  uptd () {
    return {
      id: faker.random.number(),
      name: faker.company.companyName(),
      count_users: faker.random.number(20),
      is_active: faker.random.boolean()
    }
  },
  uptdUser () {
    return {
      id: faker.random.number(),
      full_name: faker.name.findName(),
      registration_date: faker.date.past(),
      type: faker.random.arrayElement(['Nelayan', 'Budidaya', 'Tambak', 'Tangkapan', 'UPI', 'PTD']),
      is_active: faker.random.boolean()
    }
  },
  production () {
    return {
      count: faker.random.number(5000) + 'kg',
      date: faker.date.past(),
      type: faker.random.arrayElement([
        'tangkapan',
        'budidaya'
      ])
    }
  },
  comodity () {
    return {
      id: faker.random.number(),
      name: faker.commerce.product(),
      url_image: faker.image.food(50, 50, true)
    }
  },
  district () {
    return {
      id: faker.random.number(),
      name: faker.address.state()
    }
  }
}
