import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "./Register/Register";
import Login from "./Login/Login";

const Authentication = () => {
  return (
    <div className="flex justify-center my-10">
      <Tabs defaultValue="password" className="w-[500px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="password">Sign In</TabsTrigger>
          <TabsTrigger value="account">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardContent className="space-y-2">
              <Register />
            </CardContent>  
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardContent className="space-y-2">
              <Login />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Authentication;
