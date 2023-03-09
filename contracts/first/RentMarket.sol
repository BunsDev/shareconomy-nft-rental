// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../EIPs/IERC4907.sol";
import "../utils/OwnableLink.sol";
import "./IRentMarket.sol";

contract RentMarket is IRentMarket, OwnableLink {

    using Counters for Counters.Counter;
    
    constructor (address _owanble) {
        ownable = IOwnable(_owanble);
    }

    bytes4 INTERFACE_ERC4907 = type(IERC4907).interfaceId;
    bytes4 INTERFACE_ERC721 = type(IERC721).interfaceId;

    IERC20 _tokenPayment;

    Counters.Counter private _lends;
    Counters.Counter private _rents;
    mapping (address=>mapping (uint=>uint)) private _nftToLend;
    mapping (uint=>Lend) private _lendMap;
    mapping (uint=>Rent) private _rentMap;

    function isApprovedOrOwner(
        address spender, 
        uint256 tokenId, 
        address collectionAddress
    )
        public view override returns(bool)
    {
        IERC4907 collection = IERC4907(collectionAddress);
        address owner = collection.ownerOf(tokenId);
        return 
            spender == owner ||
            collection.isApprovedForAll(owner, spender) ||
            collection.getApproved(tokenId) == spender;
    }

    function getSupportedInterface(address collectionAddress)
        public view returns(Types supportedInterface) {
        IERC4907 nft = IERC4907(collectionAddress);
        if (nft.supportsInterface(INTERFACE_ERC4907)) {
            return Types.ERC4907;
        } else if (nft.supportsInterface(INTERFACE_ERC721)) {
            return Types.ERC721;
        } else {
            revert("Doesn't support ERC721 or ERC4907");
        }
    }

    function getTokenPayment() 
        public view override returns(address token) {
        token = address(_tokenPayment);
    }

    function getClosedRentStatus(uint lendId)
        public view returns(bool stealed /* or in use */) {
        Lend storage lend = _lendMap[lendId];
        for (uint i; i < lend.rents.length; i++) {
            Rent storage rent = _rentMap[lend.rents[i]];
            if (!rent.closed) {
                stealed = true;
            }
        }
    }

    function getAvailableStatus(uint lendId)
        public view override returns(bool available) {
        Lend storage lend = _lendMap[lendId];
        if (isApprovedOrOwner(
            address(this), 
            lend.tokenId, 
            lend.collectionAddress)) {
            if (lend.endTimestamp > block.timestamp) {
                return lend.rents.length == 0
                    ? true 
                    : _rentMap[
                        lend.rents[lend.rents.length-1]
                        ].endTimestamp < block.timestamp
                        ? false
                        : getClosedRentStatus(lend.id);
            }
        }
    }

    function getLends()
        public view override returns(Lend[] memory lends) {
        uint lendsCount = _lends.current();
        lends = new Lend[](lendsCount);
        for (uint256 i; i < lendsCount; i++) {
            lends[i] = _lendMap[i+1];
        }
    }

    function getLendsCount()
        public view override returns(uint lendCount) {
        lendCount = _lends.current();
    }

    function getLendById(uint lendId)
        public view override returns(Lend memory lend) {
        lend = _lendMap[lendId];
    }
    
    function getRents() 
        public view override returns(Rent[] memory rents) {
        uint rentsCount = _rents.current();
        rents = new Rent[](rentsCount);
        for (uint i; i < rentsCount; i++) {
            rents[i] = _rentMap[i+1];
        }
    }

    function getRentsCount()
        public view override returns(uint rentCount) {
        rentCount = _rents.current();
    }

    function getRentById(uint rentId)
        public view override returns(Rent memory rent) {
        rent = _rentMap[rentId];
    }


    function getOwnerLends(address owner) 
        public view override returns(Lend[] memory lends) {
        uint lendsCount = _lends.current();
        uint ownerLendCount;
        uint current;

        for (uint i; i < lendsCount; i++) {
            if (_lendMap[i+1].owner == owner) {
                if (!_lendMap[i+1].claimed) {
                // if (_lendMap[i+1].endTimestamp > block.timestamp) {
                    ownerLendCount++;
                }
            }
        }

        lends = new Lend[](ownerLendCount);

        for (uint i; i < lendsCount; i++) {
            if (_lendMap[i+1].owner == owner) {
                if (!_lendMap[i+1].claimed) {
                // if (_lendMap[i+1].endTimestamp > block.timestamp) { // to show all
                    lends[current] = _lendMap[i+1];
                    IERC4907 collection = IERC4907(
                        lends[current].collectionAddress
                    );
                    lends[current].tokenUri = collection.tokenURI(
                        lends[current].tokenId
                    );
                    current++;
                }
            }
        }
    }

    function getAvailableLends() 
        public view override returns(Lend[] memory lends) {
        uint lendsCount = _lends.current();
        uint availableRentCount;
        uint current;
        for (uint i; i < lendsCount; i++) {
            if (getAvailableStatus(i+1)) {
                if (_lendMap[i+1].endTimestamp > block.timestamp) {
                    availableRentCount++;
                }
            }
        }

        lends = new Lend[](availableRentCount);

        for (uint i; i < lendsCount; i++) {
            if (getAvailableStatus(i+1)) {
                if (_lendMap[i+1].endTimestamp > block.timestamp) {
                    lends[current] = _lendMap[i+1];
                    IERC4907 collection = IERC4907(
                        lends[current].collectionAddress
                    );
                    lends[current].tokenUri = collection.tokenURI(
                        lends[current].tokenId
                    );
                    current++;
                }
            }
        }
    }

    function getCustomerRents(address customer) 
        public view override returns(Rent[] memory rents) {
        uint rentsCount = _rents.current();
        uint customerRentCount;
        uint current;

        for (uint i; i < rentsCount; i++) {
            if (_rentMap[i+1].customer == customer) {
                if (_rentMap[i+1].endTimestamp > block.timestamp) {
                    customerRentCount++;
                }
            }
        }

        rents = new Rent[](customerRentCount);

        for (uint i; i < rentsCount; i++) {
            if (_rentMap[i+1].customer == customer) {
                if (_rentMap[i+1].endTimestamp > block.timestamp) {
                    rents[current] = _rentMap[i+1];
                    IERC4907 collection = IERC4907(
                        rents[current].collectionAddress
                    );
                    rents[current].tokenUri = collection.tokenURI(
                        rents[current].tokenId
                    );
                    current++;
                }
            }
        }
    }

    
    function getFinishedLends(address owner)
        public view override returns(uint finishedLends) {
        Lend[] memory lends = getOwnerLends(owner);
        for (uint i; i < lends.length; i++) {
            Lend storage lend = _lendMap[lends[i].id];
            if (lend.endTimestamp < block.timestamp) {
                if (!lend.claimed) {
                    finishedLends++;
                }
            }
        }
    }

    function setTokenPayment(address token)
        public override CheckPerms {
        _tokenPayment = IERC20(token);
    }

    function _initLend(
        Types supportedInterface,
        uint tokenId,
        address collectionAddress,
        uint timeUnitSeconds,
        uint timeUnitPrice,
        uint timeUnitCount,
        uint deposit
    )
        private returns(uint256 lendId) {
        IERC4907 collection = IERC4907(collectionAddress);
        address owner = collection.ownerOf(tokenId);

        require(
            collection.userOf(tokenId) == address(0) || 
            collection.userOf(tokenId) != collection.ownerOf(tokenId), 
            "this token already used");
        require(owner == msg.sender, "haven't this token id");

        _lends.increment();
        lendId = _lends.current();
        uint startTimestamp = block.timestamp;
        uint endTimestamp = startTimestamp + timeUnitCount * timeUnitSeconds;
        
        _nftToLend[collectionAddress][tokenId] = lendId;
        _lendMap[lendId] = Lend(
            lendId,
            supportedInterface,
            tokenId,
             collectionAddress,
            "",
            owner,
            timeUnitSeconds,
            timeUnitPrice,
            timeUnitCount,
            startTimestamp,
            endTimestamp,
            deposit,
            false,
            new uint[](0)
        );

    }

    function initLendERC721(
        uint tokenId,
        address collectionAddress,
        uint timeUnitSeconds,
        uint timeUnitPrice,
        uint timeUnitCount,
        uint deposit
    )
        public override returns(uint256 lendId) {
        require(
            getSupportedInterface(collectionAddress) == Types.ERC721 ||
            getSupportedInterface(collectionAddress) == Types.ERC4907,
            "Doesn't support ERC721");
        lendId = _initLend(
            Types.ERC721,
            tokenId,
            collectionAddress,
            timeUnitSeconds,
            timeUnitPrice,
            timeUnitCount,
            deposit
        );
    }

    function initLend(
        uint tokenId,
        address collectionAddress,
        uint timeUnitSeconds,
        uint timeUnitPrice,
        uint timeUnitCount
    ) 
        public override returns(uint256 lendId) {
        require(
            getSupportedInterface(collectionAddress) == Types.ERC4907,
            "Doesn't support ERC4907");
        lendId = _initLend(
            Types.ERC4907,
            tokenId,
            collectionAddress,
            timeUnitSeconds,
            timeUnitPrice,
            timeUnitCount,
            0
        );
    }

    function closeLend(uint lendId) 
        public override {
        Lend storage lend = _lendMap[lendId];
        require(!lend.claimed, "already claimed");
        require(lend.endTimestamp < block.timestamp, "its landing now");
        uint tokenAmount;
        
        if (lend.rents.length > 0) {
            for (uint i; i < lend.rents.length; i++) {
                tokenAmount += 
                    lend.timeUnitPrice * 
                    _rentMap[lend.rents[i]].timeUnitCount;
                if (lend.supprortedInterface == Types.ERC721) {
                    if (getClosedRentStatus(lendId)) {
                        tokenAmount += lend.deposit;
                    }
                }
            }

            _tokenPayment.transfer(lend.owner, tokenAmount);
        }

        lend.claimed = true;
    }

    function claimLends()
        public override {
        Lend[] memory lends = getOwnerLends(msg.sender);
        for (uint i; i < lends.length; i++) {
            Lend storage lend = _lendMap[lends[i].id];
            if (lend.endTimestamp < block.timestamp) {
                if (!lend.claimed) {
                    closeLend(lend.id);
                }
            }
        }
    }

    function initRent(
        uint lendId, 
        uint timeUnitCount
    ) 
        public override returns(uint rentId) {
        Lend storage lend = _lendMap[lendId];
        uint tokenAmount = lend.timeUnitPrice * timeUnitCount;
        if (lend.supprortedInterface == Types.ERC721) {
            require(_tokenPayment.allowance(msg.sender, address(this)) >= lend.deposit, "Haven't tokens to deposit");
            _tokenPayment.transferFrom(msg.sender, address(this), lend.deposit);
        }
        require(
            lend.endTimestamp >
            lend.timeUnitSeconds * timeUnitCount + block.timestamp, 
            "request time more then available");
        require(lend.owner != msg.sender, "you can't rent your token");
        require(getAvailableStatus(lendId), "lend is busy");
        require(_tokenPayment.allowance(
            msg.sender, 
            address(this)
            ) >= tokenAmount, "allowance is so low");
        
        _rents.increment();
        rentId = _rents.current();
        address customer = msg.sender;
        uint startTimestamp = block.timestamp;
        uint endTimestamp = startTimestamp + timeUnitCount * lend.timeUnitSeconds;
        IERC4907 collection = IERC4907(lend.collectionAddress);
        
        if (lend.supprortedInterface == Types.ERC4907) {
            collection.setUser(lend.tokenId, customer, uint64(endTimestamp));
        } else {
            collection.transferFrom(lend.owner, msg.sender, lend.tokenId);
        }
        _tokenPayment.transferFrom(msg.sender, address(this), tokenAmount);

        _rentMap[rentId] = Rent(
            rentId,
            lend.tokenId,
            lend.collectionAddress,
            "",
            customer,
            lendId,
            lend.timeUnitSeconds,
            timeUnitCount,
            startTimestamp,
            endTimestamp,
            false
        );
        _lendMap[lendId].rents.push(rentId);
    }

    function closeRent(uint rentId) 
        public override {
        // todo
        Rent storage rent = _rentMap[rentId];
        Lend storage lend = _lendMap[rent.lendId];
        IERC4907 collection = IERC4907(lend.collectionAddress);
        require(rent.endTimestamp < block.timestamp, "to late");
        require(lend.supprortedInterface == Types.ERC721, "doesn't need to close");
        require(isApprovedOrOwner(address(this), lend.tokenId, lend.collectionAddress), "doesn't approved");
        collection.transferFrom(msg.sender, address(this), lend.tokenId);
        _tokenPayment.transfer(msg.sender, lend.deposit);
        rent.closed = true;
    }
}