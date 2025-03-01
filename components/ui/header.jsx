import React from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image' 
import Link from 'next/link'
import { FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { ChevronDownIcon } from "lucide-react"
  
const Header = () => {
    return (
        <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'> 
            <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
                <Link href='/'>
                  <Image src='/logo.png' alt='Sensai-logo' width={100} height={100}  
                  className="h-12 py-1 w-auto object-contain  " />
                  
                </Link>

                <div className=" flex items-center space-x-2 md:space-x-4">
                    <SignedIn>
                       <Link href={'/dashboard'}>
                        <Button variant="outline">
                            <LayoutDashboard className="h-4 w-4" />
                            <span className='hidden md:block'>Industry Insights</span>
                            
                        </Button>
                       </Link>

                

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                        <Button>
                            <StarsIcon className="h-4 w-4" />
                            <span className='hidden md:block'>Growth Tools</span>
                            <ChevronDownIcon className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        
                            <DropdownMenuItem>
                                <Link href={"/resume"}className="flex items-center ">
                                   <FileText className="h-4 w-4 " />
                                   <span>Build Resume</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={"/ai-cover-letter"}className="flex items-center ">
                                   <PenBox className="h-4 w-4 mr-2" />
                                   Cover Letter
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={"/interview"}className="flex items-center ">
                                   <GraduationCap className="h-4 w-4 mr-2" />
                               Interview prep
                                </Link>
                            </DropdownMenuItem>
                            
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SignedIn>

        <SignedOut>
          <SignInButton>
            <Button variant="outline">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
              userButtonPopoverCard: "shadow-x1",
              userPreviewIdentifier: "font-semibold",
            },
          }} 
          afterSignOutUrl='/'
          />
          

        </SignedIn> 

                </div>


            
        

            </nav>
            
      

      </header>
    )
}
export default Header