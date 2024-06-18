// import Image from 'next/image'
import Banner from '@/components/Banner'
import CardPanel from '@/components/CardPanel'
import PromoteCard from '@/components/PromoteCard'

export default function Home() {
  return (
    <main style={{backgroundColor: 'white'}}>
      <Banner />
      <PromoteCard></PromoteCard>
    </main>
  )
}
