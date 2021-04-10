const constants = {
  apiUrl: 'https://dev.api.videowiki.pt',
  url: 'https://dev.videowiki.pt'
};
if (process.env.NODE_ENV === 'production') {
  constants.apiUrl = 'https://dev.api.videowiki.pt';
  constants.url = 'https://dev.videowiki.pt';
}
export default constants;
