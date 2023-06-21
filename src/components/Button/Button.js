
import styles from './Button.module.css';

function Button({text, icon, disabled, noBg, onClick, fullWidth=false}) {
  console.log(styles);
  return (
      <>
        <div className={`${styles.button} ${disabled && styles.disabled} ${noBg && styles.noBackground} ${fullWidth && styles.full}`} onClick={()=>{
          if(!disabled) onClick();
        }}>
          {icon && <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>}
          {text && <span className={styles.text}>{text}</span>}
        </div>
      </>
  );
}

export default Button;
