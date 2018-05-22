import rest from '../services/rest'

const isDevMode = process.env.NODE_ENV === 'dev'

const requestEndpoint = function (options) {
  const data = {
    endpoint: `${options.method} ${options.path}` || 'whatever (I\'m not sure)',
    result: options.result,
    message: `
      Hello bro, we need API with this specifications:
      {description}
      \`\`\`
      Method: ${options.method || 'whatever (I\'m not sure)'}
      Path: ${options.path || 'whatever (I\'m not sure)'}
      Params: ${options.params ? JSON.stringify(options.params) : 'I\'m not sure'}
      Result: ${JSON.stringify(options.result)}
      \`\`\`

      Please send us a message if this API has been added or similar API already exists somewhere.

      > This message is auto send whenever we open a page or do something that needs this API while doing our tasks. So sorry if this does spamming.

      Best Regards,
      Front-end Devs Aruna
    `.trim().split('\n').map(line => line.trim()).join('\n')
  }

  data.message = data.message.replace(options.description ? `\n${options.description}\n` : '')

  rest.post('we-need-this', data)
  .then(res => {
    console.info(`Endpoint '${data.endpoint}' has been requested.`)
  })
  .catch(err => {
    console.warn(`Failed to request endpoint '${data.endpoint}'. Error: ${err.message}`)
  })
}

export default function (options) {
  options = {result: {}, delay: Math.random() * 1000, ...options}

  if (isDevMode && options.request === true) {
    requestEndpoint(options)
  }

  return new Promise((resolve) => {
    resolve(options.result)
  })
}
