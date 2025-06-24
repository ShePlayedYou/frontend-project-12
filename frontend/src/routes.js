const apiPath = import.meta.env.VITE_API_URL.replace(/\/+$/, ''); 

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  getChannels: () => [apiPath, 'channels'].join('/'),
  getMessages: ( )=> [apiPath, 'messages'].join('/'),
};