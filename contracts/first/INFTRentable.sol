// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "../EIPs/IERC4907.sol";

interface INFTRentable is IERC4907 {
    function mint(address to) external returns(uint256 tokenId);
}