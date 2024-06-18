async function getCampground(id: string) {
  const response = await fetch(`https://campground-backend-tau.vercel.app/api/v1/campgrounds/${id}`)

  if(!response.ok){
    throw new Error('Failed to fetch' + ' id: ' + id)
    
  }

  return await response.json();
}

export default getCampground
