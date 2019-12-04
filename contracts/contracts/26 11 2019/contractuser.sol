pragma solidity >=0.4.22 <0.6.0;

contract User {
    uint8 public userscount;
     struct Users {
        uint id;
        address myaddress;
        string identify; 
        string  firstname;
        string gmail;
        bool gender;
        string phone;
    }

	mapping(address => Users) public users;
	mapping(address => bool) public register;
}
