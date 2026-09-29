import React from 'react'
import {cn} from '@/lib/utils'


const YoutubeEmbed = ({videoId, className}:{videoId: string, className?: string}) => {
  return (
    <div className={cn('w-full h-100 rounded-xl overflow-hidden', className)}>
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`} allow="accelerometer; autoplay;" className="w-full h-full" ></iframe>
    </div>
  )
}
export default YoutubeEmbed; 