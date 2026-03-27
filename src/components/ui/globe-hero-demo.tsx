"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotGlobeHero } from "@/components/ui/globe-hero";
import { ArrowRight, Zap } from "lucide-react";

export default function DotGlobeHeroDemo() {
  return (
    <DotGlobeHero rotationSpeed={0.003} globeRadius={1.2}>
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary">
            <Zap className="w-3.5 h-3.5" />
            GLOBAL NETWORK
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="text-foreground">Connect</span>{" "}
            <span className="text-gradient">the World</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience real-time global connectivity with our{" "}
            <span className="text-foreground font-medium">
              distributed network infrastructure
            </span>
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Monitor data flows, track performance, and scale across continents
            with unprecedented reliability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4 pt-4"
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            <Zap className="w-4 h-4" />
            Start Exploring
            <ArrowRight className="w-4 h-4" />
          </button>

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-accent transition-colors">
            <ArrowRight className="w-4 h-4" />
            View Live Demo
          </button>
        </motion.div>
      </div>
    </DotGlobeHero>
  );
}
