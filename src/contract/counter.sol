// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract BIT_KCA{
    // declaring a state variables
    uint256 number;
    string public message;

    constructor (uint256 _startingpoint, string memory _startingMessage) {
        number = _startingpoint;
        message = _startingMessage;
    }

    function getNumber() external view returns (uint256){
        return number;
    }
    // increase a number by 1
    function increaseNumber () external {
        number++;
    }
    // decrease a number by 1
    function decreaseNumber () external {
        number--;
    }
    // function to update the message
    function setMessage (string memory newMessage) public {
        message = newMessage;

    }
}
