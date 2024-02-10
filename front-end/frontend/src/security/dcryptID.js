import Hashids from 'hashids';

// Initialize Hashids instance
const hashids = new Hashids('main', 10); // Adjust the salt and minimum length as needed

// Function to decrypt the ID
function dcryptID(encryptedID) {
    try {
        const decodedArray = hashids.decode(encryptedID);
        return decodedArray.length > 0 ? decodedArray[0] : null;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
}

export default dcryptID;