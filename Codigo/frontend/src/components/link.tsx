import React from 'react'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface IconLinkProps {
  href: string
  icon: React.ReactNode
  label?: string
  className?: string
  tooltipText: string
}

const IconLink: React.FC<IconLinkProps> = ({
  href,
  icon,
  label,
  className,
  tooltipText,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link href={href} className={`flex items-center ${className}`}>
            <span className="mr-2">{icon}</span>
            {label}
          </Link>
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default IconLink
