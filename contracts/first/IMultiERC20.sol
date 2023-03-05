// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";

interface IERC20Burnable is IERC20{
    function burn(uint256 amount) external;

    function burnFrom(address account, uint256 amount) external;
}

interface IMultiERC20 is IERC20Burnable, IAccessControl {
    function mint(address to, uint256 amount) external;
}