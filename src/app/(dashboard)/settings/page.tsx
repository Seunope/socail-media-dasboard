"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { user } = useAuth();

  // Redirect if not authenticated
  if (!user) {
    redirect("/login");
  }

  //   Only allow admin access
  if (user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You dont have permission to view this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">User Management</h3>
              <Button variant="outline" className="mt-2">
                Manage Users
              </Button>
            </div>

            <div>
              <h3 className="font-medium">System Configuration</h3>
              <Button variant="outline" className="mt-2">
                Configure System
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
