// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SocialVault {
    struct DataEntry {
        string ipfsHash;
        uint256 timestamp;
        string platform;
        bool encrypted;
    }

    mapping(address => DataEntry[]) private userVaults;
    mapping(address => bool) public registeredUsers;

    event DataStored(address indexed user, string ipfsHash, string platform);
    event UserRegistered(address indexed user);

    function registerUser() external {
        require(!registeredUsers[msg.sender], "User already registered");
        registeredUsers[msg.sender] = true;
        emit UserRegistered(msg.sender);
    }

    function storeData(
        string memory _ipfsHash,
        string memory _platform,
        bool _encrypted
    ) external {
        require(registeredUsers[msg.sender], "User not registered");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");

        DataEntry memory newEntry = DataEntry({
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            platform: _platform,
            encrypted: _encrypted
        });

        userVaults[msg.sender].push(newEntry);
        emit DataStored(msg.sender, _ipfsHash, _platform);
    }

    function getUserDataCount(address _user) external view returns (uint256) {
        return userVaults[_user].length;
    }
}