import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Waitlist = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("waitlist_signups" as any)
        .insert({ email: trimmed, first_name: firstName.trim(), last_name: lastName.trim() } as any);

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already on the waitlist!");
          setSubmitted(true);
        } else {
          throw error;
        }
      } else {
        setSubmitted(true);
        toast.success("You're on the list!");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center space-y-8"
      >
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Coming Soon
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            PretaQuiz
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The fastest way to qualify leads online. Be the first to know when we launch.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-3 py-6"
          >
            <CheckCircle className="h-12 w-12 text-primary" />
            <p className="text-lg font-medium text-foreground">You're on the list!</p>
            <p className="text-sm text-muted-foreground">We'll email you when PretaQuiz is ready.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="flex-1"
                disabled={loading}
              />
              <Input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="flex-1"
                disabled={loading}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading} className="px-6">
                {loading ? "Joining…" : "Join the Waitlist"}
              </Button>
            </div>
          </form>
        )}

        <p className="text-xs text-muted-foreground">
          No spam, ever. Unsubscribe anytime.
        </p>
      </motion.div>
    </div>
  );
};

export default Waitlist;
