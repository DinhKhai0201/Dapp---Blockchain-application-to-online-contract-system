pragma solidity >=0.4.22 <0.6.0;
import "./contractusers.sol";
import "./contractapartments.sol";
import "./contractreleaseagreement.sol";
import "./contractverify.sol";
import "./contractupload.sol";
contract Rental is User, Apartment, Releasegreement,Verify, Upload  {
    uint public userscount;
    uint public apartmentscount;
    uint public agreementscount;
    address public contractcreator;
   
	event AddUser
	(
	    uint indexed id,
        address indexed myaddress,
        string identify,
        string  firstname,
        string gmail,
        uint gender,
        string phone,
        string address_live,
        string ipfsHash
	    );
	event AddApartment
	(
	    uint indexed id,
        string name,
        string description,
        string  fee, // + yearbuild
        string  address_apartment,
        string ipfsHash,
        address indexed _landlord,
        StatusRentOrSale statusRentOrSale, 
        ApartmentStatus _ApartmentStatus,
        ApartmentType _ApartmentType
	    );

	event Agreement(
	    uint indexed id,
        address indexed _landlord,
        address indexed _rentor,
        uint idApartment,
        string description,
        string passeord,
        string landlordconfirmed,
        string rentorconfirmed
        ); 
    event LogUpload
	(
	    uint indexed id,
        address indexed myaddress,
        string title,
        string time_upload,
        string url
    
	    );
	constructor() public{
	   contractcreator = msg.sender;
	   userscount =0; 
	   apartmentscount = 0;
	   agreementscount = 0;
	   upcount =0;
	  
	}
	
	function addUser
	(
        address _myaddress,
        string memory _identify, 
        string memory _firstname,
        string memory _gmail,
        uint _gender, //0 i women, 1 is man
        string memory _phone,
        string memory _address_live,
        string memory ipfsHash
	)
	public 
	{
	    require(_myaddress != address(0));
	    userscount = userscount + 1;
        users[msg.sender] = Users (
        userscount,
        msg.sender,
        _identify,
        _firstname,
        _gmail,
        _gender,
        _phone
        );
        register[msg.sender] = true;
        emit  AddUser
	(
	    userscount,
        _myaddress,
        _identify,
        _firstname,
        _gmail,
        _gender,

       _phone,
       _address_live,
        ipfsHash
	    );
  
	}

    function updateUser
	(   address _addressuser,
        string memory _identify, 
        string memory _firstname,
        string memory _gmail,
        uint _gender,
        string memory _phone,
        string memory _address_live,
        string memory ipfsHash
	) 
        public 
             
    {
        
        Users storage _user = users[_addressuser];
        require(_addressuser == msg.sender);
        _user.identify = _identify;
        _user.firstname = _firstname;
        _user.gmail = _gmail;
        _user.gender = _gender;
        _user.phone = _phone;
         emit  AddUser
	(
	    _user.id,
        _addressuser,
        _identify,
        _firstname,

        _gmail,
        _gender,
       _phone,
       _address_live,
        ipfsHash
	    );
    } 
//   trick fee + yearbuild
    function addApartment
    (
   
        string memory _name,
        string memory _description,
        string memory _fee,
        string memory _address_apartment,
        string memory _ipfsHash,
        address _landlord,
        StatusRentOrSale _statusRentOrSale,
        ApartmentStatus _ApartmentStatus,
        ApartmentType _ApartmentType
    ) 
    public 
    {
        require(register[msg.sender] == true);
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
             _address_apartment,
             _ipfsHash,
             _landlord,
            _statusRentOrSale,
            _ApartmentStatus,
            _ApartmentType 
	    );
        
    }

    function updateApartment
    
	(   uint _id,
        string memory _name,
        string memory _description,
        string memory _fee,
        string memory _address_apartment,
        string memory _ipfsHash,
        address _landlord,
        StatusRentOrSale _statusRentOrSale,
        ApartmentStatus _ApartmentStatus,
        ApartmentType _ApartmentType
	) 
        public 
             
    {
        Apartments storage _apartment = apartments[_id];
        require(_apartment._landlord == msg.sender);
        require(_apartment._ApartmentStatus != ApartmentStatus.CLose,"Cant not edit");
        _apartment.name = _name;
        _apartment.description = _description;
        _apartment.fee = _fee;
        _apartment.address_apartment = _address_apartment;
        _apartment.ipfsHash = _ipfsHash;
        _apartment._landlord = _landlord;
        _apartment.statusRentOrSale = _statusRentOrSale;
        _apartment._ApartmentStatus = _ApartmentStatus;
        _apartment._ApartmentType = _ApartmentType;
         emit  AddApartment
	(
	     
             _apartment.id,
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
       
    } 
      function Uploadfile
    (
   
        string memory _title,
        string memory _url,
        string memory _date_upload
       
    ) 
    public 
    {
        require(register[msg.sender] == true);
        upcount = upcount + 1;
        uploads[upcount] = Uploads (
            upcount,
            msg.sender,
           _title,
           _url,
           _date_upload
           
        );
      emit LogUpload
	(
	     upcount,
            msg.sender,
           _title,
           _date_upload,
           _url
           
	    );
        
    }
    function createAgreement
    (
        uint _idApartment,
        string memory description,
        string memory landlordconfirmed,
        string memory _password,
        address tenant
        
    )
    public {
        require(register[msg.sender] == true);
        agreementscount = agreementscount + 1;
        Apartments storage _apartment = apartments[_idApartment];
        require(_apartment._ApartmentStatus != ApartmentStatus.CLose);
        releaseAgreement[agreementscount] = ReleaseAgreement (
            agreementscount,
            msg.sender,
            tenant,
            _idApartment,
            description,
            _password,
            landlordconfirmed,
            ''
             );
        emit Agreement(agreementscount,msg.sender,tenant,_idApartment,description,_password,landlordconfirmed,'');
    }
    
    function rentorConfirmed
    (
        uint _idAgreement,
        string memory _rentorConfirmed
        )
    public {
        require(register[msg.sender] == true);
        ReleaseAgreement storage _releaseAgreement = releaseAgreement[_idAgreement];
        Apartments storage _apartment = apartments[_idAgreement];
        require(_releaseAgreement._landlord != msg.sender);
        require(_apartment._ApartmentStatus != ApartmentStatus.CLose);
        require(_releaseAgreement._rentor == msg.sender);
        _apartment._ApartmentStatus = ApartmentStatus.CLose;
        _releaseAgreement.rentorconfirmed = _rentorConfirmed;
         emit  AddApartment
	(
	     
            _idAgreement,
            _apartment.name,
            _apartment.description,
            _apartment.fee,
            _apartment.address_apartment,
            _apartment.ipfsHash,
            _apartment._landlord,
            _apartment.statusRentOrSale,
            ApartmentStatus.CLose,
            _apartment._ApartmentType 
	    );
        emit Agreement(_releaseAgreement.id,_releaseAgreement._landlord,msg.sender,_releaseAgreement.idApartment,_releaseAgreement.description,_releaseAgreement.password,_releaseAgreement.landlordconfirmed,_rentorConfirmed);
    }
    

}