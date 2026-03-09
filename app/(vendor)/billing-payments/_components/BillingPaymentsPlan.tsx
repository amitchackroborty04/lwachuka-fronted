/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Zap, Star, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

function BillingPaymentsPlan() {
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const { data: subscription } = useQuery({
    queryKey: ["subscription", TOKEN],
    enabled: !!TOKEN,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscriber`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      const data = await res.json();
      return data?.data || [];
    },
  });

  const icons = [
    <Zap key="zap" className="h-5 w-5 text-yellow-500" />,
    <Star key="star" className="h-5 w-5 text-gray-800" />,
    <Crown key="crown" className="h-5 w-5 text-yellow-500" />,
  ];

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Subscription Plans</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Upgrade or downgrade your plan anytime
      </p>

      <div className="grid grid-cols-3 gap-4 items-center py-4">
        {subscription?.map((plan: any, index: number) => (
          <Card
            key={plan._id}
            className={`relative rounded-2xl border transition-all ${
              index === 1
                ? "bg-[#0F172A] border-[#0F172A] scale-105 shadow-xl z-10"
                : "bg-white border-gray-200 shadow-sm"
            }`}
          >
            {index === 1 && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <Badge className="bg-[#1E293B] text-white text-xs px-3 py-1 rounded-full border border-gray-600 whitespace-nowrap">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardContent className="p-6 space-y-5">
              {/* Icon + Name */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    index === 1 ? "bg-white/10" : "bg-yellow-50"
                  }`}
                >
                  {icons[index] || icons[0]}
                </div>

                <span
                  className={`font-semibold text-base ${
                    index === 1 ? "text-white" : "text-gray-800"
                  }`}
                >
                  {plan.name}
                </span>
              </div>

              {/* Price */}
              <div>
                <span
                  className={`text-3xl font-bold ${
                    index === 1 ? "text-white" : "text-gray-900"
                  }`}
                >
                  KSH {plan.price}
                </span>

                <span
                  className={`text-sm ${
                    index === 1 ? "text-gray-400" : "text-muted-foreground"
                  }`}
                >
                  /{plan.days} days
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-2">
                {plan.features?.map((f: string) => (
                  <li key={f} className="flex items-start gap-2">
                    <Zap
                      className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        index === 1 ? "text-blue-400" : "text-blue-500"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        index === 1 ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button
                className={`w-full rounded-xl font-semibold mt-2 ${
                  index === 1
                    ? "bg-white text-[#0F172A] hover:bg-gray-100 border-0"
                    : "bg-transparent border border-yellow-400 text-yellow-500 hover:bg-yellow-50"
                }`}
                variant="outline"
              >
                Buy Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BillingPaymentsPlan;