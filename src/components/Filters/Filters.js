
import { useState } from 'react';
import styles from './Filters.module.css';

function Filters({sortingOptions={}, filterCriterias={}}) {
  
  const [criteriaOpen, setCriteriaOpen]=useState({price:true})

  return (
      <div className={styles.filters}>
        <div className={styles.title}>FILTREAZA</div>
        <div className={styles.content}>

          {Object.entries(filterCriterias).map(fc=>(
            <div key={fc[0]} className={styles.criteria}>
              <div className={styles.criteriaHeader}>
                <div className={styles.criteriaName}>{fc[1].name}</div>
                <div className={styles.criteriaBtn} onClick={()=>{
                  setCriteriaOpen({
                    ...criteriaOpen,
                    [fc[0]]:!criteriaOpen[fc[0]]
                  })
    
                }} >{criteriaOpen[fc[0]]?"-":"+"}</div>
              </div>
              {criteriaOpen[fc[0]] && <div className={styles.criteriaOptions}>
                {fc[1].options.map(o=>(<div className={styles.criteriaOption} onClick={()=>{o.onSelect()}}>{o.name}</div>))}
              </div>}
            </div>
          ))}

          
          
        </div>
        <div className={styles.title}>SORTEAZA</div>
        <div className={styles.content}>
          <select onChange={(e)=>{sortingOptions[e.target.value].onSelect()}} value="_">
            <option value="_" disabled>Alege criteriu</option>
            {Object.entries(sortingOptions).map(o=>(<option key={o[0]} value={o[0]}>{o[1].name}</option>))}
          </select>
        </div>
        
      </div>
  );
}

export default Filters;
