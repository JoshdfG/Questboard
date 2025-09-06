import type React from "react";
import Link from "next/link";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { Award, ExternalLink, Heart, MapPin } from "lucide-react";

interface Profile {
  ensName: string;
  role: string;
  location: string;
  hasQuestBoard: boolean;
  avatar: string;
  description: string;
  stats: {
    supporters: number;
    tips: string;
    [key: string]: any;
  };
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-xl flex-shrink-0">
          {profile.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-800">{profile.ensName}</h3>
            {profile.hasQuestBoard && <Award size={16} className="text-yellow-500" />}
          </div>
          <p className="text-sm text-orange-600 font-medium">{profile.role}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin size={10} className="mr-1" />
            {profile.location}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{profile.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div>
          <p className="text-sm font-bold text-gray-800">{profile.stats.supporters}</p>
          <p className="text-xs text-gray-600">Supporters</p>
        </div>
        <div>
          <p className="text-sm font-bold text-green-600">{profile.stats.tips}</p>
          <p className="text-xs text-gray-600">Tips Earned</p>
        </div>
        <div>
          <p className="text-sm font-bold text-teal-600">{Object.values(profile.stats)[2]}</p>
          <p className="text-xs text-gray-600">
            {Object.keys(profile.stats)[2]?.charAt(0).toUpperCase() + Object.keys(profile.stats)[2]?.slice(1)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Link href={`/pay?recipient=${profile.ensName}`}>
          <Button variant="primary" size="small" className="w-full">
            <Heart size={14} className="mr-1" />
            Send Tip
          </Button>
        </Link>
        <Button variant="outline" size="small" className="w-full bg-transparent">
          <ExternalLink size={14} className="mr-1" />
          View Profile
        </Button>
      </div>
    </Card>
  );
};

export default ProfileCard;
