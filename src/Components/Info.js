import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHome, faUtensils, faUsers, faParking, faDumbbell } from '@fortawesome/free-solid-svg-icons'

function Info() {
    return (
        <ul>
            <li><FontAwesomeIcon icon={faHome} /><span>{`   => House`}</span></li>
            <li><FontAwesomeIcon icon={faUtensils} /><span>{`   => Restaurant`}</span></li>
            <li><FontAwesomeIcon icon={faUsers} /><span>{`  => Market`}</span></li>
            <li><FontAwesomeIcon icon={faParking} /><span>{`    => Parking`}</span></li>
            <li><FontAwesomeIcon icon={faDumbbell} /><span>{`   => Gym`}</span></li>
            <li><FontAwesomeIcon icon={faCoffee} /><span>{` => Tea`}</span></li>
        </ul>
    )
}

export default Info
