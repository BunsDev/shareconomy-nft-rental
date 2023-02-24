// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "../EIPs/ERC4907.sol";

interface INFTRentable is IERC4907 {
    function mint(address to, string memory uri) external returns(uint256 tokenId);
}