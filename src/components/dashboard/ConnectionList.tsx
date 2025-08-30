// src/components/dashboard/ConnectionList.tsx
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Link, MessageSquare } from "lucide-react";
import { type Connection } from "@/lib/types";

interface ConnectionListProps {
  initialConnections: Connection[];
}

export function ConnectionList({ initialConnections }: ConnectionListProps) {
  if (initialConnections.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Link className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No platforms connected yet
        </h3>
        <p className="text-gray-600 mb-4">
          You have not connected any platforms yet.
        </p>
        <p className="text-sm text-gray-500">
          Platform integration will be available soon. This will allow you to connect your chatbots to WhatsApp, Facebook, Instagram, and your website.
        </p>
      </div>
    );
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'WhatsApp':
        return (
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 font-bold text-lg">W</span>
          </div>
        );
      case 'Facebook':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">f</span>
          </div>
        );
      case 'Instagram':
        return (
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-bold text-lg">I</span>
          </div>
        );
      case 'Website':
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-bold text-lg">🌐</span>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
        );
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'WhatsApp':
        return 'bg-green-100 text-green-800';
      case 'Facebook':
        return 'bg-blue-100 text-blue-800';
      case 'Instagram':
        return 'bg-purple-100 text-purple-800';
      case 'Website':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {initialConnections.map(conn => (
        <Card key={conn.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getPlatformIcon(conn.platform)}
                <div>
                  <CardTitle className="text-lg">{conn.display_name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getPlatformColor(conn.platform)}>
                      {conn.platform}
                    </Badge>
                    <Badge variant={conn.is_active ? 'default' : 'secondary'}>
                      {conn.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="text-xs"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  View Chatbots
                  <span className="text-xs text-gray-500 ml-1">(Soon)</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm text-gray-600">
              Connected on {new Date(conn.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
