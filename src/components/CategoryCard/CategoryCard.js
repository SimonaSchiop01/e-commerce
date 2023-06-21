
import styles from './CategoryCard.module.css';

function CategoryCard({image, text}) {
  return (
      <>
      <div className={styles.card} style={{'backgroundImage':`url(${image})`}}>
        <div className={styles.text}>
          {text}
        </div>
      </div>
      </>
  );
}

export default CategoryCard;
