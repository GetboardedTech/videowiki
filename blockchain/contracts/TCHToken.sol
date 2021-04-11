// SPDX-License-Identifier: None

pragma solidity ^0.6.0;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/solc-0.6/contracts/presets/ERC20PresetMinterPauser.sol';

contract TCHToken is ERC20PresetMinterPauser {
    constructor() public ERC20PresetMinterPauser('TCH Token', 'TCH') {}
}
