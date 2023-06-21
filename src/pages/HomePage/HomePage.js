import { Link } from 'react-router-dom';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import styles from './HomePage.module.css'


function HomePage() {
  return (
      <>
      <div className={styles.sections}>
        <div className={styles.left}>
          <Link className={styles.link} to="/products/cercei"><CategoryCard text="Bijuterii din aur" image="https://firebasestorage.googleapis.com/v0/b/magazinvirtual-8ddcf.appspot.com/o/Bijuterii%20aur.jpg?alt=media&token=e098cf51-b40c-47b0-a6b1-c20cfc0c7c1a"></CategoryCard></Link>
        </div>
        <div className={styles.right}>
          <Link className={styles.link} to="/products/inele"><CategoryCard text="Bijuterii din argint" image="https://cdn.shopify.com/s/files/1/1749/7309/articles/1800x1000_Timeless_Sterling_Silver_1400x.png?v=1564168672"></CategoryCard></Link>
          <Link className={styles.link} to="/products/bratari"><CategoryCard text="Bijuterii swarowski" image="https://firebasestorage.googleapis.com/v0/b/magazinvirtual-8ddcf.appspot.com/o/Bijuterii%20swarowski.jpg?alt=media&token=d249ff42-c777-497e-beb7-1ab3cb2c10c8"></CategoryCard></Link>
        </div>
      </div>
      </>
  );
}

export default HomePage;
