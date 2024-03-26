async function getCampground(id: string) {
  const response = await fetch(`https://presentation-day-1-duckdaan.vercel.app/${id}`)

  if(!response.ok){
    throw new Error('Failed to fetch' + ' id: ' + id)
    
  }

  return await response.json();
}

export default getCampground
