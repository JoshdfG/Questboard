"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "~~/components/UI/Button";
import Card from "~~/components/UI/Card";

interface Community {
  id: bigint;
  name: string;
  description: string;
  communityImage: string;
  admins: string[];
  tokenAddress: string;
}

export default function DiscoverPage() {
  const router = useRouter();
  const [communities] = useState<Community[]>([]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Discover Communities</h1>

      {/* No communities */}
      {communities.length === 0 && <p className="text-gray-500">No communities found. Be the first to create one!</p>}

      {/* Community list */}
      <div className="space-y-4">
        {communities.map((community, idx) => (
          <Card key={idx} className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <img
              src={community.communityImage || "/placeholder.png"}
              alt={community.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{community.name}</h2>
              <p className="text-sm text-gray-600">{community.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => alert(`Join ${community.name} (implement join later)`)}>
                Join
              </Button>
              <Button variant="primary" onClick={() => router.push(`/communities/${community.id.toString()}`)}>
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
