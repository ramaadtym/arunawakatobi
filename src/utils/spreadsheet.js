import XLSX from 'xlsx'

const LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

const getColumnByIndex = function (index) {
  if (LETTERS[index]) return LETTERS[index]

  const x = Math.floor(index / LETTERS.length) - 1
  const y = index % LETTERS.length
  return LETTERS[x] + LETTERS[y]
}

const s2ab = function (s) {
  if (typeof ArrayBuffer !== 'undefined') {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  } else {
    const buf = new Array(s.length)
    for (let i = 0; i !== s.length; ++i) {
      buf[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  }
}

const createBlob = function (workbook, type = 'xlsx') {
  const wbout = XLSX.write(workbook, {
    bookType: type,
    bookSST: true,
    type: 'binary'
  })

  try {
    return new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    })
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.log(e, wbout)
    }
  }
  return wbout
}

const generateFromTable = function (tableDOM, type = 'xlsx', options) {
  options = {
    sheetName: 'Sheet 1',
    ...options
  }

  const workbook = XLSX.utils.table_to_book(tableDOM, {
    sheet: options.sheetName
  })

  return createBlob(workbook)
}

const generateFromItems = function (fields, items, options) {
  console.log({fields, items})
  options = {
    sheetName: 'Sheet 1',
    ...options
  }

  const cols = fields.map((field, i) => {
    return {
      name: getColumnByIndex(i),
      key: i
    }
  })

  const data = {
    cols,
    data: [
      fields.map(field => field.label),
      ...items.map((item, i) => {
        return fields.map(field => {
          let value = ''
          if (item[field.key] === field.key) {
            value = item[field.key]
          }
          if (typeof field.resolve === 'function') {
            value = field.resolve(value, item, i)
          }
          return value
        })
      })
    ]
  }

  console.log(data, '<<< XLS DATA')

  const worksheet = XLSX.utils.aoa_to_sheet(data.data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, options.sheetName)

  return createBlob(workbook)
}

export default {
  generateFromTable,
  generateFromItems
}
