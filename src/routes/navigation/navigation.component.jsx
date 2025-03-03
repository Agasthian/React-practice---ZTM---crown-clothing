import React, {Fragment,useContext} from 'react'
import { Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'

// import {CartContext} from '../../contexts/cart.context'
import {selectIsCartOpen} from '../../store/cart/cart.selector.js'
import {selectorCurrentUser} from '../../store/user/user.selector.js'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import {signOutUser} from '../../utils/firebase/firebase.utils'

import {NavigationContainer,LogoContainer,NavLinks,NavLink} from './navigation.styles.jsx'

const Navigation = () => {

    const currentUser = useSelector(selectorCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
  //   const {currentUser} = useContext(UserContext)
  //   const {isCartOpen} = useContext(CartContext)

  return (
    <Fragment>
        <NavigationContainer>
            
            <LogoContainer to='/'>
                <CrwnLogo className='logo' />
            </LogoContainer>

            <NavLinks>                
                <NavLink to='/shop'>SHOP</NavLink>
                {currentUser ? <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink> :
                    <NavLink to='/auth'>SIGN IN</NavLink>
                }                
                <CartIcon/>
            </NavLinks>

            {isCartOpen &&  <CartDropdown/>}            
        </NavigationContainer>
    <Outlet/>
    </Fragment>
  )
}

export default Navigation