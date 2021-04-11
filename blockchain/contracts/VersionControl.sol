// SPDX-License-Identifier: None

pragma solidity ^0.6.0;

import 'https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/ChainlinkClient.sol';
import './TCHToken.sol';

contract VersionControl is ChainlinkClient {
    // Defining the Asset
    struct Asset {
        uint256 assetId;
        string name;
        string metadata;
        string accessLink;
        uint256 version;
        bool isPresent;
    }

    mapping(uint256 => Asset) public assets;

    address public tokenAddress;
    address public owner;
    uint256 availableId;
    address receiver;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() public {
        owner = msg.sender;
        availableId = 0;

        setPublicChainlinkToken();

        // Oracle : LinkRiver
        // Chain: Rinkeybi
        oracle = 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40; 
        jobId = '3b7ca0d48c7a4b2da9268456665d11ae';

        fee = 0.1 * 10**18; // 0.1 LINK
    }

    // Change the address of the token
    function setTokenAddress(address _tokenAddress) external {
        require(
            msg.sender == owner,
            'Only the present owner can modify the token address'
        );

        tokenAddress = _tokenAddress;
    }

    // Change the owner of the contract
    function changeOwner(address _newOwner) external {
        require(
            msg.sender == owner,
            'Only the present owner can modify the ownernship'
        );

        owner = _newOwner;
    }

    // Mint token
    function mintToken(address _contributor, uint256 _amount) private {
        TCHToken token = TCHToken(tokenAddress);
        token.mint(_contributor, _amount);
    }

    function callOracle(address contributor)
        private
        returns (bytes32 requestId)
    {
        // Calculate the total amount of tokens to be minted

        Chainlink.Request memory request =
            buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        string memory url = "https://dev.api.videowiki.pt/community/chainlink/";

        string memory urlToCall = string(abi.encodePacked(url, contributor));
        
        request.add('get', urlToCall);

        // Add the path to access the data
        request.add('path', 'reward');

        // Multiply the result by 1000000000000000000 to remove decimals
        int256 timesAmount = 10**18;
        request.addInt('times', timesAmount);

        // Send the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    // Create assets
    function createAsset(
        uint256 _id,
        string memory _name,
        string memory _metadata,
        string memory _accessLink
    ) public {
        require(
            assets[_id].isPresent != true,
            'Asset with this id is already present'
        );

        assets[_id].assetId = _id;
        assets[_id].name = _name;
        assets[_id].metadata = _metadata;
        assets[_id].accessLink = _accessLink;
        assets[_id].version = 1;
        assets[_id].isPresent = true;

        receiver = msg.sender;

        // mint tokens for the contributor
        callOracle(msg.sender);
    }

    // Merge update
    function merge(
        uint256 _id,
        string memory _accessLink,
        address _contributor
    ) public {
        require(
            assets[_id].isPresent == true,
            'No asset with this id is present'
        );

        assets[_id].accessLink = _accessLink;
        assets[_id].version += 1;

        receiver = _contributor;

        // mint the tokens for the contributor
        callOracle(_contributor);
    }

    // Fulfill for amount of tokens to be minted
    function fulfill(bytes32 _requestId, uint256 _amt)
        public
        recordChainlinkFulfillment(_requestId)
    {
        mintToken(receiver, _amt);
    }
}
