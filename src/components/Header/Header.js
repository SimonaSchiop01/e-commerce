import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/Auth.context';
import { CartContext } from '../../contexts/CartContext/Cart.context';
import { PopupContext } from '../../contexts/PopupContext/Popup.context';

import styles from  './Header.module.css';



function Header() {

  const {getCartItemsCount} = useContext(CartContext);
  const {openPopup} = useContext(PopupContext);
  const {getUserID, signIn, signOut} = useContext(AuthContext);
  const userID = getUserID();

  const links = [
    {
      path:"/",
      text:"Acasa"
    },
    {
      path:"/products/inele",
      text:"Inele"
    },
    {
      path:"/products/cercei",
      text:"Cercei"
    },  
    {
      path:"/products/bratari",
      text:"Bratari"
    }
  ]

  if(userID == "XoPqie9XVWYvi97RRmc0m24ll5w1"){
    links.push({
      path: "/orders",
      text: "Comenzi"
    })
  }

  return (
    <>
      <div className={styles.topBar}>
        <div className='latime'>
          <div className={styles.menu}>
            {!userID && <div className={styles.menuItem} onClick={()=>{openPopup()}}>
              <div className={styles.menuItemIcon} ><span className='material-symbols-outlined'>account_circle</span></div>
              <div className={styles.menuItemText}>Cont</div>
            </div>}
            {userID && <div className={styles.menuItem} onClick={()=>{signOut()}}>
              <div className={styles.menuItemIcon} ><span className='material-symbols-outlined'>logout</span></div>
              <div className={styles.menuItemText}>Iesi din cont</div>
            </div>}
            <Link to="/wishlist">
              <div className={styles.menuItem}>
                <div className={styles.menuItemIcon}><span className='material-symbols-outlined'>favorite</span></div>
                <div className={styles.menuItemText}>Wishlist</div>
              </div>
            </Link>
            <div className={styles.menuItem}>
              <div className={styles.menuItemIcon}><span className='material-symbols-outlined'>shopping_cart</span></div>
              <Link to="/cart"><div className={styles.menuItemText}>Cos({getCartItemsCount()})</div></Link>
            </div>
          </div>
          <div className={styles.navigation}>
            {links.map(l=><Link key={l.path} to={l.path}><div className={styles.navigationItem}>{l.text}</div></Link>)}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Header;
