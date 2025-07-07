const apiPath = import.meta.env.VITE_API_URL.replace(/\/+$/, ''); 

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  getChannels: () => [apiPath, 'channels'].join('/'),
  getMessages: () => [apiPath, 'messages'].join('/'),
  sendMessage: () => [apiPath, 'messages'].join('/'),
  createChannel: () => [apiPath, 'channels'].join('/'),
  editChannel: (id) => [apiPath, 'channels', id].join('/'),
  removeChannel: (id) => [apiPath, 'channels', id].join('/')
};