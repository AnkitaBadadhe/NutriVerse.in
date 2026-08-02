import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageSquare, ThumbsUp, Sparkles, ShieldCheck, Stethoscope, 
  Search, Plus, Filter, Heart, Award, Share2, CheckCircle2, Bookmark, 
  Send, HelpCircle, TrendingUp, MessageCircle, X, ChevronDown, Check 
} from 'lucide-react';

interface Reply {
  id: string;
  author: string;
  avatar: string;
  role: string;
  isDoctor?: boolean;
  time: string;
  text: string;
  likes: number;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  role: string;
  category: string;
  time: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  hasLiked?: boolean;
  saved?: boolean;
  doctorAnswer?: {
    doctorName: string;
    doctorTitle: string;
    doctorAvatar: string;
    hospital: string;
    answerText: string;
  };
  replies: Reply[];
}

export const ExpertCommunityView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);

  // New Post Form State
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Doctor Verified Q&A');
  const [postContent, setPostContent] = useState('');
  const [postTags, setPostTags] = useState('');

  // Daily Poll State
  const [pollSelected, setPollSelected] = useState<number | null>(null);
  const [pollVotes, setPollVotes] = useState([420, 310, 170, 100]);

  // Reply Input State per Post
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [expandedThreads, setExpandedThreads] = useState<Record<string, boolean>>({});

  const categories = [
    'All', 
    'Trending', 
    'Doctor Verified Q&A', 
    'Meal Success Stories', 
    'Biomarker & Labs', 
    'Ayurvedic Wellness'
  ];

  // Rich Initial Community Feed
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'post-1',
      author: 'Sunita Rao',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      role: 'Member since 2025 • Reversing HbA1c',
      category: 'Biomarker & Labs',
      time: '2 hours ago',
      title: 'How I reduced my HbA1c from 7.2% to 5.6% in 4 months using NutriVerse AI meal plans!',
      content: 'I was diagnosed with early Stage-2 Type 2 Diabetes late last year. My endocrinologist recommended strict carb budgeting. Following NutriVerse\'s High-Protein Low-Glycemic meal plans, adding A2 Ghee turmeric dal, and daily 30-minute walks helped lower my fast glucose from 148 mg/dL to 92 mg/dL. Happy to share my daily menu with anyone struggling!',
      tags: ['HbA1c', 'DiabetesReversal', 'IndianDiet', 'LowGI'],
      likes: 342,
      doctorAnswer: {
        doctorName: 'Dr. Ananya Sharma, MD',
        doctorTitle: 'Clinical Endocrinologist & Diabetologist',
        doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80',
        hospital: 'Fortis Hospital & AIIMS Research Fellow',
        answerText: 'Outstanding results, Sunita! Your combination of high-soluble fiber moong dal with lipid-paired curcumin and low postprandial glucose spiking is clinically validated. Keep monitoring fasting insulin every 6 months.'
      },
      replies: [
        {
          id: 'r1',
          author: 'Rajesh Kumar',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          role: 'Community Member',
          time: '1 hour ago',
          text: 'This is super inspiring! Did you completely eliminate white rice, or did you switch to brown/red rice?',
          likes: 24
        },
        {
          id: 'r2',
          author: 'Sunita Rao',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
          role: 'Author',
          time: '45 mins ago',
          text: 'Hi Rajesh! I replaced white rice with tri-color quinoa and cauliflower naan for dinner, and restricted brown rice to 1/2 cup during lunch.',
          likes: 38
        }
      ]
    },
    {
      id: 'post-2',
      author: 'Vikram Sethi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      role: 'Fitness Athlete & Marathoner',
      category: 'Meal Success Stories',
      time: '5 hours ago',
      title: 'Is 1.8g protein per kg necessary for natural muscle recovery without bloating?',
      content: 'I switched from heavy whey isolate supplements to plant & paneer-based complete proteins recommended by the AI Meal Planner (Poached Eggs, Pan-seared Sea Bass, Tofu Poke Bowls). My gut digestion improved tremendously and my recovery times cut down by 30%. Any other endurance runners following this strategy?',
      tags: ['MuscleRecovery', 'CleanProtein', 'EnduranceNutrition'],
      likes: 189,
      doctorAnswer: {
        doctorName: 'Dr. Rohan Mehra, MD',
        doctorTitle: 'Sports Nutritionist & Physician',
        doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80',
        hospital: 'Max Healthcare Sports Medicine',
        answerText: 'For natural endurance athletes, 1.6g to 2.0g per kg is ideal. Sourcing protein from whole foods like eggs, paneer, and salmon provides essential micronutrients (Choline, B12, Zinc) that isolated powders often lack.'
      },
      replies: [
        {
          id: 'r3',
          author: 'Priya Patel, RD',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
          role: 'Registered Dietitian',
          isDoctor: true,
          time: '3 hours ago',
          text: 'Adding digestive enzymes or papaya after protein-dense meals also accelerates peptide absorption without gastric distress.',
          likes: 45
        }
      ]
    },
    {
      id: 'post-3',
      author: 'Kavita Menon',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'PCOS & Metabolic Wellness Advocate',
      category: 'Ayurvedic Wellness',
      time: '1 day ago',
      title: 'Managing PCOS hormone fluctuations with Ayurvedic Golden Milk & Seed Cycling',
      content: 'Sharing my clinical experience pairing NutriVerse Ayurvedic recommendations with seed cycling (Pumpkin & Flax seeds during follicular phase, Sesame & Sunflower seeds during luteal phase). Combined with Ceylon cinnamon porridge, my cycle normalized in 90 days!',
      tags: ['PCOS', 'Ayurveda', 'SeedCycling', 'HormonalBalance'],
      likes: 512,
      replies: []
    }
  ]);

  // Handle Like/Upvote
  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const hasLiked = p.hasLiked;
        return {
          ...p,
          hasLiked: !hasLiked,
          likes: hasLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  // Handle Save Bookmark
  const handleSavePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, saved: !p.saved };
      }
      return p;
    }));
  };

  // Handle Adding Reply
  const handleAddReply = (postId: string) => {
    const text = replyInputs[postId];
    if (!text || !text.trim()) return;

    const newReply: Reply = {
      id: `r-${Date.now()}`,
      author: 'You (Patient / Member)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: 'Active Community Member',
      time: 'Just now',
      text: text.trim(),
      likes: 1
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, newReply]
        };
      }
      return p;
    }));

    setReplyInputs(prev => ({ ...prev, [postId]: '' }));
  };

  // Handle Submit New Community Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: 'You (Patient / Member)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: 'Active Community Member',
      category: postCategory,
      time: 'Just now',
      title: postTitle.trim(),
      content: postContent.trim(),
      tags: postTags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean),
      likes: 1,
      doctorAnswer: {
        doctorName: 'Dr. Ananya Sharma, MD',
        doctorTitle: 'NutriVerse Clinical AI Medical Lead',
        doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80',
        hospital: 'Clinical Telehealth Division',
        answerText: `Thank you for sharing your query regarding "${postTitle}". Based on your inputs, our clinical dietitians recommend maintaining optimal hydration and monitoring postprandial glucose markers.`
      },
      replies: []
    };

    setPosts([newPost, ...posts]);
    setNewPostModalOpen(false);
    setPostTitle('');
    setPostContent('');
    setPostTags('');
  };

  // Filter Posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = 
      activeCategory === 'All' || 
      (activeCategory === 'Trending' && post.likes > 200) ||
      post.category === activeCategory;

    const matchesSearch = 
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Calculate Poll Percentage
  const totalPollVotes = pollVotes.reduce((a, b) => a + b, 0);

  const handleVotePoll = (idx: number) => {
    if (pollSelected !== null) return;
    setPollSelected(idx);
    setPollVotes(prev => {
      const next = [...prev];
      next[idx] += 1;
      return next;
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner Header & Live Stats Ticker */}
      <div className="bg-gradient-to-r from-[#005082] via-[#003d66] to-[#002845] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 font-extrabold text-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
              NutriVerse Clinical AI & Peer Lounge
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading leading-tight">
              Expert Clinical Community & Medical Q&A
            </h2>
            <p className="text-xs text-slate-200 leading-relaxed font-medium max-w-xl">
              Connect with 20+ verified telehealth doctors, clinical dietitians, and thousands of patients sharing real-world health transformation journeys.
            </p>
          </div>

          {/* New Post Button */}
          <button
            onClick={() => setNewPostModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Ask Doctors / Share Story</span>
          </button>
        </div>

        {/* Live Ticker Row */}
        <div className="mt-6 pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2 text-emerald-300 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>1,420 Patients Online Now</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <Stethoscope className="w-4 h-4 text-cyan-400" />
            <span>84 Clinical Doctors Active</span>
          </div>
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>4,120 Verified Clinical Answers</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Main Feed (8 Cols), Right Sidebar (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Search, Filter Tabs & Community Posts (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Search Bar & Filter Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search community posts by topic (e.g. HbA1c, Keto, Gut, PCOS, Turmeric)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#005082]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-[#005082] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts List Feed */}
          <div className="space-y-6">
            {filteredPosts.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500">
                No community discussions found for "{searchQuery}". Be the first to start a topic!
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isThreadOpen = !!expandedThreads[post.id];
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4"
                  >
                    {/* Post Author Bar */}
                    <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                        <div>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white font-heading leading-tight">{post.author}</h4>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">{post.role} • {post.time}</span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-[#005082]/10 text-[#005082] dark:text-cyan-400 font-extrabold text-[10px] uppercase">
                        {post.category}
                      </span>
                    </div>

                    {/* Post Content Body */}
                    <div className="space-y-2">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-heading leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {post.content}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Doctor Answer Box (Highlight Gradient) */}
                    {post.doctorAnswer && (
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#005082]/10 via-cyan-500/10 to-emerald-500/10 border border-[#005082]/20 space-y-2.5">
                        <div className="flex items-center gap-3">
                          <img src={post.doctorAnswer.doctorAvatar} alt={post.doctorAnswer.doctorName} className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-black text-slate-900 dark:text-white font-heading">{post.doctorAnswer.doctorName}</span>
                              <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500 text-white font-extrabold flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Verified Doctor
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">{post.doctorAnswer.doctorTitle} • {post.doctorAnswer.hospital}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium pl-1 border-l-2 border-emerald-500 italic">
                          "{post.doctorAnswer.answerText}"
                        </p>
                      </div>
                    )}

                    {/* Action Bar (Upvote, Comment Count, Bookmark) */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      
                      <div className="flex items-center gap-4">
                        {/* Upvote Button */}
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center gap-1.5 font-bold transition-all px-3 py-1.5 rounded-xl ${
                            post.hasLiked 
                              ? 'bg-emerald-500 text-white shadow-sm' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{post.likes} Helpful</span>
                        </button>

                        {/* Thread Toggle Button */}
                        <button
                          onClick={() => setExpandedThreads(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="flex items-center gap-1.5 font-bold text-slate-600 dark:text-slate-300 hover:text-[#005082] dark:hover:text-cyan-400"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{post.replies.length} Replies</span>
                        </button>
                      </div>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => handleSavePost(post.id)}
                        className={`p-2 rounded-xl transition-all ${
                          post.saved ? 'text-amber-500 bg-amber-500/10' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${post.saved ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Collapsible Replies Section */}
                    {isThreadOpen && (
                      <div className="pt-4 space-y-3 border-t border-slate-100 dark:border-slate-800">
                        <h5 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider font-heading">
                          Community Replies ({post.replies.length})
                        </h5>

                        {/* List of Replies */}
                        <div className="space-y-2.5">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <img src={reply.avatar} alt={reply.author} className="w-6 h-6 rounded-full object-cover" />
                                  <span className="font-bold text-slate-900 dark:text-white">{reply.author}</span>
                                  {reply.isDoctor && (
                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-bold">Doctor</span>
                                  )}
                                </div>
                                <span className="text-[10px] text-slate-400">{reply.time}</span>
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed pl-8">
                                {reply.text}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Add Reply Input Box */}
                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="text"
                            value={replyInputs[post.id] || ''}
                            onChange={(e) => setReplyInputs({ ...replyInputs, [post.id]: e.target.value })}
                            placeholder="Write a helpful response or follow-up question..."
                            className="flex-1 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#005082]"
                          />
                          <button
                            onClick={() => handleAddReply(post.id)}
                            className="px-4 py-2 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-bold text-xs shadow-sm flex items-center gap-1"
                          >
                            <Send className="w-3.5 h-3.5" /> Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Daily Poll & Top Clinical Contributors Sidebar (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Interactive Daily Nutrition Poll Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider font-heading">
              <Award className="w-4 h-4" /> Live Community Pulse Poll
            </div>

            <h4 className="text-sm font-black text-slate-900 dark:text-white font-heading leading-snug">
              What is your primary clinical health focus this season?
            </h4>

            <div className="space-y-2.5 text-xs font-medium">
              {[
                'Reversing Insulin Resistance & HbA1c',
                'Gut Microbiome & Bloating Relief',
                'High-Protein Lean Muscle Recovery',
                'PCOS & Hormonal Balance'
              ].map((option, idx) => {
                const votes = pollVotes[idx];
                const pct = Math.round((votes / totalPollVotes) * 100);
                const isSelected = pollSelected === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => handleVotePoll(idx)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100'
                    }`}
                  >
                    {/* Background Progress Fill */}
                    {pollSelected !== null && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 bg-amber-500/15 transition-all duration-700" 
                        style={{ width: `${pct}%` }}
                      ></div>
                    )}

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-slate-800 dark:text-slate-200 font-bold">{option}</span>
                      {pollSelected !== null && (
                        <span className="font-extrabold text-amber-600 dark:text-amber-400">{pct}%</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <span className="text-[11px] text-slate-400 block text-center">
              {totalPollVotes} total clinical votes recorded today
            </span>
          </div>

          {/* Top Clinical Contributors Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <h4 className="text-sm font-black text-slate-900 dark:text-white font-heading flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Top Clinical Contributors
            </h4>

            <div className="space-y-3 text-xs">
              {[
                { name: 'Dr. Ananya Sharma', role: 'Endocrinologist', answers: '1,240 Answers', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80' },
                { name: 'Chef Vikas Khanna', role: 'Ayurvedic Culinary Lead', answers: '890 Answers', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
                { name: 'Priya Patel, RD', role: 'Diabetes Educator', answers: '740 Answers', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' }
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <img src={doc.avatar} alt={doc.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-bold">{doc.name}</strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{doc.role} • {doc.answers}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {newPostModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNewPostModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[100] bg-white dark:bg-slate-900 max-w-xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col my-auto"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#005082]/10 text-[#005082] dark:text-cyan-400 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">
                      Ask Doctors & Share Community Post
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Your query will be reviewed by clinical dietitians & community peers
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setNewPostModalOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Input */}
              <form onSubmit={handleCreatePost} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Select Topic Category:
                  </label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:border-[#005082]"
                  >
                    <option value="Doctor Verified Q&A">Doctor Verified Q&A</option>
                    <option value="Meal Success Stories">Meal Success Stories</option>
                    <option value="Biomarker & Labs">Biomarker & Labs</option>
                    <option value="Ayurvedic Wellness">Ayurvedic Wellness</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Question Title / Topic Heading:
                  </label>
                  <input
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="e.g. How to manage fasting glucose spikes after high protein dinners?"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:border-[#005082]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Detailed Explanation / Story Details:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Describe your current diet, symptoms, lab values, or questions for our doctors..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:border-[#005082]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tags (Comma separated):
                  </label>
                  <input
                    type="text"
                    value={postTags}
                    onChange={(e) => setPostTags(e.target.value)}
                    placeholder="e.g. Glucose, Diabetes, Keto, Protein"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:border-[#005082]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setNewPostModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-bold shadow-md"
                  >
                    Post to Community
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
