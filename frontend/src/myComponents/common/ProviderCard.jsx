import React from 'react'
import { Briefcase, Calendar, Mail, MapPin, Phone, Star } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react';


const ProviderCard = ({appendToFormData, handleCaseCreation, provider }) => {
  return (
    <Card className="w-[44%] max-w-md overflow-hidden bg-card text-card-foreground hover:scale-[99%] duration-300 hover:shadow-md " >
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src={provider.image} alt="Provider" />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tighter">{provider.firstName}{' '}{provider.lastName}</CardTitle>
            <div className="flex items-center mt-1 space-x-2">
              <Badge variant="default" className="bg-primary hover:shadow-md">Verified</Badge>
              <Badge variant="outline" className="text-blue-500 border-blue-500">
                <Briefcase className="w-3 h-3 mr-1" />
                {provider?.additionalDetails?.category}
              </Badge>
            </div>
            <div className="flex items-center mt-1">
              <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground tracking-tight">{provider?.additionalDetails?.experience} years experience</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 pt-2 text-sm ">
        <div className="flex items-center">
          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
          <span>{provider?.additionalDetails?.contactNumber}</span>
        </div>
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
          <span>{provider.email}</span>
        </div>
        <div className="flex items-center mt-2 justify-center md:justify-start">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                <span className="text-sm font-semibold">4.8</span>
                <span className="text-sm text-muted-foreground ml-1">(124 reviews)</span>
              </div>
        <div className="mt-2">
          <h4 className="font-semibold mb-1">About</h4>
          <p className="text-sm text-muted-foreground">
            {provider?.additionalDetails?.about}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button onClick={() => (appendToFormData("serviceProvider", provider._id))} variant="outline" className="w-[48%] bg-primary-foreground text-black hover:bg-primary/85 hover:text-white"><div className='flex items-center justify-center gap-2'>
        Confirm<Check/>
        </div></Button>
      </CardFooter>
    </Card>
  )
}

export default ProviderCard