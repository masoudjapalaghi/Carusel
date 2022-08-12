import Head from 'next/head'
import Image from 'next/image'
import { Simple } from '../components/carusel'

export default function Home() {
  return (
    <div className="flex flex-col gap-48">
      <Simple/>
    </div>
  )
}
