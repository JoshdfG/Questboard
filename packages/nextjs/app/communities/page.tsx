"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Eye, MapPin, Plus, Search, Users } from "lucide-react";
import Button from "~~/components/UI/Button";
import Card from "~~/components/UI/Card";
import Input from "~~/components/UI/Input";

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const featuredCommunities = [
    {
      ensName: "accracreators.eth",
      name: "Accra Creators",
      description:
        "A vibrant community of Ghanaian farmers, artists, and entrepreneurs building sustainable livelihoods.",
      type: "Public",
      members: 247,
      purseBalance: "$1,240",
      nftCost: "Free",
      location: "Accra, Ghana",
      category: "Mixed",
      avatar: "🌾",
      isVerified: true,
    },
    {
      ensName: "lagosartists.eth",
      name: "Lagos Digital Artists",
      description: "Connecting Nigerian digital artists, designers, and creative professionals across Africa.",
      type: "Public",
      members: 189,
      purseBalance: "$890",
      nftCost: "0.01 ETH",
      location: "Lagos, Nigeria",
      category: "Art & Design",
      avatar: "🎨",
      isVerified: true,
    },
    {
      ensName: "nairobitech.eth",
      name: "Nairobi Tech Hub",
      description: "Kenyan developers, designers, and tech entrepreneurs collaborating on innovative projects.",
      type: "Private",
      members: 156,
      purseBalance: "$2,100",
      nftCost: "0.005 ETH",
      location: "Nairobi, Kenya",
      category: "Technology",
      avatar: "💻",
      isVerified: true,
    },
    {
      ensName: "cocoafarmers.eth",
      name: "West Africa Cocoa Farmers",
      description: "Sustainable cocoa farming cooperative supporting farmers across Ghana, Ivory Coast, and Nigeria.",
      type: "Public",
      members: 312,
      purseBalance: "$3,450",
      nftCost: "Free",
      location: "West Africa",
      category: "Agriculture",
      avatar: "🍫",
      isVerified: true,
    },
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const results = featuredCommunities.filter(
        community =>
          community.ensName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          community.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          community.location.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const CommunityCard = ({ community }: { community: any }) => (
    <Card className="p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-xl flex-shrink-0">
          {community.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-800">{community.name}</h3>
            {community.isVerified && <Award size={16} className="text-yellow-500" />}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                community.type === "Public" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
              }`}
            >
              {community.type}
            </span>
          </div>
          <p className="text-sm text-orange-600 font-medium">{community.ensName}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin size={10} className="mr-1" />
            {community.location} • {community.category}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{community.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div>
          <p className="text-sm font-bold text-gray-800">{community.members}</p>
          <p className="text-xs text-gray-600">Members</p>
        </div>
        <div>
          <p className="text-sm font-bold text-green-600">{community.purseBalance}</p>
          <p className="text-xs text-gray-600">Purse</p>
        </div>
        <div>
          <p className="text-sm font-bold text-teal-600">{community.nftCost}</p>
          <p className="text-xs text-gray-600">NFT Cost</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Link href={`/community/${community.ensName}`}>
          <Button variant="primary" size="small" className="w-full">
            <Users size={14} className="mr-1" />
            Join Community
          </Button>
        </Link>
        <Link href={`/community/${community.ensName}`}>
          <Button variant="outline" size="small" className="w-full bg-transparent">
            <Eye size={14} className="mr-1" />
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Discover Communities</h1>
        <p className="text-gray-600">Find and join African creator communities</p>
      </div>

      {/* Create Community CTA */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Start Your Community</h3>
            <p className="text-sm text-gray-600">Create an ENS-powered community for your creators</p>
          </div>
          <Link href="/create-community">
            <Button variant="primary" size="small">
              <Plus size={16} className="mr-1" />
              Create
            </Button>
          </Link>
        </div>
      </Card>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Search communities, categories, or locations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
            onKeyPress={e => e.key === "Enter" && handleSearch()}
          />
          <Button
            variant="primary"
            onClick={handleSearch}
            disabled={!searchQuery.trim() || isSearching}
            loading={isSearching}
            className="w-full"
          >
            {isSearching ? "Searching..." : "Search Communities"}
          </Button>
        </div>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Found {searchResults.length} communit{searchResults.length !== 1 ? "ies" : "y"}
          </h2>
          {searchResults.map((community, index) => (
            <CommunityCard key={index} community={community} />
          ))}
        </div>
      )}

      {/* Featured Communities */}
      {searchResults.length === 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Award size={20} className="mr-2 text-yellow-500" />
            Featured Communities
          </h2>
          {featuredCommunities.map((community, index) => (
            <CommunityCard key={index} community={community} />
          ))}
        </div>
      )}

      {/* Community Stats */}
      <Card className="p-4 mt-6 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-teal-600">47</p>
            <p className="text-xs text-gray-600">Active Communities</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">1.2k</p>
            <p className="text-xs text-gray-600">Total Members</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">$12k</p>
            <p className="text-xs text-gray-600">Total Rewards</p>
          </div>
        </div>
      </Card>
      <div className="flex justify-center mt-8">
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-teal-500 rounded-full opacity-60"></div>
      </div>
      <h3 className="text-center">Built on base</h3>
    </div>
  );
}
