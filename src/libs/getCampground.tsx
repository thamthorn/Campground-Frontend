async function getHospital(id: string) {
  const response = await fetch(`https://presentation-day-1-duckdaan.vercel.app/api/v1/campgrounds${id}`)

  if(!response.ok){
    throw new Error('Failed to fetch' + ' id: ' + id)
    
  }

  return await response.json();
}

export default getHospital
