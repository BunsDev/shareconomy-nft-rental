// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "./NFTRentable.sol";
import "./IMultiNFT.sol";

contract MultiNFT is IMultiNFT, NFTRentable {
    constructor(string memory _name, string memory _symbol, address _ownable) 
        NFTRentable(_name, _symbol, _ownable) {}

    string _baseURIStored;

    function _baseURI() internal view override returns(string memory) {
        return _baseURIStored;
    }

    function setBaseURI(string memory baseURIStored) public CheckPerms {
        _baseURIStored = baseURIStored;
    }
}