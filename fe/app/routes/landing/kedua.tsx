"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
import { Button } from "../../components/ui/button";
// import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import {
  Shield,
  Zap,
  Users,
  Trophy,
  Star,
  ChevronRight,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";

type Course = {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  image: string;
  id: string;
  price?: string;
  level?: string;
  duration?: string;
  students?: number;
};

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to load courses:", err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Zap className="w-3 h-3 mr-1" />
            Powered by Blockchain
          </Badge> */}

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-6">
            Master Web3 Development
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Learn blockchain development, smart contracts, and DeFi with
            hands-on projects. Build the future of decentralized applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
            >
              View Courses
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { label: "Students", value: "10K+" },
              { label: "Courses", value: "50+" },
              { label: "Success Rate", value: "95%" },
              { label: "Countries", value: "120+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Learn from industry experts with real-world experience in
              blockchain development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure Learning",
                description:
                  "All transactions secured by blockchain technology",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Instructors",
                description:
                  "Learn from developers who built successful DeFi protocols",
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Certification",
                description: "Get NFT certificates upon course completion",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Courses
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive courses designed to take you from beginner to
              blockchain expert
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <BentoGrid className="max-w-7xl mx-auto">
              {courses.map((course, i) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <BentoGridItem
                    title={course.title}
                    description={
                      <>
                        <div>{course.description}</div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Users className="w-4 h-4" />
                            {course.students?.toLocaleString()} students
                          </div>
                          <div className="text-lg font-bold text-purple-400">
                            {course.price}
                          </div>
                        </div>
                      </>
                    }
                    header={
                      <div className="relative group overflow-hidden rounded-lg">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex justify-between items-center text-white text-xs">
                            <span className="bg-purple-600 px-2 py-1 rounded">
                              {course.level}
                            </span>
                            <span className="bg-black/50 px-2 py-1 rounded">
                              {course.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    }
                    className={`${
                      i === 3 || i === 6 ? "md:col-span-2" : ""
                    } cursor-pointer group hover:scale-[1.02] transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30`}
                  />
                </motion.div>
              ))}
            </BentoGrid>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Students Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "DeFi Developer",
                content:
                  "This platform transformed my career. Now I'm building DeFi protocols for a major exchange.",
                rating: 5,
              },
              {
                name: "Sarah Johnson",
                role: "Smart Contract Auditor",
                content:
                  "The security course was incredible. I landed my dream job as a smart contract auditor.",
                rating: 5,
              },
              {
                name: "Mike Rodriguez",
                role: "Blockchain Consultant",
                content:
                  "Comprehensive courses with real-world projects. Best investment I've made in my education.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers already building on Web3
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg"
          >
            Start Your Journey
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
