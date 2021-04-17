import web3 from './web3';
import CreateVideo from './build/CreateVideo.json';

const instance = new web3.eth.Contract(
  JSON.parse(CreateVideo.interface),
  '0x2Bc67B770aD6c7FBFCD52Abcc718838e98DebF34'
);

export default instance;