import { Buffer } from 'buffer'

function dcryptID(id) {
    return Buffer.from(id, 'base64').toString('ascii')
}

export default dcryptID
