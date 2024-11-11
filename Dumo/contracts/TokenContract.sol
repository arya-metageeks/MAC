// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PaymentToken is ERC20 {
    address public immutable i_owner;
    uint8 private constant DECIMALS = 18;

    modifier _onlyOwner {
        require(msg.sender == i_owner, "Only owner can call this function");
        _;
    }

    constructor(uint256 _totalSupply) ERC20("TestToken", "TTKn") {
        i_owner = msg.sender;
        _mint(msg.sender, _totalSupply * 10 ** DECIMALS);
    }

    function mint(address to, uint256 amount) external _onlyOwner{
        _mint(to, amount * 10 ** DECIMALS);
    }

    function burn(address from, uint256 amount) external _onlyOwner {
        _burn(from, amount * 10 ** DECIMALS);
    }

    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }
}
