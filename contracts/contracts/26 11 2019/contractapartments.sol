pragma solidity >=0.4.22 <0.6.0;

contract Apartment {
    uint8 public apartmentscount;
    struct Apartments {
        uint id;
        string name;
        string description;
        uint fee;
        string address_apartment;
        // string latG;
        // string address_city;
        // string address_district;
        // string address_township;
        // string address_street;
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
