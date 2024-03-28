import getCampgrounds from '@/libs/getCampgrounds';
import { MenuItem } from '@mui/material';
import React from 'react'
import { CampgroundItem } from '../../interface';

async function SelectMenuItem() {

    const campgrounds = await getCampgrounds();


  return (
    <div>
      {
            campgrounds.data.map((campground: CampgroundItem) => (
        
          
            <MenuItem key={campground._id} value={campground.name}>{campground.name}</MenuItem>

          
        
            ))
            }
    </div>
  )
}

export default SelectMenuItem
