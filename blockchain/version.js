
import web3 from './web3';
import Version from './build/Version.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(Version.interface), address);
};