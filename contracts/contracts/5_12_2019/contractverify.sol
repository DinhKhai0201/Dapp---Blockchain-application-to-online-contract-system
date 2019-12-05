pragma solidity >=0.4.22 <0.6.0;
// 0.5.12
contract Verify {
    function verify
    (
        bytes32 h, 
        bytes memory sig
        ) 
    public 
    pure 
    returns (address) 
    {
        uint8 v;
        bytes32 r;
        bytes32 s;
        bytes32 message = prefixed(h);
        (v, r, s) = splitSignature(sig);
        address addr = ecrecover(message, v, r, s);

        return addr;
    }

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (uint8, bytes32, bytes32)
    {
        require(sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }
    
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, hash));
        return prefixedHash;
    }
    function isSigned(address _addr, bytes32 h, bytes memory sig) pure public returns (bool) {
        return verify(h,sig) == _addr;
    }
}
