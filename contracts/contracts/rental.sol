pragma solidity >=0.4.22 <0.6.0;
import "./contractusers.sol";
import "./contractapartments.sol";
import "./contractreleaseagreement.sol";
contract Rental is User, Apartment, Releasegreement {
    uint public userscount;
    uint public apartmentscount;
    uint public agreementscount;
    address public contractcreator;
   
	event AddUser
	(
	    uint indexed id,
        address indexed myaddress,
        bool isRentor, //0 is not, 1 is have
        bool isLandLord,
        string identify,
        string  firstname,
        string  lastname,
        string gmail,
        bool gender,

        string phone,
        string address_live,
        string ipfsHash
	    );
// 	event UpdateUser
// 	(
// 	    uint indexed id,
//         address myaddress,
//         bool isRentor, //0 is not, 1 is have
//         bool isLandLord,
//         uint16 identify,
//         string  firstname,
//         string  lastname,
//         string gmail,
//         bool gender,

//         uint16 phone,
//         string address_user,
//         string ipfsHash
// 	    );
	event AddApartment
	(
	    uint indexed id,
        string name,
        string description,
        uint indexed  fee,
        string yearbuild,
        string  address_apartment,
        string ipfsHash,
        address indexed _landlord,
        StatusRentOrSale statusRentOrSale, 
        ApartmentStatus _ApartmentStatus,
        ApartmentType _ApartmentType
	    );
// 	event UpdateApartment(
// 	    uint id,
//         string name,
//         string description,
//         uint fee,
//         string yearbuild,
//         string address_apartment,
//         string ipfsHash,
//         address _landlord,
//         StatusRentOrSale statusRentOrSale, 
//         ApartmentStatus _ApartmentStatus,
//         ApartmentType _ApartmentType
// 	    );
	event LandLordsAssert(uint idlandlord,uint  idapartment);
	event LandLordsRentors(uint idlandlord,uint  idapartment, address addressrentor);
// 	event CreateAgreement(uint idApartment, address landlord, string landlordconfirmed);
	event Agreement(
	    uint id,
        address _landlord,
        address _rentor,
        uint idApartment,
        // string description,
        string landlordconfirmed,
        string rentorconfirmed
        ); 
	constructor() public{
	   contractcreator = msg.sender;
	   userscount =0; 
	   apartmentscount = 0;
	   agreementscount = 0;
	   //users[msg.sender] = Users (
    //     userscount,
    //     msg.sender,
    //     true,
    //     true,
    //     "206178428",
    //     "Khai",
    //     "Khai",
    //     "a@gmail.com",
    //     true,
    //     "0332015868"
       
    //     );
	   
	}
	
	function addUser
	(
        bool _isRentor,
        address _myaddress,
        bool _isLandLord,
        string _identify, 
        string memory _firstname,
        string memory _lastname,
        string memory _gmail,
        bool _gender,
        string _phone,
        string _address_live,
        string ipfsHash
	)
	public 
	{
	    require(_myaddress != address(0));
	    userscount = userscount + 1;
        users[msg.sender] = Users (
        userscount,
        msg.sender,
        _isRentor,
        _isLandLord,
        _identify,
        _firstname,
        _lastname,
        _gmail,
        _gender,
        _phone
        );
        emit  AddUser
	(
	    userscount,
        _myaddress,
        true, //0 is not, 1 is have
        true,
        _identify,
        _firstname,
        _lastname,
        _gmail,
        _gender,

       _phone,
       _address_live,
        ipfsHash
	    );
  
	}
	function detailUser
	( address _addressuser) 
        view 
        public 
        returns (
        uint ,
        address,
        bool ,
        bool ,
        string , 
        string memory ,
        string memory ,
        string memory ,
        bool ,
        string
        
            ) 
           
    {
        Users memory _user = users[_addressuser];
        return (_user.id, _user.myaddress, _user.isRentor, _user.isLandLord, _user.identify, _user.firstname, _user.lastname, _user.gmail, _user.gender, _user.phone);
    } 
    
    function updateUser
	(   address _addressuser,
	    bool _isRentor,
        bool _isLandLord,
        string _identify, 
        string memory _firstname,
        string memory _lastname,
        string memory _gmail,
        bool _gender,
        string _phone
	) 
        public 
             
    {
        
        Users storage _user = users[_addressuser];
        require(_addressuser == msg.sender);
        _user.isRentor = _isRentor;
        _user.isLandLord = _isLandLord;
        _user.identify = _identify;
        _user.firstname = _firstname;
        _user.lastname = _lastname;
        _user.gmail = _gmail;
        _user.gender = _gender;
        _user.phone = _phone;
         emit  AddUser
	(
	    userscount,
        _myaddress,
        true, //0 is not, 1 is have
        true,
        _identify,
        _firstname,
        _lastname,
        _gmail,
        _gender,

       _phone,
       _address_live,
        ipfsHash
	    );
    } 
    function lenghtUsers() public view returns(uint){
        return userscount;
    }
    function addApartment
    (
   
        string memory _name,
        string memory _description,
        uint _fee,
        string _yearbuild,
        string memory _address_apartment,
        string memory _ipfsHash,
        address _landlord,
        StatusRentOrSale _statusRentOrSale,
        ApartmentStatus _ApartmentStatus,
        ApartmentType _ApartmentType
    ) 
    public 
    {
        require(users[msg.sender].isLandLord);
        apartmentscount = apartmentscount + 1;
        apartments[apartmentscount] = Apartments (
            
             apartmentscount,
              _name,
             _description,
             _fee,
             _address_apartment,
             _ipfsHash,
             _landlord,
            _statusRentOrSale,
            _ApartmentStatus,
            _ApartmentType 
        );
        emit  AddApartment
	(
	     
             apartmentscount,
              _name,
             _description,
             _fee,
             _yearbuild,
             _address_apartment,
             _ipfsHash,
             _landlord,
            _statusRentOrSale,
            _ApartmentStatus,
            _ApartmentType 
	    );
        
    }
    function detailApartment
	( uint _id) 
        view 
        public 
        returns (
        uint,
        string memory,
        string memory,
        uint,
        string memory ,
        string memory,
        
        address ,
        StatusRentOrSale,
        ApartmentStatus,
        ApartmentType
        
            ) 
    {
        Apartments memory _apartment = apartments[_id];
        return ( _apartment.id, _apartment.name, _apartment.description, _apartment.fee, _apartment.address_apartment, _apartment.ipfsHash,_apartment._landlord, _apartment.statusRentOrSale, _apartment._ApartmentStatus,_apartment._ApartmentType);
    }
    function updateApartment
    
	(   uint _id,
        string memory _name,
        string memory _description,
        uint  _fee,
        uint _yearbuild,
        string memory _address_apartment,
        string memory _ipfsHash,
        address _landlord,
        StatusRentOrSale _statusRentOrSale,
        ApartmentStatus _ApartmentStatus
	) 
        public 
             
    {
        Apartments storage _apartment = apartments[_id];
        require(_apartment._landlord == msg.sender);
        _apartment.name = _name;
        _apartment.description = _description;
        _apartment.fee = _fee;
        _apartment.address_apartment = _address_apartment;
        _apartment.ipfsHash = _ipfsHash;
        _apartment._landlord = _landlord;
        _apartment.statusRentOrSale = _statusRentOrSale;
        _apartment._ApartmentStatus = _ApartmentStatus;
       
    } 
    
    function lenghtApartments() public view returns(uint){
        return apartmentscount;
    }
    
    function createAgreement
    (
        uint _idApartment,
        string memory description,
        string memory landlordconfirmed,
        address tenant
        
    )
    public {
        require(users[msg.sender].isLandLord);
        agreementscount = agreementscount + 1;
        releaseAgreement[agreementscount] = ReleaseAgreement (
            agreementscount,
            msg.sender,
            tenant,
            _idApartment,
            // description,
            landlordconfirmed,
            ''
             );
        // emit CreateAgreement( agreementscount,msg.sender, true);
        emit Agreement(agreementscount,msg.sender,tenant,_idApartment,description,landlordconfirmed,null);
        
    }
    
    function rentorConfirmed
    (
        uint _idAgreement,
        string memory _confirmed
        )
    public {
        require(users[msg.sender].isRentor);
        ReleaseAgreement storage _releaseAgreement = releaseAgreement[_idAgreement];
        require(_releaseAgreement._landlord !=msg.sender);
        _releaseAgreement._rentor = msg.sender;
        _releaseAgreement.rentorconfirmed = _confirmed;
        
        emit Agreement(_releaseAgreement.id,_releaseAgreement._landlord,msg.sender,_releaseAgreement.idApartment,_releaseAgreement.description,_releaseAgreement.landlordconfirmed,_releaseAgreement.rentorconfirmed);
    }
    
    function lenghtAgreements() public view returns(uint){
        return agreementscount;
    }
}
