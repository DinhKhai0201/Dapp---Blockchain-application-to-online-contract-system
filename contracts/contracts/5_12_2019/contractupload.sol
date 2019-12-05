pragma solidity >=0.4.22 <0.6.0;

contract Upload {
    uint public upcount;
    struct Uploads {
        uint id;
        address myaddress;
        string title; 
        string url;
        string  time_upload;
    }

	mapping(uint => Uploads) public uploads;
}