
import web3 from './web3';
import Upload from './build/Upload.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(Upload.interface), address);
};