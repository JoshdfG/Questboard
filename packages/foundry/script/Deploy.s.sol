//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import "../contracts/CommunityFactory.sol";
import "../contracts/CommunityMembership.sol";
import "../contracts/Community_NFT.sol";
import "../libraries/Error.sol";
import "../libraries/Event.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../libraries/Event.sol";
import "../contracts/CommunityFactory.sol";

/**
 * @notice Main deployment script for all contracts
 * @dev Run this when you want to deploy multiple contracts at once
 *
 * Example: yarn deploy # runs this script(without`--file` flag)
 */
contract DeployScript is ScaffoldETHDeploy {
    Community public community;
    CommunityMembershipNFT public membershipNFT;
    CommunityFactory public factory;

    address[] public admins;
    address admin1 = address(0xA11CE);
    address admin2 = address(0xBEEF);
    address admin3 = address(0xCAFE);

    function run() external {
        admins.push(admin1);
        admins.push(admin2);
        admins.push(admin3);

        address usdc_token = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;
        factory = new CommunityFactory();
        factory.createCommunity("DevDAO", "A dev community", "ipfs://communityImage", admins, usdc_token);

        writeAddressesToFile(address(factory), "Factory");
    }

    function writeAddressesToFile(address addr, string memory text) public {
        string memory filename = "./deployed_contracts.txt";

        vm.writeLine(filename, "-------------------------------------------------");
        vm.writeLine(filename, text);
        vm.writeLine(filename, vm.toString(addr));
        vm.writeLine(filename, "-------------------------------------------------");
    }
}
