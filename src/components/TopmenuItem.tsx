import React from 'react'
import styles from './topmenu.module.css'
import Link from 'next/link';

function TopmenuItem({title, pageRef}: {title: string, pageRef: string}) {
  return (
      <Link className={styles.itemcontainer} href={pageRef} >
        {title} 
      </Link>
  )
}

export default TopmenuItem
