import web3cur from './web3service';


const address = "0xB6afA00C93Dc85c08FfBeDf50b3A641d9A63fA68";
const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "contractcreator",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "h",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "sig",
        "type": "bytes"
      }
    ],
    "name": "verify",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "releaseAgreement",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_landlord",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_rentor",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "idApartment",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "landlordconfirmed",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "rentorconfirmed",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "h",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "sig",
        "type": "bytes"
      }
    ],
    "name": "isSigned",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "register",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "agreementscount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_fee",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_address_apartment",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_landlord",
        "type": "address"
      },
      {
        "internalType": "enum Apartment.StatusRentOrSale",
        "name": "_statusRentOrSale",
        "type": "uint8"
      },
      {
        "internalType": "enum Apartment.ApartmentStatus",
        "name": "_ApartmentStatus",
        "type": "uint8"
      },
      {
        "internalType": "enum Apartment.ApartmentType",
        "name": "_ApartmentType",
        "type": "uint8"
      }
    ],
    "name": "updateApartment",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_url",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_date_upload",
        "type": "string"
      }
    ],
    "name": "Uploadfile",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_idApartment",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "landlordconfirmed",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "tenant",
        "type": "address"
      }
    ],
    "name": "createAgreement",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "userscount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "myaddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "identify",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "firstname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "gmail",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "gender",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "phone",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "apartments",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "fee",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "address_apartment",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_landlord",
        "type": "address"
      },
      {
        "internalType": "enum Apartment.StatusRentOrSale",
        "name": "statusRentOrSale",
        "type": "uint8"
      },
      {
        "internalType": "enum Apartment.ApartmentStatus",
        "name": "_ApartmentStatus",
        "type": "uint8"
      },
      {
        "internalType": "enum Apartment.ApartmentType",
        "name": "_ApartmentType",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "apartmentscount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressuser",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_identify",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_firstname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_gmail",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_gender",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_phone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_address_live",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "updateUser",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_myaddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_identify",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_firstname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_gmail",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_gender",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_phone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_address_live",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "addUser",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "upcount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_fee",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_address_apartment",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_landlord",
        "type": "address"
      },
      {
        "internalType": "enum Apartment.StatusRentOrSale",
        "name": "_statusRentOrSale",
        "type": "uint8"
      },
      {
        "internalType": "enum Apartment.ApartmentStatus",
        "name": "_ApartmentStatus",
        "type": "uint8"
      },
      {
        "internalType": "enum Apartment.ApartmentType",
        "name": "_ApartmentType",
        "type": "uint8"
      }
    ],
    "name": "addApartment",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_idAgreement",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_rentorConfirmed",
        "type": "string"
      }
    ],
    "name": "rentorConfirmed",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "uploads",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "myaddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "url",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "time_upload",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "myaddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "identify",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "firstname",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "gmail",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "gender",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "phone",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "address_live",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "AddUser",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "fee",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "address_apartment",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_landlord",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum Apartment.StatusRentOrSale",
        "name": "statusRentOrSale",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum Apartment.ApartmentStatus",
        "name": "_ApartmentStatus",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum Apartment.ApartmentType",
        "name": "_ApartmentType",
        "type": "uint8"
      }
    ],
    "name": "AddApartment",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_landlord",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_rentor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "idApartment",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "passeord",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "landlordconfirmed",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "rentorconfirmed",
        "type": "string"
      }
    ],
    "name": "Agreement",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "myaddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "time_upload",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "url",
        "type": "string"
      }
    ],
    "name": "LogUpload",
    "type": "event"
  }
]
let getContract = async(cb = ()=>{})=>{
  let web3 = await web3cur();
  const contract = new web3.eth.Contract(abi, address,{ gasPrice: 10000000000 });
  console.log(contract)
  cb(contract, web3)
}
getContract()
export  {
  	getContract

}