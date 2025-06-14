// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Placehold} from "../src/Placehold.sol";
import {PlaceholdNFT} from "../src/721-PHD.sol";
import {PHD} from "../src/20-PHD.sol";

contract Deployer is Script {
    function run() public {
        vm.startBroadcast();

        // Step 1: Deploy ERC-20 Token
        PHD token = new PHD();

        // Step 2: Deploy ERC-721 NFT
        PlaceholdNFT certificate = new PlaceholdNFT();

        // Step 3: Deploy Staking Logic, with token + NFT passed to constructor
        Placehold staking = new Placehold(address(token), address(certificate));

        // Step 4: Grant MINTER_ROLE to staking contract
        bytes32 MINTER_ROLE = certificate.MINTER_ROLE();
        certificate.grantRole(MINTER_ROLE, address(staking));

        vm.stopBroadcast();
    }
}
