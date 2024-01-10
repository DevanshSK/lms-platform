import UserNav from '@/components/navbar/user-nav'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='h-full flex items-center gap-3 justify-center'>
      <span>This is home page</span>
      <UserNav />
    </div>
  )
}
