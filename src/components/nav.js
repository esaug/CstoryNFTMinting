import React from "react";
import {Link} from "react-dom";

const MenuNav = () => {
    return <nav>
                <Link to="/"> Home </Link>
                <Link to="/mint"> Mint </Link>
                <Link to="/exchange"> Exchange </Link>
                <Link to="/claims"> Claim Rewards</Link>
            </nav>


}

export default MenuNav
