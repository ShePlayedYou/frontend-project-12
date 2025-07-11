const apiPath = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'http://localhost:5001/api/v1'

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  regPath: () => [apiPath, 'signup'].join('/'),
  getChannels: () => [apiPath, 'channels'].join('/'),
  getMessages: () => [apiPath, 'messages'].join('/'),
  sendMessage: () => [apiPath, 'messages'].join('/'),
  createChannel: () => [apiPath, 'channels'].join('/'),
  editChannel: id => [apiPath, 'channels', id].join('/'),
  removeChannel: id => [apiPath, 'channels', id].join('/'),
}
