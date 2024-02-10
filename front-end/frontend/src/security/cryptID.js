import Hashids from 'hashids';

// Initialize Hashids instance
const hashids = new Hashids('main', 10); // Adjust the salt and minimum length as needed

// Function to encrypt the ID
function cryptID(id) {
    try {
        return hashids.encode(id.toString());
    } catch (error) {
        console.error('Encryption error:', error);
        return null;
    }
}

export default cryptID;