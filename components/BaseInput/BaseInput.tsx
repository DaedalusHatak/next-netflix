import styles from "@/app/input.module.scss"
import  { useState } from 'react';
export default function BaseInput({name,type,isBackground,complete,required,error,value,onChange}:any){
    const {  label,input,background } = styles;

    const [isFocused,setIsFocused] = useState(true);

    const handleFocus = (e: any) =>{
       setIsFocused(true)
    }
    const handleBlur = (e: any) =>{
        if(value === ""){
            setIsFocused(false)
        }
     }
    const labelStyle =  isFocused ? styles["label-active"] : label
    const bg = isBackground ? `${input} ${background} ` : input
    return(
       
         <div className={styles["base-input"]}>
    <input
      className={bg}
    value={value}
    onFocus={handleFocus}
    onBlur={handleBlur}
    onChange={onChange}
    type={type}
    required={required}
    autoComplete={complete}
      minLength={5}
      maxLength={50}
    />
    <label className={labelStyle}>{name}
      </label>
    <p
      className={`${styles.error} ${styles.para}`}
    >
      <span>
       {error}
      </span>
    </p>
  </div>

    )
}