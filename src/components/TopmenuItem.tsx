import React from 'react'
import styles from './topmenu.module.css'
import Link from 'next/link';

function TopmenuItem({title, pageRef, onClick}: {title: string, pageRef: string, onClick : () => void}) {
  return (
      <Link className={styles.itemcontainer} href={pageRef} onClick={onClick}>
        {title} 
      </Link>
  )
}

export default TopmenuItem
