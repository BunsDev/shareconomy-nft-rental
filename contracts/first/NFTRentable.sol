// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./INFTRentable.sol";
import "../EIPs/ERC4907.sol";
import "../utils/OwnableLink.sol";

contract NFTRentable is INFTRentable, ERC4907, OwnableLink {

    using Counters for Counters.Counter;
    using Strings for uint;

    constructor(string memory _name, string memory _symbol, address _ownable) ERC4907(_name, _symbol) {
        ownable = IOwnable(_ownable);
    }
    
    Counters.Counter private _tokenIds;

    function mint(address to) public override returns(uint256 tokenId) {
        tokenId = _tokenIds.current();
        _tokenIds.increment();
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenId.toString());
    }
}