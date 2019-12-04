pragma solidity >=0.4.22 <0.6.0;

contract User {
    uint8 public userscount;
     struct Users {
        uint id;
        address myaddress;
        bool isRentor; //0 is not, 1 is have
        bool isLandLord;
        string identify; 
        string  firstname;
        string  lastname;
        string gmail;
        bool gender;
        string phone;
    }

	mapping(address => Users) public users;
}
