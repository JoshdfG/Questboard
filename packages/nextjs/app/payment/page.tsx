"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import { AlertCircle, Check, CreditCard, Send, Wallet } from "lucide-react";
import { useWallet } from "~~/contexts/wallet-context";

export default function PaymentPage() {
  const { balance } = useWallet();
  const router = useRouter();
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    message: "",
    paymentMethod: "crypto",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendPayment = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Payment Sent!</h2>
          <p className="text-gray-600 mb-4">
            Your ${formData.amount} tip was successfully sent to {formData.recipient}
          </p>
          <p className="text-sm text-gray-500 mb-6">You&apos;ve just empowered an African creator! 🎉</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Send Payment</h1>
        <p className="text-gray-600">Support creators or send money to family</p>
      </div>

      {/* Payment Form */}
      <Card className="p-6 mb-6">
        <div className="space-y-6">
          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Send to (ENS name or address)</label>
            <Input
              type="text"
              placeholder="kofifarmer.eth"
              value={formData.recipient}
              onChange={e => handleInputChange("recipient", e.target.value)}
              icon={<Send size={16} />}
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={e => handleInputChange("amount", e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-sm font-medium text-gray-500">USD</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Available balance: ${balance} ETH</p>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleInputChange("paymentMethod", "crypto")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.paymentMethod === "crypto"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Wallet size={20} className="mx-auto mb-1 text-orange-500" />
                <span className="text-sm font-medium">Crypto</span>
              </button>
              <button
                onClick={() => handleInputChange("paymentMethod", "fiat")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.paymentMethod === "fiat"
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CreditCard size={20} className="mx-auto mb-1 text-teal-500" />
                <span className="text-sm font-medium">Base Pay</span>
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
            <textarea
              placeholder="Great work on your latest harvest! 🌾"
              value={formData.message}
              onChange={e => handleInputChange("message", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* Send Button */}
      <Button
        variant="primary"
        size="large"
        onClick={handleSendPayment}
        disabled={!formData.recipient || !formData.amount || isLoading}
        className="w-full"
        loading={isLoading}
      >
        {isLoading ? "Sending..." : `Send $${formData.amount || "0.00"}`}
      </Button>

      {/* Info Card */}
      <Card className="p-4 mt-4 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <AlertCircle size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800 font-medium">Payment Tips</p>
            <p className="text-xs text-blue-600 mt-1">
              Use Base Pay for fiat payments or send crypto directly. All transactions are secure on Base L2.
            </p>
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
