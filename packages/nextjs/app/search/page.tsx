"use client";

import { useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import { Award, Search } from "lucide-react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockProfiles = [
    {
      ensName: "amafarmer.eth",
      role: "Cocoa Farmer",
      location: "Kumasi, Ghana",
      hasQuestBoard: true,
      avatar: "🌾",
      description: "Sustainable cocoa farming for 15 years. Building a better future for my community.",
      stats: { supporters: 127, tips: "$456", crops: "2.5 tons" },
    },
    {
      ensName: "kojoartist.eth",
      role: "Digital Artist",
      location: "Lagos, Nigeria",
      hasQuestBoard: true,
      avatar: "🎨",
      description: "Creating Afrofuturistic digital art that celebrates our culture and heritage.",
      stats: { supporters: 89, tips: "$234", artworks: "45 pieces" },
    },
    {
      ensName: "nanamusic.eth",
      role: "Musician",
      location: "Nairobi, Kenya",
      hasQuestBoard: false,
      avatar: "🎵",
      description: "Afrobeat producer mixing traditional rhythms with modern sounds.",
      stats: { supporters: 203, tips: "$678", tracks: "28 songs" },
    },
  ];

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      const results = mockProfiles.filter(
        profile =>
          profile.ensName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.location.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Discover Creators</h1>
        <p className="text-gray-600">Find and support amazing African talent</p>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Search by name, role, or location..."
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
            {isSearching ? "Searching..." : "Search Creators"}
          </Button>
        </div>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Found {searchResults.length} creator{searchResults.length !== 1 ? "s" : ""}
          </h2>
          {searchResults.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </div>
      )}

      {/* Featured Creators */}
      {searchResults.length === 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Award size={20} className="mr-2 text-yellow-500" />
            Featured Creators
          </h2>
          {mockProfiles.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </div>
      )}

      {/* Community Stats */}
      <Card className="p-4 mt-6 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-orange-600">2.4k</p>
            <p className="text-xs text-gray-600">Active Creators</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-teal-600">$47k</p>
            <p className="text-xs text-gray-600">Tips Sent</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">156</p>
            <p className="text-xs text-gray-600">Countries</p>
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
