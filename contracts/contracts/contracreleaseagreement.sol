pragma solidity >=0.4.22 <0.6.0;

contract Releasegreement {
    uint8 public agreementscount;
      struct ReleaseAgreement {
        uint id;
        address _landlord;
        address _rentor;
        uint idApartment;
        string description;
        bool landlordconfirmed;
        bool rentorconfirmed;
        
    }

   	mapping(uint => ReleaseAgreement) public releaseAgreement;

	
}
