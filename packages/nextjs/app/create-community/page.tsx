"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import axios from "axios";
import { Check, Image, Users } from "lucide-react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useCreateCommunity } from "~~/hooks/FactoryHooks/factoryHooks";

export default function CreateCommunityPage() {
  const router = useRouter();
  const { address } = useAccount();
  const { createCommunity, isPending, isConfirming, isConfirmed, error } = useCreateCommunity();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    communityImage: "", // this will store IPFS URL after upload
    admins: address ? [address as Address] : ([] as Address[]),
    tokenAddress: "" as Address,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAdmin = () => {
    setFormData(prev => ({ ...prev, admins: [...prev.admins, "" as Address] }));
  };

  const handleAdminChange = (index: number, value: string) => {
    const newAdmins = [...formData.admins];
    newAdmins[index] = value as Address;
    setFormData(prev => ({ ...prev, admins: newAdmins }));
  };

  const handleCreateCommunity = () => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }

    if (!formData.communityImage) {
      alert("Please upload a community image before creating.");
      return;
    }

    createCommunity(formData);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      try {
        const data = new FormData();
        data.append("file", file);

        const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: process.env.NEXT_PUBLIC_API_KEY,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_API_SECRET,
          },
        });

        const cid = response.data.IpfsHash;
        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;

        setFormData(prevData => ({
          ...prevData,
          communityImage: ipfsUrl,
        }));
      } catch (error) {
        console.error("Image upload error", error);
      } finally {
        setUploadingImage(false);
      }
    }
  };

  // Success redirect
  useEffect(() => {
    if (isConfirmed) {
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/communities");
      }, 3000);
    }
  }, [isConfirmed, router]);

  if (showSuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Community Created!</h2>
          <p className="text-gray-600 mb-4">{formData.name} is now live 🎉</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Community</h1>
        <p className="text-gray-600">Deploy a new community on-chain</p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <Card className="p-6 space-y-4">
          <Input
            type="text"
            label="Community Name"
            placeholder="Accra Creators"
            value={formData.name}
            onChange={e => handleInputChange("name", e.target.value)}
            icon={<Users size={16} />}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Describe your community..."
              value={formData.description}
              onChange={e => handleInputChange("description", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              rows={3}
            />
          </div>

          {/* Community Image File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Image size={16} /> Community Image
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-600" />
            {uploadingImage && <p className="text-sm text-orange-600 mt-2">Uploading image to IPFS...</p>}
            {formData.communityImage && (
              <img src={formData.communityImage} alt="Preview" className="w-full h-40 object-cover rounded-lg mt-2" />
            )}
          </div>

          {/* Admins */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Admins</label>
            {formData.admins.map((admin, idx) => (
              <Input
                key={idx}
                type="text"
                placeholder="0x..."
                value={admin}
                onChange={e => handleAdminChange(idx, e.target.value)}
              />
            ))}
            <button type="button" onClick={handleAddAdmin} className="text-sm text-orange-600 mt-2">
              + Add another admin
            </button>
          </div>
        </Card>

        {/* Create button */}
        <Button
          variant="primary"
          size="large"
          onClick={handleCreateCommunity}
          disabled={!formData.name || !formData.description || uploadingImage || isPending || isConfirming}
          className="w-full"
          loading={isPending || isConfirming}
        >
          {isPending ? "Waiting for wallet..." : isConfirming ? "Confirming..." : "Create Community"}
        </Button>

        {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
      </div>
    </div>
  );
}
