import { Button } from '@/components/ui/button'
import { List, Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <div className="bg-white border-b px-4 py-3">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link to="/forms" className="text-xl font-semibol">
                Dynamic Form Builder
            </Link>
            <div className="flex gap-2">
                <Button variant='outline'>
                <Link to="/forms" className="flex items-center gap-2">
                    <List className="h-4 w-4" />
                    My Forms
                </Link>
                </Button>
                <Button>
                <Link to="/builder" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Form
                </Link>
                </Button>
            </div>
            </div>
        </div>
    </>
  )
}

export default Navbar