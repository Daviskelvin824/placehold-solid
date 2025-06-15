"use client";

import type React from "react";
import { useState } from "react";
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

interface Course {
  id: string;
  title: string;
  description: string;
  credits: number;
  image: string;
}

export default function AddCoursePage() {
  const [formData, setFormData] = useState<Course>({
    id: "",
    title: "",
    description: "",
    credits: 3,
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof Course, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.id || !formData.title || !formData.description) {
      toast.warning("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`Course “${formData.title}” added!`, {
        description: "Students can now enroll.",
      });

      // Reset form
      setFormData({
        id: "",
        title: "",
        description: "",
        credits: 3,
        image: "",
      });
    } catch (error) {
      toast.error("Failed to add course", {
        description: "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      credits: 3,
      image: "",
    });
  };

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
                <Label htmlFor="title">Price *</Label>
                <Input
                  id="price"
                  placeholder="e.g., Introduction to Computer Science"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1 cursor-pointer">
                  {isSubmitting ? "Adding Course..." : "Add Course"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearForm}
                  className="flex-1 cursor-pointer"
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {import.meta.env.DEV && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Preview</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>ID:</strong> {formData.id || "Not specified"}
              </p>
              <p>
                <strong>Title:</strong> {formData.title || "Not specified"}
              </p>
              <p>
                <strong>Credits:</strong> {formData.credits}
              </p>
              <p>
                <strong>Description:</strong> {formData.description || "Not specified"}
              </p>
              <p>
                <strong>Image:</strong> {formData.image || "No image selected"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
