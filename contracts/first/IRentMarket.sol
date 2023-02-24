// SPDX-License-Identifier: MIT
pragma solidity 0.8;

interface IRentMarket {

    struct Rent {
        uint id;
        uint tokenId;
        address collectionAddress;
        string tokenUri;
        address customer;
        uint lendId;
        uint timeUnitSeconds;
        uint timeUnitCount;
        uint startTimestamp;
        uint endTimestamp;
    }

    struct Lend {
        uint id;
        uint tokenId;
        address collectionAddress;
        string tokenUri;
        address owner;
        uint timeUnitSeconds;
        uint timeUnitPrice;
        uint timeUnitCount;
        uint startTimestamp;
        uint endTimestamp;
        uint[] rents;
    }

    function getTokenPayment() 
        external view returns(address token);

    function getAvailableStatus(uint lendId) 
        external view returns(bool available);

    // list of all lends
    function getLends() 
        external view returns(Lend[] memory lends);

    // list of all rents
    function getRents() 
        external view returns(Rent[] memory rents);

    // lend page
    function getOwnerLends(address owner)
        external view returns(Lend[] memory lends);

    // rent page
    function getAvailableLends() 
        external view returns(Lend[] memory lends);

    function getCustomerRents(address customer) 
        external view returns(Rent[] memory rents);

    function setTokenPayment(address token) 
        external;

    function initLend(
        uint tokenId,
        address collectionAddress,
        uint timeUnitSeconds,
        uint timeUnitPrice,
        uint timeUnitCount
    )
        external returns(uint256 lendId);

    function closeLend(uint lendId)
        external;

    function intiRent(
        uint lendId, 
        uint timeUnitCount
    ) 
        external returns(uint rentId);
}