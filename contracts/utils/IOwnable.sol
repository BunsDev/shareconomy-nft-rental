// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

interface IOwnable {
    function checkPerms(address addr) external view returns(bool);
    function checkOwner(address addr) external view returns(bool);
    function owner() external view returns(address);
    function getWallet() external view returns(address);
}
