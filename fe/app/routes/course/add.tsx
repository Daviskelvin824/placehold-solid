import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import { BookOpen, Plus } from "lucide-react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { ABI } from "~/constant/ABI";
import { CONTRACT_ADDRESS } from "~/constant/CA";
import { generateRandomHexColor } from "~/lib/utils";
import { Textarea } from "~/components/ui/textarea";

interface Course {
  title: string;
  price: number;
  description: string;
}

export default function AddCoursePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Course>({
    title: "",
    price: 0,
    description: "",
  });

  /* -------------------------------------------------------------------------- */
  /*                            contract interaction                            */
  /* -------------------------------------------------------------------------- */
  const {
    data: hashAddCourse,
    isPending: isPendingAdd,
    writeContract: doAddCourse,
    error: errorAdd,
  } = useWriteContract();

  const {
    error: errorReceipt,
    isLoading: isLoadingReceipt,
    isSuccess: isSuccessWaitingReceipt,
  } = useWaitForTransactionReceipt({
    hash: hashAddCourse,
  });

  /* -------------------------------------------------------------------------- */
  /*                               UI Interaction                               */
  /* -------------------------------------------------------------------------- */

  const handleInputChange = (field: keyof Course, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic validation
    if (!formData.title || formData.price == 0) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    console.log("no return");
    doAddCourse({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "addCourse",
      args: [formData.title, formData.description, generateImage(formData.title), formData.price],
    });
  }

  function generateImage(title: string) {
    return `https://placehold.co/640x360/${generateRandomHexColor()}/${generateRandomHexColor()}/png?text=${title}`;
  }

  useEffect(() => {
    setIsSubmitting(isPendingAdd || isLoadingReceipt);
  }, [isPendingAdd, isLoadingReceipt]);

  useEffect(() => {
    if (isSuccessWaitingReceipt) {
      toast.success(`Course “${formData.title}” added!`, {
        description: "Students can now enroll.",
      });

      setFormData({
        title: "",
        price: 0,
        description: "",
      });
    }
  }, [isSuccessWaitingReceipt]);

  useEffect(() => {
    console.log(errorReceipt, errorAdd);
  }, [errorReceipt, errorAdd]);

  return (
    <div className="min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Add New Course</h1>
          <p className="text-gray-300">Create a new course for your curriculum</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Course Information
            </CardTitle>
            <CardDescription>
              Fill in the details below to add a new course to the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to Computer Science"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the course content and objectives..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Price *</Label>
                <Input
                  id="price"
                  placeholder="$9,999.9 PHD"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  required
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="flex-1 cursor-pointer w-max">
                {isSubmitting ? "Adding Course..." : "Add Course"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
