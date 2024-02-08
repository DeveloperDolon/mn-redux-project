import React from 'react';
import Container from '../Shared/Container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorldDomination from '@/components/Analytics/WorldDomination';
import TopKeywords from '@/components/Analytics/TopKeywords';
import Categories from '@/components/Analytics/Categories';
import ProjectDeatils from '@/components/Analytics/ProjectDeatils';

const Analytics = () => {
    return (
        <div className='my-10'>
            <Container>
                <Tabs defaultValue="project">
                    <TabsList className="flex justify-between items-center bg-transparent w-full">
                        <TabsTrigger
                            className="data-[state=active]:underline text-black data-[state=active]:shadow-none text-2xl font-semibold"
                            value="project"
                        >
                            Project Details
                        </TabsTrigger>
                        <TabsTrigger
                            className="text-2xl data-[state=active]:underline text-black data-[state=active]:shadow-none font-semibold"
                            value="world"
                        >
                            World Domination
                        </TabsTrigger>
                        <TabsTrigger
                            className="text-2xl data-[state=active]:underline text-black data-[state=active]:shadow-none font-semibold"
                            value="top"
                        >
                            Top Keywords
                        </TabsTrigger>
                        <TabsTrigger
                            className="text-2xl data-[state=active]:underline text-black data-[state=active]:shadow-none font-semibold"
                            value="categories"
                        >
                            Categories
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="project">
                        <ProjectDeatils />
                    </TabsContent>
                    <TabsContent value="world">
                        <WorldDomination />
                    </TabsContent>
                    <TabsContent value="top">
                        <TopKeywords />
                    </TabsContent>
                    <TabsContent value="categories">
                        <Categories />
                    </TabsContent>
                </Tabs>
            </Container>
        </div>
    );
};

export default Analytics;