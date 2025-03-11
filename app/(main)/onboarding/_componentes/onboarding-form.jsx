"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter(); // This will help us to navigate to some other page

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

   const onSubmit =async (values) => {
    console.log(values);
   }

  const watchIndustry = watch("industry");

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title">Complete Your Profile</CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(industries.find((ind) => ind.id === value));
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem value={ind.id} key={ind.id}>
                      {ind.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
            </div>

             {/* Sub Industry */}
            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Select onValueChange={(value) => setValue("subIndustry", value)}>
                  <SelectTrigger id="subIndustry">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((ind) => (
                      <SelectItem value={ind} key={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">{errors.subIndustry.message}</p>
                )}
              </div>
             )}

            {/* Experience */}
            <div className="space-y-2">
                <Label htmlFor="experience">Year of Experience</Label>
                <Input
                 id="experience"
                 type="number"
                 min="0"
                 max="50"
                 placeholder="Enter your experience"
                 {...register("experience")}
                />
                {errors.experience && (
                  <p className="text-sm text-red-500">
                    {errors.experience.message}
                  </p>
                )}
              </div>

          {/* Skills  */}
          <div className="space-y-2">
                <Label htmlFor="skills"> Skills </Label>
                <Input
                 id="experience"
                 placeholder="e.g., Python, JavaScript, React, Node.js"
                 {...register("skills")}
                />
                <p className="text-sm text-muted-foreground">
                   Separate multiple skills with commas 
                </p>
                {errors.skills && (
                  <p className="text-sm text-red-500">
                    {errors.skills.message}
                  </p>
                )}
              </div>


              {/* Professional fields */}
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea 
                 id="bio"
                 placeholder="Tell us about your Professional background..."
                 className="h-32"
                 {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-sm text-red-500">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Complete Profile
                </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
