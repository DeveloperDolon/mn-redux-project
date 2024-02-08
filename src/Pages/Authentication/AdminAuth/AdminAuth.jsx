import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminRegister from './AdminRegister';
import AdminLogin from './AdminLogin';

const AdminAuth = () => {
    return (
        <div className="flex justify-center my-10">
            <Tabs defaultValue="password" className="w-[500px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Sign Up</TabsTrigger>
                    <TabsTrigger value="password">Sign In</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardContent className="space-y-2">
                            <AdminRegister />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardContent className="space-y-2">
                            <AdminLogin />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminAuth;