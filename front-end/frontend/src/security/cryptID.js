import { Buffer } from 'buffer'
function cryptID(id) {
    return Buffer.from(id).toString('base64')
}

export default cryptID
