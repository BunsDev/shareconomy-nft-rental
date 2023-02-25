// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "./IOwnableLink.sol";
import "./IOwnable.sol";

contract OwnableLink is IOwnableLink {
    IOwnable ownable;

    function setOwnable(address _ownable) public override CheckPerms {
        ownable = IOwnable(_ownable);
    }

    modifier CheckPerms() {
        require(ownable.checkPerms(msg.sender) );
        _;
    }

    modifier CheckOwner() {
        require(ownable.checkOwner(msg.sender));
        _;
    }
}
