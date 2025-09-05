//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface ICommunity {
    function isMember(address user) external view returns (bool);
    function isLeader(address user) external view returns (bool);
    function getMembershipNFT() external view returns (address);
}
