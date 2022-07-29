import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

export default function Identicon({ address, diam }) {
    return (
        <Jazzicon diameter={diam} seed={jsNumberForAddress(address)} />
    )
}