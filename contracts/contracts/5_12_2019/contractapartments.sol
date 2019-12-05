pragma solidity >=0.4.22 <0.6.0;

contract Apartment {
    uint8 public apartmentscount;
    struct Apartments {
        uint id;
        string name;
        string description;
        string fee; //+ yearbuild
        string address_apartment;
        string ipfsHash;
        address _landlord;
        StatusRentOrSale statusRentOrSale; 
        ApartmentStatus _ApartmentStatus;
        ApartmentType _ApartmentType;
        
    }
    enum ApartmentStatus {
		Open, 
		Pending, 
		Processed,
		CLose
	}
	enum ApartmentType {
		House,
		Apartment,
		Room
	}
	enum StatusRentOrSale {
	    rent,sale
	}
    mapping(uint => Apartments) public apartments;
}