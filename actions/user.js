"use server";
import { PrismaClient } from '@prisma/client'
import { auth } from "@clerk/nextjs/server";

const db = new PrismaClient()

export async function updateUser(data){
    const {userId} = await auth();
    if(!userId) throw error(401, "Unauthorized");

    const user = await db.user.findUnique({
        where:{
            clerkUserId : userId,
        },
    });
    if(!user) throw error(404, "User not found");

    try{
        const result = await db.$transaction(
            async (tx) => {
                //find if the industry exists
                let industryInsight = await tx.industryInsight.findUnique({
                    where:{
                        industry: data.industry,
                    },
                });

                //If industry does not exist, create it with default values - wi;; replace it with ai letter
                if(!industryInsight){
                    industryInsight = await tx.industryInsight.create({
                        data:{
                            industry: data.industry,
                            salaryRanges: [], // Default empty array
                            growthRate: 0, //Defaault value
                            demandLevel: "MEDIUM", //Default  value
                            topSkills: [], //Default empty array
                            marketOutlook: "NEUTRAL", //Default value
                            keyTrends:[], //Default empty array
                            recommendedSkills: [], //Default empty array
                            nextUpdate: new Date(Date.now()+7 * 24 *60 * 60 * 1000), // 1 week from now  
                        },
                    });
                }
                //update the user
                const updateUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data:{
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    },
                });

                return { updateUser, industryInsight };
            },
            {
                timeout: 10000, //default timeout is 5000ms
            }
        );

        return { success: true, ...result };
    }catch (error){
        console.log("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile");
    }
}

export async function getUserOnboardingStatus(){
    const {userId} = await auth();
    if(!userId) throw error(401, "Unauthorized");

    const user = await db.user.findUnique({
        where:{
            clerkUserId : userId,
        },
    });
    if(!user) throw error(404, "User not found");
    try{
        const user = await db.user.findUnique({
            where:{
                clerkUserId: userId,
            },
            select: {
                industry: true,
            },
        });
        return {
            isOnboarded: !!user?.industry,
        }
    }
    catch(error){
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to onboarding status"+error.message);
    }
}
