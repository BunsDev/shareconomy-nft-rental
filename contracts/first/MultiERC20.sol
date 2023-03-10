// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IMultiERC20.sol";

contract MultiERC20 is IMultiERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function grandMinter(address minter) public onlyRole(getRoleAdmin(MINTER_ROLE)) {
        _grantRole(MINTER_ROLE, minter);
    }

    function revokeMinter(address minter) public onlyRole(getRoleAdmin(MINTER_ROLE)) {
        _revokeRole(MINTER_ROLE, minter);
    }

    function mint(address to, uint256 amount) public override {
        _mint(to, amount);
    }

    function burn(uint amount) public override(IERC20Burnable, ERC20Burnable) {
        super.burn(amount);
    }

    function burnFrom(address account, uint amount) public override(IERC20Burnable, ERC20Burnable) {
        super.burnFrom(account, amount);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC20).interfaceId;
    }
}