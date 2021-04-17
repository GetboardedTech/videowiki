const constants = {
  apiUrl: 'https://dapi.videowiki.pt',
  url: 'https://videowiki.pt'
};
if (process.env.NODE_ENV === 'production') {
  constants.apiUrl = 'https://dapi.videowiki.pt';
  constants.url = 'https://videowiki.pt';
}
export default constants;
